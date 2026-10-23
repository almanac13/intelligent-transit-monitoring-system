# Project Management and Risks

**Author:** Nurassyl Meirbek, SE-2415
**Supervisor:** Madina Askarovna Yermaganbetova
**Project:** Urban public transport monitoring and anomaly detection with AI assisted recommendations
**Task:** Project management and risks
**Date:** October 24, 2026
**Status:** Proposed management plan; tracking links supplied; review evidence to be populated

## I. Management Approach

The project will be completed individually by **Nurassyl Meirbek, SE-2415**, under the supervision of **Madina Askarovna Yermaganbetova**. Development will follow an incremental approach, with each milestone producing a demonstrable result.

## II. Project Tracking and Traceability

Git will maintain the history of source code, configuration, database migrations, and project documentation. YouTrack will track requirements, development tasks, defects, risks, and acceptance checks.

| Management element | Planned organisation |
|---|---|
| **Git repository** | <https://github.com/almanac13/intelligent-transit-monitoring-system.git> |
| **YouTrack project** | <https://almanac.youtrack.cloud/projects/DIP> |
| **Task workflow** | Backlog → Ready → In Progress → Verification → Done |
| **Task contents** | Description, related requirement, priority, acceptance criteria, dependencies, and evidence of completion. |
| **Change tracking** | Commits and pull requests reference the corresponding YouTrack issue identifier. |
| **Completion rule** | A task is marked Done after its acceptance criteria have been checked and the result recorded. |
| **Progress reviews** | Regular demonstrations and discussions with the supervisor; feedback is recorded as tasks or scope changes. |

Traceability will connect **requirement → YouTrack task → code change → verification evidence**. This will allow reviewers to identify what was implemented, why it was needed, and how it was checked.

### Task and Change Records

Each YouTrack task should record its owner, related FR/NFR IDs, expected outcome, priority, acceptance checks, dependencies, target milestone, and links to the relevant change and verification record. Use actual DIP issue identifiers assigned by the YouTrack project; do not invent task numbers. A requirement can map to several tasks; a task that changes multiple requirements must list each affected ID.

For code and configuration work, include the actual issue identifier in the change description and link the commit or pull request back to the task. For research, review, or evaluation tasks, link the document version, dataset/configuration manifest, or recorded findings instead of requiring an unrelated code change. Retain negative and blocked results as evidence rather than marking them complete without explanation.

A proposed traceability example is FR03 → import implementation task → linked change → VR-FR03 reconciliation and repeat-import evidence. This illustrates the record structure; it is not a claim that an issue, change, or passing test already exists.

### Completion and Review Rules

Move a task to Ready when its input, dependencies, and acceptance checks are defined. Move it to Verification when a reviewable result and evidence are available. Mark it Done only after applicable checks have passed and the result is recorded. A blocked task retains an explicit blocking reason and next action. A failed acceptance test creates or updates a defect; it is not converted into a pass by changing the expected result after execution.

The student reviews the backlog, risks, and dependencies at least once per working week. Supervisor demonstrations and feedback discussions are arranged according to availability; no meeting or approval is asserted as completed here. Record each substantive decision with its date, affected requirements, rationale, and follow-up task. When deadlines change, record the reason and downstream impact.

## III. Allocation of Responsibilities

| Participant | Responsibilities |
|---|---|
| **Nurassyl Meirbek — student developer and researcher** | Literature review, requirements, data preparation, architecture, backend and frontend development, analysis methods, testing, documentation, and project tracking. |
| **Madina Askarovna Yermaganbetova — supervisor** | Academic guidance, review of research decisions and intermediate results, and feedback on scope and evaluation. |
| **Invited evaluation participants** | Complete defined usability tasks and provide feedback, subject to availability. |

The student is responsible for implementation, verification evidence, and maintaining the plan. Supervisor feedback informs academic scope and research decisions; it does not substitute for recorded testing or imply independent code review of every change. Participants contribute user-task observations only and are not responsible for software delivery or acceptance decisions.

## IV. Proposed Milestones

The proposed schedule spans November 2026 to February 2027, allowing approximately four calendar months for individual development, evaluation, and delivery. February 2027 is a provisional deadline window; the exact university submission date remains to be confirmed. The plan includes integration and correction time rather than assuming that all work fits into ten weeks.

