# Verification and Evaluation Plan

**Author:** Meirbek Nurassyl
**Project:** Urban public transport monitoring and anomaly detection with AI assisted recommendations
**Task:** Verification and evaluation plan
**Date:** October 24, 2026
**Status:** Planned verification and experiments

## I. Purpose and Evaluation Data

The project will be evaluated through functional testing, data validation, anomaly detection experiments, performance measurements, and user scenario testing. The evaluation will determine whether the proposed web service supports reliable identification and investigation of public transport irregularities.

The planned evaluation uses the Astana public transport dataset, described in the project materials as containing **785,976 segment records, 19,769 trips, and three routes across 55 days**. The import manifest must verify these supplied counts, date coverage, identifiers, and file checksums before experiments begin. Any discrepancy will be reported and resolved before the evaluation dataset is frozen. All results presented at this stage are planned measurements, rather than completed experiments.

## II. Testing Plan and Outcome Metrics

| Evaluation area | Testing procedure | Metrics | Expected result |
|---|---|---|---|
| **Data import and validation** | Import the supplied files and test additional inputs containing missing values, invalid timestamps, duplicates, and unresolved references. Repeat an import to check duplicate handling. | Accepted, flagged, and rejected record counts; validation accuracy on deliberately constructed cases. | Every input record receives a traceable processing status. Repeated imports do not duplicate analytical records. |
| **Functional correctness** | Execute the main scenarios: import data, configure analysis, investigate an event, filter results, generate recommendations, submit a passenger report, and export results. | Passed acceptance checks; discrepancies between displayed and exported results. | All mandatory requirements pass their acceptance checks. Filtered views and exports contain consistent results. |
| **Access control** | Attempt permitted and restricted actions using Dispatcher, Analyst, and Passenger accounts. | Successful authorized actions; rejected unauthorized requests. | Role permissions are enforced by the backend API. |
| **Anomaly detection** | Compare fixed rules, contextual statistical thresholds, and Isolation Forest using the same evaluation records. | Detected events, agreement between methods, reviewed false positives, and processing time. Precision, recall, and F1-score will be calculated only where suitable reference labels exist. | The comparison establishes the strengths, limitations, and practical suitability of each method. |
| **Recommendation reliability** | Check recommendations against event measurements and simulate unavailable or failed LLM access. | Unsupported factual claims; successful fallback responses; visibility of recommendation source. | Recommendations remain consistent with recorded evidence, and fallback guidance is clearly identified. |
| **Performance and reliability** | Measure repeated read requests and simulate import, analysis, database, and external service failures. | Response-time percentiles; job completion time; correct failure reporting. | Proposed target: read-request p95 of no more than two seconds under the specified test conditions. Failed jobs are clearly identified. |
| **Usability** | Ask participants to locate an event, inspect its evidence, and export the relevant results using a short task guide. | Task completion rate, completion time, errors, and participant feedback. | Proposed target: complete the investigation and export scenario within five minutes. |

## III. Baseline Solutions

Two baselines will be used because detection quality and investigation efficiency require different comparisons.

| Comparison | Baseline | Proposed solution | Purpose |
|---|---|---|---|
| **Detection methods** | Configurable fixed thresholds for running time and dwell time. | Contextual statistical detection and Isolation Forest. | Determine whether more complex methods provide useful improvements over simple rules. |
| **Investigation workflow** | Manual filtering and inspection of CSV data in a spreadsheet. | The web service’s filters, event details, evidence, and export functions. | Measure whether the interface reduces the time and effort required to investigate the same cases. |

A more complex detection method will not automatically be considered superior. Its usefulness will depend on detection results, false positives, processing cost, and interpretability.

## IV. Measurement Conditions

Records will be divided chronologically into development and evaluation periods. Threshold selection, reference statistics, and model fitting will use only the development period. Evaluation records will remain separate to reduce information leakage.

All detection methods will use consistent preprocessing and documented configurations. Running-time and dwell-time comparisons will account for relevant context, such as stop pairs, stops, and time periods, where sufficient observations exist.

The supplied dataset does not contain confirmed anomaly labels. Therefore, manually reviewed cases will be reported as a **reviewed reference set**, with uncertain cases identified separately. Synthetic anomalies may supplement testing, but their results will be reported separately from real observations.

Performance measurements will record the hardware, software versions, dataset size, and request workload. The initial response-time test will use one active user and at least 100 read requests; imports and LLM requests will be measured separately.

## V. Detection Experiment Protocol

### A. Freeze Data and Configuration

