# UX and Prototype

**Author:** Meirbek Nurassyl
**Project:** Urban public transport monitoring and anomaly detection with AI assisted recommendations
**Task:** UX and prototype
**Date:** October 24, 2026
**Status:** Clickable interaction mockup with illustrative data

## I. Purpose and Scope

The prototype demonstrates how dispatchers, analysts, and passengers interact with the proposed urban transport service. It covers the nine use cases in the architecture and makes the path from historical records to event investigation visible. The main workflow is sign in, submit an import, inspect its job and validation outcome, configure analysis, review event evidence, generate suggested checks, and export filtered results.

All routes, vehicles, stops, durations, events, jobs, recommendations, and reports shown are illustrative. The prototype does not run detection algorithms, import file contents, contact a language model, or connect to a database or live transport feed. It demonstrates interaction and content; it is not evidence that the requirements specification has passed implementation acceptance tests.

## II. Files and How to Run

Open [index.html](index.html) in this directory in a modern browser. The file is self-contained and requires no server, installation, external assets, or internet connection. The [UX document](../../docs/08-ux-prototype.md) is available under `docs/`.

| File | Contents |
|---|---|
| index.html | All screens, styles, illustrative records, and local interactions |
| README.md | This guide, scenarios, API proposals, and limitations |

Choose Dispatcher, Analyst, or Passenger on the sign-in screen. This simulates a pre-created account; it does not implement real authentication. Use Sign out to change roles while retaining the current browser session's sample jobs, reports, and recommendations. Reset demo clears that state and returns to sign-in. Reloading also resets all state.

The interface uses English labels for this submission. A language selection or localisation requirement has not been established for the transport prototype. The mobile layout demonstrates reflow; the primary use is a desktop operations workspace.

## III. Roles and Navigation

| Role | Available actions | Restricted actions |
|---|---|---|
| Dispatcher | Import, configure analysis, inspect jobs, review events and summaries, generate recommendations, export, review passenger reports | No additional administrative or account-management workflow is assumed |
| Analyst or fleet manager | Review event evidence, filter analytics, view already generated recommendations, export | Cannot import, start analysis, generate recommendations, inspect internal job screens, or read passenger-report lists |
| Passenger | Submit a route, local event time, and description | Cannot view internal events, analytics, jobs, exports, or staff reports |

The mockup limits navigation and guards local actions by role. Production authorisation must be enforced independently by Spring Boot; browser controls cannot provide a security boundary.

## IV. Use Case Coverage

| Use case | Prototype interaction | Requirements | Illustrative API |
|---|---|---|---|
| UC01 Sign in | Choose a demo account and enter the workspace | FR01; NFR01 | POST /v1/sessions |
| UC02 Import historical data | Import data, select an optional filename and scenario, submit a job | FR02–FR05 | POST /v1/imports |
| UC03 Configure and start analysis | Select the sample comparison, minimum sample size, seed, and outcome | FR05–FR09 | POST /v1/analysis-runs |
| UC04 Review events | Select Inspect to see values, quality flags, source links, and a schematic location | FR10; NFR03 | GET /v1/events/{id} |
| UC05 View analytics and filters | Set dates, route, event type, and method; list and summary counts update together | FR11; NFR02 | GET /v1/events; GET /v1/events/summary |
| UC06 Generate recommendations | Select the provider scenario and generate suggested checks | FR12; NFR05 | POST /v1/events/{id}/recommendations |
| UC07 Export results | Export the currently filtered event records as CSV | FR14 | GET /v1/events/export |
| UC08 Submit passenger report | Complete the route, local date/time, and description form | FR13 | POST /v1/passenger-reports |
| UC09 Review passenger reports | Sign in as Dispatcher and open the restricted report list | FR13; NFR01 | GET /v1/passenger-reports |

Background jobs show job identifiers, queued/running/final states, progress, and outcome details. The proposed job-status endpoint is GET /v1/jobs/{id}. Endpoint names are illustrative contracts for discussion, not implemented services. An expandable caption under each view explains the corresponding API interaction.

## V. Main User Scenarios

### A. Import and Analysis

1. Enter as Dispatcher and choose Import data.
2. Use the sample batch or choose a CSV/TSV filename. The file contents are not read.
3. Select the successful validation scenario and submit the import.
4. In Background jobs, select Start demo worker, then Show final outcome. Manual advancement makes each state inspectable without implying real processing.
5. Verify the illustrated reconciliation: 100 input rows equal 92 accepted plus 5 flagged plus 3 rejected. Flags and rejection reasons are shown separately.
6. Choose Start analysis. The form shows all three planned methods, the minimum reference sample, and seed.
7. Submit and advance the analysis job. The successful state explicitly says that fixtures were not recalculated.

The re-import scenario shows 100 already-imported rows as flagged, with no new analytical records. This illustrates the expected duplicate-handling message; the prototype does not calculate file identity or deduplicate uploaded data.

### B. Event Investigation and Recommendation

1. Open Events & analytics. The initial fixture contains six events across three illustrative routes and two dates.
2. Filter route 10 and method Rules. One event remains, and the export count and summary reconcile.
3. Inspect EV-101. Its evidence shows a 420-second observation, a 240-second context reference, a 360-second rule threshold, the vehicle, local date/time, and a quality statement.
4. Expand provenance to view the import batch, analysis run, source row, configuration, and seed.
5. As Dispatcher, keep the provider state unavailable and generate suggested checks. The output is labelled Rule-based fallback and refers to the observed facts without claiming a verified cause.
6. Switch to the available-provider scenario to see prewritten simulated language-model output. No provider request occurs.
7. Export the active filter selection. The CSV contains identifiers, dates, local times, event types, methods, observed/reference values, and run identifiers.

