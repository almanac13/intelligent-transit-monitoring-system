# Project Proposal

**Author:** Meirbek Nurassyl Talgatbekuly, SE-2415, Software Engineering  
**Supervisor:** Madina Askarovna Yermaganbetova, Associate Professor  
**Date:** October 24, 2026  
**Status:** Proposed individual diploma project

## I. Project Title

**Development of an Intelligent Web Service for Improving the Efficiency of Urban Public Transport**

The prototype focuses on identifying candidate bus movement irregularities and supporting their investigation. Within the diploma, efficiency will be assessed through analytical workflow measurements; improved real-world bus punctuality is not an assumed outcome.

## II. Project Team and Supervision

| Participant | Role | Responsibilities |
|---|---|---|
| Meirbek Nurassyl Talgatbekuly, SE-2415 | Student developer and researcher; individual project | Research, requirements, architecture, data preparation, server and web interface, detection methods, integration, testing, documentation, and project tracking |
| Madina Askarovna Yermaganbetova, Associate Professor | Supervisor | Academic guidance and feedback on scope, research decisions, intermediate results, and evaluation |
| Invited evaluation participants | Prospective users or testers, subject to availability | Complete defined user tasks and provide feedback; no delivery responsibility |

The project does not assume additional developers or a transport organisation's participation. Interviews, access arrangements, and supervisor decisions will be recorded when they take place rather than presented as completed evidence.

## III. Background and Problem Statement

### A. Context

Urban bus services may experience prolonged stops, long travel times between stops, deviations from a reference route, and irregular intervals between vehicles. Investigating these events requires understanding where and when they occurred, their duration and recurrence, and the affected routes and vehicles. The resulting evidence can guide further checks of data coverage, stop matching, timetable assumptions, traffic conditions, and operating practices.

GPS observations and GPS-derived trip records provide a basis for such analysis, but their interpretation requires validation and context. Missing observations, duplicate records, positioning errors, and incorrect identifiers can resemble operational irregularities. An unusually long duration can also be normal for a particular stop or time period. A useful review tool therefore needs to distinguish data-quality issues from candidate movement events and show the observations and comparisons supporting a flag.

### B. Available Evidence and Limitations

The initial evaluation context is selected Astana bus routes and the available historical segment-level and GTFS-derived records. Project materials describe the dataset as containing 785,976 segment records and 19,769 trips across three routes and 55 days. These are supplied dataset counts, not results of an import performed for this proposal. The file manifest, counts, date coverage, timestamp meanings, and available fields must be verified before final experiments.

The literature review and system comparison already prepared for the project identify relevant methods and existing operational capabilities. Maps, historical analytics, monitoring, and AI assistance exist in the reviewed systems; those functions alone do not establish originality. The proposed contribution is a focused, independently implemented and evaluated workflow for the selected local data context, including data-quality separation, a controlled method comparison, traceable event evidence, and grounded recommendations.

Local dispatcher needs and the significance of particular disruptions have not yet been empirically confirmed. Interviews or discussions with prospective users and analysis of the available records are planned to test these assumptions. No completed interviews or operational partnership are claimed.

### C. Problem Statement

The project addresses how to combine historical transport data validation, contextual anomaly detection, event visualisation, and reviewable recommendations within one web service. The engineering problem is to produce traceable candidate events from imperfect records, distinguish suspicious data from unusual operations, and help a specialist inspect the evidence without treating an anomaly score as a verified cause.

The diploma will test whether this integrated workflow is correct, reproducible, usable, and practically informative on the selected data. It will not presume that the prototype is superior to commercial products or that generating a recommendation improves bus operations.

### D. Working Assumptions

1. The available historical records contain enough valid running-time and dwell-time observations to support useful contextual comparisons for at least some route, stop, and time groups.
2. Prospective users can investigate candidate events more readily when measured values, comparison context, data-quality flags, and source records are presented together.
3. Recommendations that suggest further checks and distinguish uncertainty are useful without establishing the cause of an event.
4. Raw GPS tracks, suitable route geometry, complete neighbouring-vehicle observations, and a live transport API may be unavailable. Mandatory delivery must remain feasible using the historical duration records and a rule-based recommendation fallback.

These assumptions require data checks or user evaluation. Insufficient reference data must produce an explicit status rather than an unsupported classification.

## IV. Target Users

| User | Intended tasks | Scope |
|---|---|---|
| Dispatcher | Import historical files, configure analysis, investigate events, view summaries, request recommendations, export results, and review passenger reports | Core |
| Transport analyst or fleet manager | Inspect event evidence and existing recommendations, filter analytics, and export results | Core; read access without processing or recommendation-generation privileges |
| Passenger | Submit a route, local event time, and description for authorised staff review | Core; no access to internal analytics or report lists |
| Driver | View events associated with an assigned shift and provide explanations | Possible extension, dependent on real assignment data and agreed requirements |
| Administrator | Manage accounts through a dedicated interface | Future work; the initial prototype uses pre-created accounts |

