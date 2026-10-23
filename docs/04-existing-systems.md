# Existing System Comparison

**Author:** Meirbek Nurassyl
**Project:** Urban public transport monitoring and anomaly detection with AI assisted recommendations
**Task:** Existing system comparison
**Review date:** October 24, 2026

## I. Purpose and Method

This document compares four existing systems relevant to an urban public transport monitoring prototype for selected Astana bus routes. The comparison examines ten consistent criteria covering data, monitoring, analysis, AI assistance, deployment, and incident response. It identifies established capabilities and explains the scope of the proposed diploma contribution.

Systems were selected because they are publicly documented and address at least one major part of the proposed workflow. Swiftly and Optibus are direct comparators for transport operations and service monitoring. OneBusAway is an open-source passenger information platform. TransitGPT is a research comparator for natural-language interaction with transport data. These differences in purpose are retained when interpreting the matrix.

Evidence comes from official product documentation, project documentation, and the TransitGPT research publication. No system was tested hands-on. Commercial capabilities are vendor-reported rather than independently verified here. “Not documented” means that the reviewed sources did not establish a capability; it does not mean the capability is absent. TransitGPT entries refer to the published 2025 implementation, with its repository used as supporting deployment evidence.

## II. System Descriptions

### A. Swiftly

Swiftly is a commercial transport data platform serving operational and analytical teams. Its documentation describes schedule and vehicle-location integrations, live service visibility, and historical analysis [1]–[3]. Proactive Operations highlights early, bunched, and missing vehicles and supports investigation through GPS playback and shared incident records [2]. Reporting and Insights provides performance analysis, including running times, dwell components, and data completeness [3].

Swiftly is a relevant benchmark for presenting operational evidence and supporting investigation. The reviewed pages do not establish a conversational LLM recommendation workflow or detailed GPS rejection rules. This documentary limit should not be interpreted as proof that such capabilities are unavailable.

### B. Optibus Control and Agent

Optibus Control is a modular commercial cloud solution for live operations, with connections to in-vehicle systems [4]. Its documented enhancements include Map Hub, live vehicle tracking, punctuality information, traffic overlays, and ETA fallback when live information is unavailable [5]. These functions make it a direct comparator for operational visibility and disruption response.

Optibus Agent adds natural-language interaction and operational assistance. Documented use cases include import-error correction, scheduling configuration, staffing queries, and drafting driver messages during disruptions. The vendor states that users review actions before they are applied [6]. AI assistance therefore already exists in a direct transport operations comparator. The diploma must establish its contribution through a defined implementation and evaluation rather than claim that AI recommendations alone are new.

### C. OneBusAway

OneBusAway is an open-source suite of transit information tools providing riders with real-time vehicle locations, arrivals, and alerts through mobile apps, web services, and APIs [7], [8]. Its deployment documentation includes official Docker images and production deployment guidance [9]. It is relevant to feed integration, public information delivery, and customisable deployment.

Its primary documented purpose differs from a dispatcher anomaly investigation system. The reviewed overview documentation does not establish a general operational anomaly detector, an integrated LLM assistant, or a comparable incident investigation workflow. OneBusAway is therefore a partial comparator rather than a like-for-like replacement for the proposed prototype.

### D. TransitGPT

TransitGPT is a research framework that answers natural-language questions about GTFS data by generating Python code for server-side retrieval, calculation, and visualisation [10]. The published system focuses on GTFS Static and explicitly excludes GTFS-Realtime. Its code is open source, and the repository includes Docker deployment material [11].

TransitGPT is relevant to the separation of structured calculations from a conversational interface. The published scope does not establish live operational anomaly detection or incident management. Feed errors and missing optional information can affect answers [10]. The proposed project can draw on its analytical interaction pattern while separately evaluating detection and evidence-grounded recommendations on operational records.

## III. Comparison Matrix

**TABLE I. Four systems assessed against ten consistent criteria**

The matrix describes documented capabilities within the reviewed scope. It does not rank system quality or report benchmark results. “Not established” and “not documented” indicate insufficient evidence in the reviewed sources.