The location view is explicitly a stop schematic, not a geographic map or GPS trace. For dwell-time events it identifies a stop; for running-time events it identifies a segment. A production map still requires data-appropriate geometry and selection behaviour under FR10.

### C. Passenger Report and Staff Review

1. Sign out and enter as Passenger.
2. Select a route, enter the local event time, and describe the observation. Missing required fields and a whitespace-only description prevent submission.
3. Submit the report and observe the confirmation.
4. Sign out and enter as Dispatcher without reloading the page. Passenger reports now shows the submitted description, route, and time.
5. Enter as Analyst to confirm that the internal report-list action is unavailable.

Reports remain only in browser memory and disappear on reset or reload. No personal information is needed for the demonstration.

## VI. Alternative and Failure States

| Situation | Visible prototype behaviour | Production implication |
|---|---|---|
| Interrupted import | Interrupted status, incomplete job message, existing results preserved | Do not mark work complete merely because a request was accepted |
| Analysis worker failure | Failed status and explicit failure explanation | A failed run is not a successful run with zero anomalies |
| Insufficient context data | Completed demonstration with an insufficient-reference-data result for one group | Distinguish job completion from an eligible classification for every group |
| Provider unavailable | Labelled rule-based fallback | Retain usable recommendations without claiming a provider success |
| No matching events | Empty filtered list with zero reconciled counts | Distinguish an empty filter result from an unavailable analysis |
| Restricted role | Hidden navigation and guarded actions | Repeat these checks at every protected API endpoint |
| Missing report fields | Native form feedback or a description validation message | Return structured validation errors in the production API |

The current mockup does not provide a recovery/retry action, heartbeat expiry, automatic progress, database failure simulation, or a real recommendation timeout. These remain production behaviours described in the architecture and requirements.

## VII. Illustrative API Data

Submit an analysis using the application API. In production, Spring Boot persists the job and coordinates the Python worker; the browser does not call the worker or database directly.

```http
POST /v1/analysis-runs
Content-Type: application/json
Authorization: Bearer <session-token>
```

```json
{
  "dataset_id": "illustration-dataset",
  "methods": ["rules", "contextual_statistics", "isolation_forest"],
  "minimum_reference_sample": 20,
  "random_seed": 42
}
```

```json
{
  "job_id": "JOB-002",
  "status": "queued"
}
```

An event response should preserve the distinction between observations, comparison context, and detection settings:

```json
{
  "id": "EV-101",
  "route_id": "10",
  "vehicle_id": "BUS-014",
  "started_at": "2026-10-23T08:15:00+05:00",
  "event_type": "long_running_time",
  "method": "rules",
  "observed_seconds": 420,
  "reference_seconds": 240,
  "threshold_seconds": 360,
  "comparison": "greater_than",
  "import_batch_id": "IMP-001",
  "analysis_run_id": "RUN-001",
  "source_record_ids": ["ROW-048"],
  "location_quality": "schematic_stop_segment",
  "data_origin": "illustrative"
}
```

Final endpoint paths, schema versions, service-date rules, permission responses, and internal worker contracts must be agreed during implementation. These examples are not a substitute for an OpenAPI contract.

## VIII. Design Decisions

- Event evidence sits beside the list to support investigation without losing the active filter context.
- Quality flags and provenance remain accessible alongside measured values. Unusual duration is not labelled a confirmed cause or schedule delay.
- Filtered counts, method bars, event rows, and CSV content derive from the same fixture selection.
- Recommendation origin is visible, and generation remains a dispatcher action. Analysts can read existing suggestions.
- The role selector is on the sign-in screen, while local event filters remain on the review screen.
- Optional API captions support the architectural explanation without dominating normal user tasks.
- Responsive stacking keeps the evidence panel readable. Wide event tables use horizontal scrolling within their own panel on small screens.

## IX. Prototype Checks and Limitations

Browser interaction checks covered role navigation, analyst read-only recommendation access, route/method filtering, generated CSV row reconciliation, import summary totals, analysis failure messaging, passenger-to-dispatcher report visibility, and page width at 390 pixels. No browser script errors occurred in that checked flow. Desktop and mobile captures were inspected for layout issues.

The CSV payload was verified against the active filters. Saving the download was blocked in the automated browser environment, so end-to-end download saving remains a manual check in the user's browser. These checks validate the mockup's local interactions only; they do not satisfy production API, security, performance, reproducibility, deployment, or usability acceptance tests.

Not implemented: real authentication, server-side authorisation, file parsing, persistent storage, actual model execution or comparison, validated incident labels, geographic maps, live ingestion, real language-model calls, job recovery, and production deployment. The six event examples are fixed fixtures; a completed analysis does not generate additional events. No model-quality or service-improvement result is claimed.

## X. User Evaluation Plan

Ask a tester to enter as Dispatcher, select a route and date, inspect an event and its source, and export the filtered result. Record task start/end time, correct completion, and difficulties without direct database access. This supports the planned NFR06 five-minute task, but no participant result is claimed here.

Additional walkthroughs should check whether the tester recognises fallback versus simulated provider output, distinguishes an interrupted job from no anomalies, and understands the schematic location label. Use the production verification records to assess final acceptance rather than treating the mockup demonstration as a pass.