1. Record source files, checksums, raw row counts, distinct trips and routes, service-date coverage, and the dataset publication or archive version. Preserve an immutable evaluation input snapshot.
2. Apply a documented common validation policy before comparing methods. Reconcile all rows as accepted, flagged, or rejected. Invalid records are excluded from affected calculations; flagged-record inclusion is explicit and traceable.
3. Select a chronological development period and a later evaluation period. Record the exact boundary dates and counts before fitting. Keep all records of a trip and service date within the same partition; do not split a trip across development and evaluation.
4. Use development data for imputation, scaling, feature design, reference groups, thresholds, and model fitting. If tuning requires a validation period, place it inside the development period and record its dates. Do not tune using final evaluation outcomes.
5. Freeze the feature list, grouping keys, comparison operators, minimum sample sizes, model parameters, random seed, software versions, and event aggregation policy. Record exclusions and eligible coverage per method.
6. Run the three methods on the common eligible evaluation records. Where eligibility differs, report both common-subset results and each method's coverage; do not compare raw counts with different denominators as though they were equivalent.

Stop-pair comparisons must preserve direction. Stop-based dwell comparisons must use compatible stop and time context. Service dates and time zones require explicit handling. GPS-derived timestamps are observations and must not be treated as planned schedules when claiming lateness. Optional headway and route-deviation experiments remain separate until their required inputs are available.

### B. Reference Cases and Event Matching

Define an event type and the rule for merging neighbouring flagged observations before evaluation. Retain the source observations and resulting start/end times. For supervised metrics, predefine how a detection matches a reviewed reference event: compatible type, route, vehicle or trip, location context, and a stated temporal-overlap or timing-tolerance rule. Record the exact tolerance before scoring. Use one-to-one matching so that repeated alerts for one event do not all count as separate true positives.

Create the reviewed reference set using a documented sampling frame that includes both flagged and unflagged records, stratified where practical by route, day/time, and event type. Review the evidence without showing the producing method where feasible. Record reviewer identity or role, review rubric, reason, and one of three dispositions: candidate irregularity, no supported irregularity, or uncertain. A second reviewer is desirable; if unavailable, state the single-reviewer limitation and retain the audit trail. Do not claim independent incident confirmation from a retrospective interpretation of the same duration values.

Reviewing only detected alerts can estimate the supported proportion of reviewed alerts under the review rubric; it cannot establish recall. Precision, recall, and F1 require an appropriately labelled evaluation universe with detectable positives and negatives, not just an alert sample. If only a sampled reviewed set is available, report metrics for that set with its sampling procedure and limits. Do not extrapolate its class prevalence to the full dataset. Exclude uncertain cases from binary scoring and report their count and proportion separately.

Synthetic cases must have recorded source records, transformation rules, magnitudes, and expected affected intervals. Keep synthetic evaluation cases separate from threshold fitting and from real-observation reporting. Sensitivity to injected long durations establishes behaviour on those constructions, not real-world incident recall.

### C. Metrics and Interpretation

| Metric | Calculation or recording rule | Interpretation limit |
|---|---|---|
| Detection count and alert rate | Events per method and per eligible trip or service hour, with denominator | Describes workload, not correctness |
| Method agreement | Pairwise matched event counts and overlap using the fixed matching rule | Agreement is not ground truth |
| Precision | TP / (TP + FP) on an eligible labelled set | Undefined if there are no predicted positives; report the denominator |
| Recall | TP / (TP + FN) on an eligible labelled set | Requires reference positives including missed events |
| F1 | 2TP / (2TP + FP + FN) where the denominator is nonzero | Meaning depends on reference quality and sample composition |
| Uncertainty and coverage | Uncertain review cases, excluded records, and insufficient-context groups | Must accompany any method ranking |
| Processing time | Wall-clock time for the same eligible workload; record preparation separately | Depends on hardware, workload, and implementation |
| Interpretability | Whether each reviewed alert exposes its inputs, comparison context, method, and configuration | A readable explanation is not proof of correct detection |

Report confusion counts and sample sizes with percentages. Where multiple repeated runs are used, retain each timing and summarise variability. No minimum accuracy improvement or method winner is assumed: a useful result may be that simpler rules offer the more practical trade-off for the sampled data.

## VI. Performance Recommendation and User Protocols

### A. Interactive Performance and Reliability

Freeze a representative mix of event-list and summary queries covering route/date combinations and filters before measurement. Use one active user and 100 measured requests against the imported reference dataset. Record request order, latency boundary, response status, dataset counts, database indexes, hardware, operating system, software versions, and deployment configuration. State whether latency is measured at the client or API boundary and keep that definition consistent.

