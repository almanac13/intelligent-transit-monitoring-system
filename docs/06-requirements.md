# Requirements Specification

**Author:** Meirbek Nurassyl
**Project:** Urban public transport monitoring and anomaly detection with AI assisted recommendations
**Task:** Requirements specification
**Date:** October 24, 2026
**Status:** Proposed specification for the initial prototype

## I. Purpose and Scope

This proposed specification defines functional requirements, non-functional requirements, priorities, and acceptance criteria for the web service. Acceptance criteria describe planned verification; they do not indicate that implementation or testing has been completed.

The initial version prioritises historical analysis using the available segment-level and GTFS-derived data. Features requiring additional GPS observations or external services are identified separately.

## II. Conventions and Priorities

Requirement IDs remain stable across implementation and verification records. “Must” requirements define the acceptance baseline; “Should” and “Could” items are separately tracked extensions. A requirement is verified only after observed results and evidence have been recorded. The presence of an acceptance criterion does not establish a test pass.

| Priority | Meaning |
|---|---|
| **Must** | Mandatory for acceptance of the initial prototype |
| **Should** | Important extension, implemented after mandatory functionality |
| **Could** | Optional functionality dependent on time and external access |

## III. Functional Requirements

| ID | Requirement | Priority | Acceptance criteria |
|---|---|---|---|
| **FR01** | Authenticate users and enforce predefined roles. | Must | Pre-created dispatcher, analyst, and passenger accounts can authenticate. Dispatchers can import data and start analysis; analysts can view results; passengers can submit reports. Prohibited operations are rejected by the API. |
| **FR02** | Store and retrieve transport reference data. | Must | Imported routes, stops, vehicles, and trips can be retrieved by identifier. Relationships are preserved, and unresolved references are reported during import. |
| **FR03** | Import historical transport data. | Must | The supplied CSV and tab-separated reference files can be processed. An import summary assigns every input row exactly one disposition: accepted, flagged, or rejected, with reasons. The three counts sum to the input row count. Re-importing the same data does not silently duplicate analytical records. |
| **FR04** | Validate records and distinguish data-quality issues from movement events. | Must | Checks identify missing required values, invalid timestamps, negative durations, duplicates, and unresolved identifiers. Zero running times are flagged for review. Invalid records remain traceable and are excluded from affected calculations. Flagged records are included only where the documented validation policy permits; their flags remain visible. |
| **FR05** | Execute imports and analysis as background jobs. | Must | Each submitted operation receives a job identifier. Users can retrieve its status, processed-record count, result, or failure reason. An interrupted job is not displayed as successfully completed. |
| **FR06** | Detect unusually long running times and dwell times. | Must | Detection uses documented comparison groups, such as the same directed stop pair or stop and time period. Configurations specify thresholds and minimum reference-sample size. Insufficient reference data produces an explicit status. Controlled cases below, at, and above thresholds produce the documented outcomes. |
| **FR07** | Analyse intervals between successive buses. | Should | Headways are calculated for the same route, direction, stop, and service date. Repeated visits are handled explicitly. Incomplete observations are identified, and thresholds are recorded with results. |
| **FR08** | Detect deviations from reference routes using GPS tracks. | Should | Once GPS tracks and suitable route geometry are available, controlled inside-corridor and outside-corridor cases are distinguished using documented distance and duration thresholds. Missing or unreliable observations are marked as uncertain. |
| **FR09** | Compare rules, a statistical method, and Isolation Forest. | Must | Methods use the same documented evaluation records and event definitions. Parameters, reference periods, and processing times are recorded. Precision, recall, and F1 are reported only where reference labels exist; synthetic and real-data findings are presented separately. |
| **FR10** | Present events in a list, a detail view, and a map. | Must | Each event displays its type, route, vehicle, time interval, observed value, reference value, detection method, and relevant quality flags. Selecting an event highlights its available location. Stop-based schematic segments are labelled accordingly. |
| **FR11** | Filter events and display analytical summaries. | Must | Users can filter by date range, route, event type, and detection method. List results, charts, and summary totals reconcile for the same filter selection. |
| **FR12** | Generate recommendations grounded in event information. | Must | Recommendations identify the supporting event and suggest further checks without presenting an unverified cause as established fact. Missing API credentials, provider failure, or timeout activates a clearly labelled rule-based fallback. Language-model integration is demonstrated when valid access is available. Fallback tests remain mandatory regardless of provider access; unavailable external integration is recorded as not tested rather than passed. |
| **FR13** | Accept passenger reports and restrict access to them. | Must | A passenger can submit a route, event time, and description. Missing required fields or invalid route references produce validation errors. Only authorised staff can access the internal report list. |
| **FR14** | Export filtered event results. | Must | A CSV export contains the same events as the active filter selection, with identifiers, timestamps, event types, methods, and measured values. Exported row counts reconcile with the displayed results. |
| **FR15** | Receive current observations from an external transport API. | Could | If access is obtained, incoming observations are validated and their source and timestamps are recorded. Connection failure is visible, and historical-data functions remain usable. |