| Comparison criterion | Swiftly [1]–[3] | Optibus Control and Agent [4]–[6] | OneBusAway [7]–[9] | TransitGPT [10], [11] |
|---|---|---|---|---|
| **1. Primary users** | Dispatchers, operations staff, planners, schedulers, and passenger-information teams. | Dispatchers, depot managers, planners, and other transport operations staff. | Primarily passengers; agencies and developers maintain the information services. | Users seeking to retrieve, analyse, and visualise GTFS information through natural-language questions. |
| **2. Supported data** | Schedule data and vehicle-location information, including GTFS and CAD/AVL integrations. | Live vehicle data, operational plans, historical running-time patterns, and connected vehicle systems. | GTFS and real-time feeds, including GTFS-Realtime. | GTFS Static feeds stored on the application server. |
| **3. Real-time monitoring** | Live vehicle locations, service status, and operational issues. | Live vehicle tracking, punctuality, service delivery, and disruption monitoring. | Real-time vehicle locations, arrivals, and service alerts. | The published version explicitly excludes GTFS-Realtime. |
| **4. Map visualisation** | Operational maps, GPS playback, and historical speed maps. | Map Hub combines vehicles, routes, stops, punctuality, and traffic information. | Web maps and stop pages with real-time information. | Generates interactive visualisations in response to supported questions. |
| **5. Historical analysis** | Historical running times, dwell-time breakdowns, speeds, and on-time performance. | Historical running-time patterns support predictions; service-delivery reporting is documented. | Historical performance dashboards are not established by the reviewed overview documentation. | Calculates information from stored static feeds; observed historical performance is outside its documented scope. |
| **6. Identification of operational irregularities** | Highlights early, bunched, or missing vehicles and supports investigation. | Identifies off-schedule vehicles and supports disruption response. | Displays delays and alerts; a general anomaly-detection module is not documented. | Answers questions about static data; operational anomaly detection is not documented. |
| **7. Data quality and missing information** | Data-completeness reporting is documented; detailed GPS rejection rules are not established. | ETA fallback for unavailable live data and AI-assisted import validation are documented. | Feed integration is documented; comprehensive GPS anomaly classification is not established. | Feed errors and missing optional information can affect answers. |
| **8. Natural-language AI assistance** | Conversational LLM recommendations are not established by the reviewed pages. | Optibus Agent analyses operational information and proposes actions, subject to human confirmation. | An integrated LLM assistant is not documented in the reviewed sources. | Core functionality: translates questions into Python code for retrieval, calculation, and visualisation. |
| **9. Deployment and customisation** | Vendor-operated commercial platform with system integrations. | Modular commercial cloud platform. | Open-source software with Docker deployment documentation. | Open-source implementation with a Docker deployment file. |
| **10. Support for incident investigation and response** | GPS playback and shared incident records support investigation and coordination. | Controllers can review disruptions, communicate with drivers, and approve proposed actions. | Passenger-facing information is documented; a comparable dispatcher investigation workflow is not established. | Conversational analysis is supported; incident management is outside the published scope. |

## IV. Gap Analysis

Maps, historical analytics, operational monitoring, and AI assistance already exist in the reviewed systems. Swiftly and Optibus demonstrate substantial overlap with the proposed operational workflow, while OneBusAway and TransitGPT provide relevant examples of open deployment and natural-language analysis. These functions alone therefore do not establish the originality of the diploma.

The proposed solution is justified as a focused, independently implemented and evaluated prototype for selected Astana bus routes. The comparison motivates five planned contributions:

1. **Separate data quality from movement events.** Distinguish missing, duplicate, or inconsistent input from candidate operational irregularities. Show relevant quality flags so that a suspicious record is not automatically presented as a service incident.
2. **Compare detection approaches consistently.** Evaluate rules, contextual statistical thresholds, and Isolation Forest on the same eligible data and scenarios. Document event definitions, data splits, and the limits of available labels.
3. **Present evidence for each event.** Display the observations, indicators, context, and duration supporting a detection so that a reviewer can investigate the result.
4. **Ground recommendations in calculated facts.** Supply verified event indicators to the recommendation component, provide a rule-based fallback, and retain dispatcher review. Assess factual consistency separately from detection correctness.
5. **Evaluate the complete investigation workflow.** Measure detection errors, processing time, recommendation quality, and case-investigation time using a defined protocol. Comparison of investigation time requires equivalent cases and a documented reference workflow.