Record warm-up requests separately. Calculate p95 using the nearest-rank method: sort the 100 measured latencies and take the 95th value. Do not silently drop failed requests; report their status, count, and duration. The proposed acceptance target from NFR02 is p95 no greater than two seconds, with failures investigated separately. The environment and target must be agreed before the final test; any change is a dated baseline revision, not a retrospective relaxation.

Measure imports, complete analysis jobs, exports, and external AI requests separately. For worker interruption, database failure, analysis-service failure, and provider unavailability, retain the injected fault, job transitions, user-visible error or fallback, and evidence that existing successful results remain intact. A lost heartbeat or failed run must never be presented as successful completion or as evidence of no anomalies.

### B. Recommendation Reliability

Freeze a review set covering the two mandatory event types, each method, incomplete evidence, and relevant quality flags. Record the chosen events and case count before evaluation. Assess each recommendation against the exact facts supplied to it, using a checklist for correct identifiers and measurements, absence of invented observations or established causes, explicit uncertainty where needed, and relevant next checks. Retain the prompt/fact payload, output, provider/model version when available, and reviewer decision.

Report unsupported factual claims as both a count and a proportion of reviewed outputs, together with examples and severity. Record rule-based versus provider outputs separately. Test missing credentials, provider failure, timeout, and invalid output; every mandatory fallback case must produce a clearly labelled, evidence-consistent rule-based response. No numeric recommendation-quality threshold beyond the stated requirements is assumed; record any additional agreed rubric before testing.

Live provider integration is conditional on valid access under the FR12 baseline. If access is unavailable, mark live integration not tested and state that it has not been accepted. The mandatory grounded recommendation and fallback checks still apply. Simulated prototype output cannot substitute for a successful real-provider test.

### C. Investigation Workflow and Usability

Prepare equivalent cases for spreadsheet inspection and the web interface, with the same source evidence, target event, date/route selection, and required export. Record participant count, relevant experience, task instructions, available tools, and assistance. Aim to recruit at least five participants for descriptive feedback if feasible; this is an evaluation proposal rather than a new mandatory requirement or a claim of recruitment.

Counterbalance the order of spreadsheet and web tasks where practical and use matched cases to reduce learning effects. Start timing at the first task action and stop when the correctly filtered export is produced. Check completion correctness rather than stopping the timer on any export. Record errors, help beyond the guide, incomplete tasks, and participant feedback; report per-participant results and median times without hiding failures.

The NFR06 proposed acceptance task requires a tester using the guide to select a route and date, locate an event, inspect its evidence, and export the results within five minutes without direct database queries. Report this pass/fail check separately from the comparative study. For the comparison, report paired time differences and completion counts with the sample size. A small convenience sample supports a local descriptive finding rather than a population-wide efficiency claim.

## VII. Mandatory Requirement Coverage and Evidence

The requirements specification defines 19 mandatory requirements: 12 functional and seven non-functional. The record IDs below match its verification mapping. Every applicable check within a mandatory requirement must be covered; a single happy-path example is not sufficient for a compound criterion.

| Requirement | Verification record | Minimum retained evidence |
|---|---|---|
| FR01 | VR-FR01 | Pre-created role sign-ins, allowed actions, prohibited actions, and API responses |
| FR02 | VR-FR02 | Identifier retrieval, relationships, and unresolved-reference cases |
| FR03 | VR-FR03 | Input reconciliation, reasons, repeat-import results, and duplicate handling |
| FR04 | VR-FR04 | Every specified validation fault, traceability, flags, and calculation exclusions |
| FR05 | VR-FR05 | Job IDs, state transitions, counts, results/failures, and interruption |
| FR06 | VR-FR06 | Running/dwell groups, thresholds, minimum samples, boundary cases, insufficient-data status |
| FR09 | VR-FR09 | Common evaluation inputs, frozen parameters, eligibility, processing times, and separate reference/synthetic results |
| FR10 | VR-FR10 | Required event fields, evidence, selected location, and schematic labels |
| FR11 | VR-FR11 | Filters and reconciliation across lists, charts, and summary totals |
| FR12 | VR-FR12 | Grounded outputs, fallback fault cases, source labels, and live-provider test status |
| FR13 | VR-FR13 | Valid passenger submission, missing fields, invalid route, and restricted staff list |
| FR14 | VR-FR14 | Filtered event IDs, required CSV columns, row counts, and saved export |
| NFR01 | VR-NFR01 | Password-hash inspection, 401/403 cases, and credential configuration review |
| NFR02 | VR-NFR02 | All request timings, p95 calculation, failures, workload, and environment |
| NFR03 | VR-NFR03 | Event-to-source/batch/run/method/configuration links and excluded-record reasons |
| NFR04 | VR-NFR04 | Repeated fixed-input/configuration/version/seed outputs and numerical tolerance |
| NFR05 | VR-NFR05 | Dependency-failure evidence, fallback/error states, and preserved results |
| NFR06 | VR-NFR06 | Guided task completion, timing, correctness, help, and difficulties |
| NFR07 | VR-NFR07 | Clean startup, service configuration, migrations, health checks, and instructions |