## IV. Non Functional Requirements

The numerical targets below are **proposed acceptance targets**, subject to confirmation against the development environment. Before formal acceptance testing, record the agreed reference hardware, software versions, dataset size, and workload. The 2-second response-time and 5-minute usability targets remain the baseline unless an explicit dated revision is agreed before the final tests. A missed target is recorded as a failure; it is not silently relaxed after measurement.

| ID | Requirement | Priority | Acceptance criteria |
|---|---|---|---|
| **NFR01** | Security | Must | Passwords are stored using a suitable password-hashing mechanism. Requests without required authentication return HTTP 401; authenticated requests without sufficient permission return HTTP 403. Credentials are supplied through configuration rather than committed source code. |
| **NFR02** | Interactive response time | Must | With the supplied dataset imported and one active user, the 95th-percentile response time is no more than **2 seconds** across 100 representative event-list and summary requests. Hardware, query selections, and test conditions are recorded. Imports and external AI calls are measured separately. |
| **NFR03** | Traceability | Must | Every event can be traced to its source records, import batch, analysis run, method, and configuration. Records excluded from analysis retain a reason. |
| **NFR04** | Reproducibility | Must | Repeating analysis with the same input, configuration, software version, and random seed reproduces event classifications. Any numerical comparison tolerance is documented. |
| **NFR05** | Failure handling | Must | Simulated database, analysis-service, and language-model failures produce explicit error or fallback states. Existing results are preserved, and failed analysis is not represented as an absence of anomalies. |
| **NFR06** | Usability | Must | A tester following the user guide can select a route and date, locate an event, inspect its evidence, and export the results within **5 minutes**, without directly querying the database. Task completion and difficulties are recorded. |
| **NFR07** | Reproducible deployment | Must | The application can be started in a clean documented environment using the supplied deployment configuration. Required services, configuration values, migration steps, and health checks are described. |

## V. Verification and Acceptance

Each mandatory requirement will receive at least one linked verification record. The coverage table below groups verification work; the ID-level mapping in Section VI ensures that traceability checks are explicitly included.

| Verification method | Requirements covered | Evidence to retain |
|---|---|---|
| API and access-control checks | FR01–FR04, FR13; NFR01 | Requests, responses, validation messages, and permission results |
| Controlled analytical scenarios | FR06, FR09; NFR04 | Input cases, reference labels where available, parameters, and calculated results |
| Interface and export checks | FR10–FR11, FR14; NFR06 | Screenshots, reconciled totals, exported files, and task observations |
| Failure simulation | FR05, FR12; NFR05 | Job transitions, failure messages, fallback outputs, and preserved results |
| Performance and deployment checks | NFR02, NFR07 | Timing measurements, environment details, startup logs, and health-check results |
| Provenance inspection | NFR03 | Event-to-source links, import batch, analysis run, method configuration, and exclusion reasons |

The acceptance report will record **requirement ID, test case, expected result, observed result, pass/fail status, and evidence location**.

The initial prototype will be accepted when all 19 **Must** requirements pass against the agreed baseline and their evidence is retained. A failed, blocked, or not-tested mandatory check prevents acceptance. Where a requirement contains multiple checks, every applicable mandatory check must pass.

For FR12, the initial acceptance baseline requires grounded recommendations and a working rule-based fallback. A live language-model demonstration is conditional on valid provider access. When access is unavailable, record that branch as not tested and state explicitly that live integration has not been accepted; do not claim a successful provider integration. If live integration is later made mandatory, revise the baseline before testing.

Deferred **Should** and **Could** requirements are recorded explicitly. GPS-dependent FR08 and external-feed FR15 remain pending until the necessary inputs or access exist; neither is a prerequisite for the historical-analysis baseline.

## VI. Requirement Traceability and Verification Records

The mapping below is a verification plan, not a completed test report. Every mandatory requirement has a named verification record. A record may contain multiple cases to cover normal, boundary, invalid-input, and failure behaviour.