| Milestone | Provisional target period | Deliverable and completion condition |
|---|---|---|
| **M1. Planning and project setup** | Early November 2026 | Repository, YouTrack backlog, prioritised requirements, architecture, and acceptance criteria are available. |
| **M2. Data processing foundation** | November 2026 | Database migrations and repeatable import process; validation summaries reconcile with input records. |
| **M3. Detection baseline** | Early to mid December 2026 | Running-time and dwell-time rules produce traceable events; statistical and Isolation Forest methods are available for comparison. |
| **M4. Integrated user scenarios** | Mid December 2026 to mid January 2027 | Event investigation, filters, exports, role permissions, passenger reports, and recommendation fallback work through the interface. |
| **M5. Verification and evaluation** | Second half of January 2027 | Acceptance checks, method comparisons, performance measurements, and usability findings are recorded. |
| **M6. Delivery and documentation** | February 2027, before the confirmed submission date | Defects from evaluation are resolved and retested; reproducible deployment instructions, evaluation report, limitations, and defence materials are complete before the confirmed deadline. |

These periods are planning windows, not approved university dates. Confirm the exact February deadline and work backwards to reserve time for defect correction, deployment checks, supervisor feedback, and final materials. If submission is in early February, move the final review and packaging into late January. Documentation and verification proceed throughout development; February is reserved mainly for corrections, final reporting, and delivery. Reassess the workload against actual weekly availability and academic commitments before committing the baseline.

At each milestone, retain a demonstration record, relevant task list, configuration or document version, unresolved defects, and a decision to proceed or replan. Create an immutable submission tag or equivalent recorded commit when delivering a formal version; do not claim that a tag already exists. M5 must assess the 19 mandatory requirements from the requirements specification. M6 cannot be recorded as an accepted prototype delivery while a mandatory baseline check remains failed, blocked, or not tested.

## V. Risks and Mitigation

| Risk | Potential impact | Mitigation |
|---|---|---|
| **Excessive scope for one developer** | Delayed integration and incomplete mandatory functions. | Complete Must requirements first. Keep live integrations and GPS route deviation outside the initial delivery unless prerequisites are available. |
| **Absence of confirmed anomaly labels** | Limited ability to measure detection accuracy. | Prepare a documented reviewed reference set, identify uncertain cases, and report synthetic tests separately. |
| **Data quality problems** | Misleading events and reference statistics. | Validate inputs, retain provenance, and distinguish quality flags from operational irregularities. |
| **Unavailable GPS tracks or route geometry** | Route deviation analysis cannot be evaluated. | Prioritise running-time and dwell-time analysis using the supplied records. |
| **LLM unavailability or unsupported explanations** | Missing or misleading recommendations. | Provide deterministic fallback guidance and check generated statements against event evidence. |
| **Integration or processing failures** | Interrupted jobs or inconsistent results. | Define component contracts early, persist job states, and test failure handling. |
| **Limited participant availability** | Reduced usability evidence. | Arrange evaluation early; report an author pilot separately if external testing cannot be completed. |

### Risk Ownership Triggers and Review

The seven risks above are proposed open risks. Nurassyl Meirbek owns their monitoring and response because the project is individual. The supervisor is consulted on changes to academic scope or evaluation claims. Review triggers weekly and at milestone reviews; record current evidence, response progress, and any resulting task. No numerical likelihood or impact rating is presented as an assessed result.

| Risk ID | Risk owner | Trigger requiring action | Contingency or review decision |
|---|---|---|---|
| R01 Scope exceeds capacity | Student | Must work slips across a milestone or a prerequisite blocks integration | Replan remaining Must tasks and defer Should/Could work; consult the supervisor on material scope changes |
| R02 No confirmed anomaly labels | Student | Reviewed cases remain uncertain or evaluation lacks reliable positives and negatives | Report descriptive comparisons and bounded reviewed-set findings; do not claim full-dataset recall |
| R03 Data quality problems | Student | Counts do not reconcile or faults contaminate comparison groups | Correct validation and provenance before fitting; rerun affected derived results |
| R04 Missing GPS or route geometry | Student | Required inputs unavailable when optional route-deviation work is due | Defer FR08 and record the missing prerequisite; retain mandatory duration analysis |
| R05 LLM unavailable or misleading | Student | Missing access, timeout, invalid output, or unsupported factual statement | Use labelled rules; retain the live-integration test status and review grounding failures |
| R06 Integration or processing failure | Student | Contract mismatch, interrupted job, stale result, or failed persistence | Fix contracts and run/attempt checks; preserve successful results and retest failure handling |
| R07 Limited participants | Student | No confirmed participants before the M5 test window | Recruit earlier or revise the study plan; report an author pilot separately and disclose missing external evidence |