FR07 and FR08 remain Should; FR15 remains Could. Keep their outcomes or deferrals visible without counting them as mandatory failures for the historical prototype. A route-deviation result needs suitable GPS and route geometry; a headway result needs adequate successive-vehicle coverage.

## VIII. Execution Records and Acceptance

| Stage | Entry condition | Output or completion condition |
|---|---|---|
| Evaluation preparation | Dataset and requirements available | Verified manifest, exact split, agreed environment, case rubric, and frozen configurations |
| Functional and data verification | Implemented application and test fixtures | Complete requirement-linked records, defects, and reconciliation evidence |
| Detection experiments | Frozen preprocessing, models, and evaluation records | Method outputs, coverage, timings, and labelled or descriptive results |
| Reliability and recommendation checks | Fault controls and recommendation inputs available | Failure-state evidence, source-labelled outputs, and provider-access status |
| Performance and user tasks | Stable build and documented deployment | Raw timings, completed task records, correctness checks, and limitations |
| Acceptance review | Evidence and defect register assembled | Decisions for all 19 Must requirements, with deferred extensions listed |

Each test record includes requirement ID, case ID, input fixture, preconditions, steps, expected outcome, observed outcome, status, execution date, software/configuration version, and evidence location. Use pass, fail, blocked, and not tested distinctly. Report a test execution failure rather than changing the expected result to match the observation.

Initial prototype acceptance requires all 19 Must requirements to pass their applicable baseline checks. A failed, blocked, or untested mandatory check prevents acceptance. FR12's conditional external-provider branch follows its explicit access rule; an unavailable live integration must be disclosed and never marked passed. Maintain an issue record for each failure, including impact, correction, and the evidence from a targeted retest. Re-run related checks when a change affects their assumptions.

The current clickable prototype checks are limited to illustrative browser interactions. They are useful preparation for scenario tests but do not establish production security, real import correctness, detection quality, end-to-end CSV saving, response-time performance, or reproducible deployment.

## IX. Demonstrating Achievement of the Aim

Achievement of the project aim will be demonstrated by a working, reproducible workflow that imports transport records, identifies candidate irregularities, presents supporting evidence, and assists investigation.

Evidence will include acceptance-test results, detection comparisons, performance measurements, and user task results. Reduced investigation time would support a claim of improved **analytical efficiency**. Demonstrating improved real-world bus punctuality or reduced passenger waiting time would require a separate operational trial.

## X. Evaluation Risks and Limitations

| Risk | Trigger or evidence to monitor | Planned response |
|---|---|---|
| Dataset counts or semantics differ from the supplied description | Manifest mismatch or unresolved timestamp meaning | Reconcile inputs, record actual scope, and freeze corrected definitions before experiments |
| No reliable incident labels | Review cannot distinguish candidate event from uncertain case | Use transparent descriptive results and reviewed-set limits; keep synthetic sensitivity separate |
| Leakage or favourable threshold tuning | Evaluation period used in fitting or post-hoc parameter selection | Retain chronological manifests and parameter history; repeat evaluation on an untouched period if needed |
| Small or biased user sample | Few participants or strong prior knowledge of the interface | Report sample composition and per-case results; avoid broad generalisation |
| Provider access or unstable external response | Missing credentials, timeout, or changing model output | Test mandatory fallback, record versions and payloads, and report untested integration honestly |
| Environment limits performance | Missed p95 target, failed requests, or worker resource constraints | Inspect workload and bottlenecks; document corrections and repeat the frozen measurement protocol |

The dataset spans only three routes and 55 days according to the supplied description. Findings cannot establish citywide or seasonal performance. Real operational improvement, causal diagnosis, and dispatch intervention effectiveness require evidence beyond this planned prototype evaluation. Review these risks at each evaluation stage; named additional team members, approved dates, and completed supervisor decisions are not assumed.