| Requirement | Priority | Verification record | Required evidence |
|---|---|---|---|
| FR01 | Must | VR-FR01 Role and authentication checks | Successful sign-ins, allowed operations, and rejected operations for all three roles |
| FR02 | Must | VR-FR02 Reference data checks | Retrieval by ID, preserved relationships, and unresolved-reference report |
| FR03 | Must | VR-FR03 Import reconciliation and repeat import | Input and disposition counts, reasons, and duplicate prevention results |
| FR04 | Must | VR-FR04 Validation cases | A case for every listed check, retained source links, and exclusion results |
| FR05 | Must | VR-FR05 Job lifecycle and interruption | Job IDs, status transitions, counts, result or failure, and interruption outcome |
| FR06 | Must | VR-FR06 Contextual detection boundaries | Comparison groups, sample sizes, insufficient-data case, and below/at/above cases |
| FR07 | Should | VR-FR07 Headway scenarios | Route/direction/stop/date groups, repeated visits, and incomplete observations |
| FR08 | Should | VR-FR08 GPS corridor scenarios | Input availability, inside/outside cases, thresholds, and uncertainty outputs |
| FR09 | Must | VR-FR09 Detection method comparison | Common records and definitions, parameters, timings, and label availability |
| FR10 | Must | VR-FR10 Event evidence and map inspection | Required event fields, selection behaviour, and schematic-location labels |
| FR11 | Must | VR-FR11 Filter reconciliation | Filter cases and matching list, chart, and summary totals |
| FR12 | Must | VR-FR12 Recommendation and fallback checks | Evidence links, unsupported-cause check, credential/failure/timeout cases, and provider-access status |
| FR13 | Must | VR-FR13 Passenger report checks | Valid submission, invalid fields and route, and internal-list permission checks |
| FR14 | Must | VR-FR14 Export reconciliation | Export file, required columns, matching event IDs, and row counts |
| FR15 | Could | VR-FR15 External-feed checks | Validated observations, provenance, connection failure, and historical-function availability |
| NFR01 | Must | VR-NFR01 Security inspection and API checks | Password hash verification, 401/403 responses, and configuration review |
| NFR02 | Must | VR-NFR02 Interactive timing measurement | 100 request timings, p95 calculation, request mix, dataset size, and hardware |
| NFR03 | Must | VR-NFR03 Provenance audit | Every event linked to source, batch, run, method, and configuration; exclusion reasons |
| NFR04 | Must | VR-NFR04 Repeatability check | Fixed input/configuration/version/seed, repeated outputs, and declared tolerance |
| NFR05 | Must | VR-NFR05 Dependency failure simulation | Database, analysis, and model failure outcomes with preserved existing results |
| NFR06 | Must | VR-NFR06 Guided usability task | Task start/end times, completion, user guide used, and observed difficulties |
| NFR07 | Must | VR-NFR07 Clean deployment check | Environment, startup and migration records, configuration checklist, and health checks |

Each verification record will contain the requirement ID, test-case ID, fixture or input, preconditions, execution steps, expected result, observed result, pass/fail or pending status, execution date, configuration version, and evidence location. Store sensitive configuration values outside the report; retain only the information needed to reproduce the test.

For NFR02, define the representative request mix before execution, retain all 100 timings, and document the percentile calculation and any warm-up treatment. Measure imports and external AI calls separately. For NFR06, start timing at the first task action and stop when the correctly filtered export is produced; record whether any help beyond the user guide was needed.

## VII. Constraints and Acceptance Decisions

| ID | Constraint or decision | Consequence |
|---|---|---|
| C01 | Historical segment-level and GTFS-derived records are the initial data basis | Do not present historical replay as a live operational deployment |
| C02 | Planned schedules and observed timestamps have different meanings | Running-time outliers must not be labelled schedule delay without an independent valid schedule |
| C03 | Raw GPS tracks and route geometry are not guaranteed | FR08 is Should and cannot be verified from schematic stop connections alone |
| C04 | A live transport feed and external language-model access are conditional | Record access status; retain historical functionality and the mandatory recommendation fallback |
| C05 | Verified incident labels may be limited | Report precision, recall, and F1 only with reference labels; distinguish synthetic scenarios from real events |
| C06 | The selected architecture uses Spring Boot, Python with FastAPI, PostgreSQL/PostGIS, and HTTP/JSON | Verify component contracts, persisted job states, spatial units, and failure behaviour during implementation |

These decisions align the acceptance scope with the technology comparison and the proposed historical-data prototype. They do not establish successful implementation, operational safety, improved bus performance, or superiority over commercial systems.

## VIII. Specification Completeness and Open Points

| Check | Specification result |
|---|---|
| Functional requirements | 15 total: 12 Must, 2 Should, 1 Could |
| Non-functional requirements | 7 total: all Must |
| Mandatory acceptance baseline | 19 requirements |
| Acceptance criteria | Present for every requirement |
| ID-level verification mapping | All 22 requirements mapped in Section VI |
| Completed implementation or test results | Not asserted by this specification |

Before acceptance testing, confirm the reference dataset and environment, threshold comparison operators, minimum sample sizes, validation policy for flagged records, numerical tolerances, and time-zone/service-date handling. Define the exact reference-label provenance and evaluation split used by FR09. Record the provider-access status for FR12 and availability of input data for FR07, FR08, and FR15.

The role matrix must explicitly identify access to analysis results, imports, analysis execution, passenger submissions, and the internal passenger-report list. Resolve any unspecified permission before running FR01 and FR13 checks. No interview findings or supervisor approvals are assumed by this specification.