These roles describe intended access. The final backend must enforce the permission matrix independently of frontend visibility. Passenger reports support review and are not treated as independently verified incident labels by default.

## V. Aim

To develop and evaluate a prototype web service that helps a dispatcher identify and investigate candidate irregularities in bus movement using historical transport observations, inspect the supporting evidence, and receive grounded suggestions for further checks.

## VI. Objectives

| ID | Objective | Completion criterion |
|---|---|---|
| O1 | Verify data availability, structure, semantics, and provenance | A manifest records files, checksums, counts, routes, date coverage, field meanings, and limitations; missing GPS, schedule, or live-feed prerequisites are identified |
| O2 | Review relevant literature and existing systems and justify technical choices | The literature review, four-system comparison, and three-decision technology comparison explain evidence, limitations, and project implications |
| O3 | Define verifiable requirements and a consistent architecture | Requirements contain priorities and acceptance criteria; context, use case, and component views align with roles, data ownership, and scenarios |
| O4 | Implement repeatable import, validation, reference-data management, and background jobs | Source rows reconcile as accepted, flagged, or rejected; re-import does not silently duplicate analytical records; job states and failures remain traceable |
| O5 | Implement and compare three detection approaches for the mandatory event types | Rules, contextual statistics, and Isolation Forest operate on documented common evaluation records with frozen configurations; event evidence and insufficient-data states are retained |
| O6 | Implement the integrated web investigation workflow and access controls | Authorised users can inspect event lists and locations, filter summaries, view details, export matching results, and submit or review passenger reports according to role |
| O7 | Implement grounded recommendations with a rule-based fallback | Suggestions refer to recorded event facts and avoid unsupported causes; missing credentials and provider failure activate a labelled fallback; live integration is demonstrated when valid access exists |
| O8 | Evaluate correctness, reproducibility, detection behaviour, performance, and usability | The evaluation report includes requirement-linked results, method comparisons, timings, and user-task findings; reviewed, uncertain, and synthetic cases are distinguished |
| O9 | Deliver reproducible project materials | Source/configuration history, task links, deployment instructions, user guidance, results, limitations, and the reviewed submission version are recorded |

These objectives describe completion evidence, not completed work. They map to the detailed requirements and verification plan. No objective requires a more complex detector to outperform the rules baseline; practical suitability must follow from measured errors, coverage, cost, and interpretability.

## VII. Expected Outcomes

1. A working prototype for a limited set of routes, comprising a web interface, application backend, Python analysis component, and persistent storage.
2. A repeatable historical-data import and validation process with reconciled counts, retained source provenance, and explicit quality flags.
3. Traceable running-time and dwell-time events and a comparison of rules, contextual statistics, and Isolation Forest.
4. An investigation interface with consistent filters, summaries, evidence, appropriately labelled locations, recommendations, and exports.
5. An evaluation report covering acceptance checks, detection behaviour, processing and response times, recommendation reliability, and investigation tasks.
6. Requirements, architecture and diagrams, prototype guide, deployment documentation, management records, and a user guide.

Measured reductions in investigation time may support a bounded claim of improved analytical efficiency. Improved punctuality, shorter passenger waiting times, or successful dispatch interventions would require a separate operational trial.

## VIII. Scope

### A. Mandatory Initial Version

- Pre-created dispatcher, analyst, and passenger accounts with API-enforced access rules.
- Reference records for routes, stops, vehicles, and trips; historical file import and traceable validation results.
- Persisted import and analysis jobs with progress, results, and explicit failure or interruption states.
- Two analytical event types: unusually long running time between directed stop pairs and unusually long dwell time at stops, subject to eligible data and sufficient reference samples.
- A documented comparison of rules, contextual statistical thresholds, and Isolation Forest using the same eligible evaluation records and event definitions.
- Event lists, details, filters, summaries, and location presentation using the geometry actually available. Stop-based schematic segments must be labelled; they are not GPS tracks.
- Evidence-grounded recommendations with a labelled deterministic fallback. External language-model integration remains conditional on valid provider access under FR12.
- Passenger report submission, dispatcher-only internal review, and filtered CSV export.
- Traceability, repeatability, failure handling, documented deployment, and the performance and usability checks defined in the requirements.

### B. Conditional Extensions

Headway analysis is a Should requirement and depends on sufficiently complete observations of successive vehicles for the same route, direction, stop, and service date. GPS route-deviation detection is also Should and depends on raw tracks and suitable reference geometry. Current observation ingestion is Could and depends on verified access to an external transport API.

Driver views, shift-linked explanations, dispatcher review records, analysis of passenger-report text, tracking actions taken, advanced data correction, and additional event types may be considered later. Driver-to-shift matching is outside the mandatory baseline unless authentic assignment records and revised requirements are available. Demonstration assignments must be clearly labelled and cannot establish real driver responsibility.

Detailed event evidence is part of the mandatory investigation workflow. Extra review and action-tracking features should not be confused with this required detail view.

### C. Exclusions