These are planned contributions requiring implementation and testing. The reviewed documentation does not establish whether commercial systems expose an equivalent research comparison or whether the proposed combination is globally unique. The gap is the need to implement and evaluate the stated workflow in the diploma's local data context.

The comparison does not establish that the prototype will outperform commercial systems, cost less to operate, or reduce actual bus delays. Such claims would require separate cost, benchmark, or field evidence. A successful prototype evaluation can establish behaviour within the chosen dataset and scenarios; broader operational benefits remain a future validation task.

## V. Limitations of This Comparison

- Commercial features are documented by vendors and were not independently tested. Marketing descriptions do not establish performance under Astana operating conditions.
- The systems have different primary purposes. Passenger information and static-data analysis platforms should not be judged as failed dispatcher tools merely because they have a narrower documented scope.
- Missing documentation is treated as uncertainty, not evidence that a capability is absent. This applies especially to GPS filtering rules, historical dashboards, AI functionality, and incident investigation features.
- No common dataset, controlled benchmark, product trial, or procurement assessment was conducted. The matrix supports scope analysis rather than a quantitative ranking.
- Pricing, total operating cost, Kazakhstan availability, local integrations, contractual terms, and language support were not assessed. Open-source availability alone does not establish low deployment or maintenance costs.
- Product documentation and repositories can change. TransitGPT's static-data scope refers to the cited publication; later repository changes should be assessed separately before implementation.
- The proposed prototype is planned. Detection performance, recommendation usefulness, investigation speed, scalability, and any service improvement remain to be measured.

## References

[1] Swiftly, “Transit Data Platform,” official product documentation. Available: <https://www.goswift.ly/transit-data-platform>. Accessed: October 24, 2026.

[2] Swiftly, “Proactive Operations,” official product documentation. Available: <https://www.goswift.ly/proactive-operations>. Accessed: October 24, 2026.

[3] Swiftly, “Reporting and Insights,” official product documentation. Available: <https://www.goswift.ly/reporting-insights>. Accessed: October 24, 2026.

[4] A. Levner, “Optibus Expands End-to-End Platform with Real-Time Control for Public Transportation,” Optibus, June 12, 2025. Available: <https://blog.optibus.com/optibus-expands-end-to-end-platform-with-real-time-control-for-public-transportation>. Accessed: October 24, 2026.

[5] A. Levner, “Optibus Expands Real-Time Control Capabilities with Four Major Enhancements,” Optibus, February 4, 2026. Available: <https://blog.optibus.com/real-time-control-capabilities>. Accessed: October 24, 2026.

[6] S. Goldstein, “Optibus Agent Webinar: Recap & FAQs of Everything We Covered,” Optibus, July 6, 2026. Available: <https://blog.optibus.com/optibus-agent-webinar-recap-faqs-of-everything-we-covered>. Accessed: October 24, 2026.

[7] OneBusAway, “OneBusAway Developers,” official developer documentation. Available: <https://developer.onebusaway.org/>. Source supplied with the comparison.

[8] OneBusAway, “About,” official developer documentation. Available: <https://developer.onebusaway.org/about>. Accessed: October 24, 2026.

[9] OneBusAway, “Deployment Guides,” official developer documentation. Available: <https://developer.onebusaway.org/guides/deployment>. Accessed: October 24, 2026.

[10] S. Devunuri and L. Lehe, “TransitGPT: a generative AI-based framework for interacting with GTFS data using large language models,” Public Transport, vol. 17, pp. 319–345, 2025. doi: 10.1007/s12469-025-00395-w. Available: <https://doi.org/10.1007/s12469-025-00395-w>. Accessed: October 24, 2026.

[11] UTEL-UIUC, “TransitGPT,” source code repository. Available: <https://github.com/UTEL-UIUC/TransitGPT>. Accessed: October 24, 2026.