An author pilot can identify usability problems but cannot be described as independent participant testing. If the specified acceptance check has not actually been completed, record it as pending rather than substituting an unrecorded informal walkthrough. Close a risk only when its condition no longer applies or its response has evidence; retain a residual limitation where appropriate.

## VI. Dependencies and Immediate Next Steps

Data import and validation must precede detection experiments. Detection results must be available before event investigation and recommendation features can be evaluated. Final evaluation depends on an integrated prototype and a fixed test configuration.

The immediate steps are to confirm access to the supplied Git repository and YouTrack project, enter the prioritised requirements, and create the first tasks for database design, data import, and validation.

**Submission readiness:** working repository and YouTrack links, accessible to the intended reviewer, are required as evidence. Both URLs have been supplied by the student and are recorded above. Reviewer access, issue contents, and repository history have not been verified by this document.

### Dependency Register

| Dependency | Enables | Handling if unavailable |
|---|---|---|
| Verified source files, semantics, and counts | Schema, import, validation, chronological split | Resolve the manifest before freezing evaluation inputs |
| Validated observations and provenance | Contextual indicators and detector comparison | Keep invalid inputs out of affected calculations; track inclusion policy |
| Frozen features, groups, thresholds, and seed | Reproducible method outputs and event evidence | Delay final scoring until the experiment configuration is fixed |
| Java/Python API and job-state contracts | Integrated analysis and failure recovery | Agree schemas and fault cases before parallel component changes |
| Traceable candidate events | Event details, summaries, recommendations, export | Use labelled fixtures for UI work; use real computed outputs for final acceptance |
| Optional raw GPS and route geometry | FR08 route-deviation checks | Defer independently of the mandatory historical workflow |
| Optional live transport feed and model access | FR15 and conditional FR12 provider integration | Preserve historical functions and mandatory recommendation fallback |
| Integrated stable build and reference environment | M5 performance, failure, and usability checks | Complete integration and record versions before final measurements |

### Immediate Task Sequence

| Order | Next action | Completion evidence |
|---|---|---|
| 1 | Confirm reviewer access to the supplied Git repository and YouTrack project | Supplied URLs with recorded reviewer-access checks |
| 2 | Enter the 22 requirements with their priorities and verification record IDs | 15 functional plus 7 non-functional records or a linked requirement register; all 19 Must items identifiable |
| 3 | Create the first schema, import, validation, and job-contract tasks | Owners, dependencies, milestone, and explicit acceptance checks |
| 4 | Agree the implementation start date and realistic weekly workload | Dated November 2026–February 2027 baseline with the exact submission deadline and final-review buffer confirmed |
| 5 | Verify source data and implement the repeatable import foundation | Manifest, migrations, reconciled import counts, and repeat-import evidence |
| 6 | Arrange the first supervisor demonstration and evaluation recruitment | Recorded arrangements or explicit pending status; follow-up actions |

## VII. Change Control and Evidence of Delivery

Changes to a requirement, interface, dataset, method configuration, or acceptance target must identify the affected tasks and verification records. Update linked documents consistently. Preserve the previous baseline and the reason for revision. Review numerical targets before formal measurements; do not silently relax the two-second request target or five-minute usability target after a failure.

For a submission, retain the exact source/document version, requirement-to-task mapping, applicable test results, raw measurement files, unresolved defects, deferred optional scope, and risk status. Include deployment instructions and access information required for review. The existing mockup and planned documents demonstrate design work; they do not establish an operational backend, actual YouTrack activity, or passing production evaluation.

## VIII. Submission Readiness Checklist

| Evidence | Current documented state | Required next step |
|---|---|---|
| Git repository | Student-supplied URL recorded in Section II | Verify reviewer access and identify the reviewed version |
| YouTrack project | Student-supplied DIP project URL recorded in Section II | Verify reviewer access, populate tasks, and record their states |
| Responsibilities | Individual owner and supervisor specified | Confirm review arrangements and record decisions as they occur |
| Milestones | Six provisional milestones from November 2026 to February 2027 | Confirm the start date and exact February deadline; adjust milestone windows and correction buffer |
| Risks and dependencies | Seven risks with triggers and owners; dependencies listed | Create response tasks and update from observed evidence |
| Requirement traceability | Mapping process defined | Populate real issue, change, and verification links |
| Acceptance evidence | Planned in the verification document | Execute applicable tests and record results before claiming acceptance |

The management criterion is fully evidenced only when project activity can be followed through real repository history, issue records, and verification results. This plan defines how to produce that evidence and records the supplied links and distinguishes them from unverified project activity.