1. Establishing the verified cause of an anomaly or assigning driver responsibility from the available records alone.
2. Automatic dispatch control or claims of proven operational improvements.
3. Citywide, year-round, or production-scale validation from the limited route and date sample.
4. A dedicated account-administration interface, driver cabinet, or compulsory live-data integration in the initial delivery.
5. Treating synthetic sensitivity tests as a replacement for real-observation evaluation or confirmed incidents.
6. Reporting schedule delay without an independent valid planned schedule and correct trip matching.

### D. Constraints and Acceptance

The work is undertaken by one student. Must requirements take precedence over optional integration and GPS features. The requirements specification defines 19 mandatory requirements; all applicable baseline checks must pass before the initial prototype is accepted. The conditional live-provider branch must be reported honestly as tested or not tested; mandatory grounded fallback behaviour is still required.

The proposed interactive-read target is p95 no greater than two seconds across 100 representative requests with one active user in a recorded environment. The proposed guided investigation task is completion within five minutes. These targets are subject to confirmation before final testing, with changes documented rather than silently relaxed after measurement.

## IX. Engineering Complexity

| Engineering challenge | Why it requires substantive implementation and evaluation |
|---|---|
| Data quality and provenance | Inconsistent timestamps, durations, identifiers, and duplicates require validation, inclusion policies, repeat-import handling, and source-to-event links |
| Contextual and multivariate detection | The three approaches need comparable input, valid reference groups, minimum sample rules, temporal separation, and interpretable outputs |
| Limited labels and uncertainty | Reviewed cases and injected events have different evidential limits; metrics require explicit reference definitions and matching rules |
| Multi-component integration | Spring Boot owns persistence while the FastAPI analysis worker exchanges batches, progress, and results through protected contracts |
| Long-running work and recovery | Persisted job states, run/attempt identity, deduplication, and failure handling must prevent incomplete work from appearing successful |
| Spatial and temporal semantics | Route direction, service dates, coordinate systems, distance units, and schematic versus observed geometry affect valid inference |
| Grounded language-model assistance | Verified measurements must remain separate from generated suggestions, with factual review and an operational fallback |
| Access control and consistent views | Roles restrict internal information, while lists, charts, evidence, and exports must reconcile for the same filters |

The complexity lies in integrating and testing these responsibilities as one traceable workflow, rather than in adding AI terminology or claiming algorithmic novelty.

## X. Technologies Milestones and Project Tracking

The selected backend is Java with Spring Boot. Python with FastAPI exposes analysis interfaces; PostgreSQL stores application data, and PostGIS supports spatial operations where needed. HTTP/JSON connects components. React is the proposed web interface technology. The technology comparison justifies the backend, storage, and communication selections; React has not been independently benchmarked against alternatives in that comparison.

| Milestone | Provisional period | Outcome |
|---|---|---|
| M1 Planning and setup | Early November 2026 | Backlog, requirements, architecture, acceptance records, and access arrangements |
| M2 Data foundation | November 2026 | Migrations, repeatable imports, validation, and reconciled provenance |
| M3 Detection baseline | Early to mid December 2026 | Traceable duration events and three methods ready for comparison |
| M4 Integrated scenarios | Mid December 2026 to mid January 2027 | Role-based investigation, jobs, reports, exports, and recommendation fallback |
| M5 Verification and evaluation | Second half of January 2027 | Acceptance evidence, method comparison, performance and user-task results |
| M6 Corrections and delivery | February 2027 before the confirmed deadline | Retested fixes, reproducible instructions, final report, and defence materials |

The November 2026–February 2027 plan is provisional; the exact February submission date remains to be confirmed. If submission is early in February, final review and packaging must move into late January. Documentation and verification proceed throughout development. Review workload, risks, and dependencies weekly, and arrange supervisor demonstrations according to availability.

Git repository: <https://github.com/almanac13/intelligent-transit-monitoring-system.git>

YouTrack project: <https://almanac.youtrack.cloud/projects/DIP>

The student supplied these links; this proposal does not assert that reviewer access, issue coverage, repository contents, or passing test evidence has been verified. Track requirement → actual DIP task → change or document version → verification evidence. Refer to the management plan for responsibilities, risks, dependency handling, and submission readiness.

## XI. Open Questions and Next Steps

1. Verify the actual historical files, supplied counts, timestamp meanings, schedule availability, and any raw GPS or route geometry.
2. Confirm prospective dispatcher or transport-specialist contacts and document local needs; aim for three to five discussions if feasible without claiming they have occurred.
3. Agree the reference-case review rubric, chronological split, threshold operators, sample-size rules, and final measurement environment.
4. Select the language-model provider and record access conditions; preserve mandatory fallback delivery independently of that choice.
5. Finalise role permissions, API schemas, job recovery, spatial units, and service-date handling across Java and Python.
6. Confirm the exact February 2027 deadline, implementation start date, weekly workload, and supervisor review arrangements.
7. Populate real project tasks and verification links, and record deferred optional work explicitly.
