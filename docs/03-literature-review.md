# Literature Review

**Author:** Meirbek Nurassyl  
**Project:** Urban public transport monitoring and anomaly detection with AI assisted recommendations  
**Task:** Literature review  
**Review date:** October 24, 2026

## I. Purpose and method

This review examines the evidence for a public transport monitoring prototype that processes bus operation records, identifies unusual movement patterns, and presents evidence and recommendations for dispatcher review. The intended evaluation context is Astana, using GPS derived bus trip and stop records. The central conclusion is that reliable monitoring depends on data provenance and contextual indicators before it depends on model complexity. An anomaly score can identify an unusual observation, but it does not by itself establish a service disruption, its cause, or the correct operational response.

The review organises the 12 sources selected for the project around five decisions: (A) how to interpret and process transport records, (B) how to detect movement anomalies and incidents, (C) how to measure dwell time and headway irregularity, (D) how to use language models for transport analysis and recommendations, and (E) how to compare detection methods. It is a focused narrative review rather than a systematic review. The selection covers ten scientific publications and two official specifications. Nine scientific publications date from 2023 to 2026; the original Isolation Forest paper from 2008 is included as the foundational source for the proposed machine learning baseline.

Sources were retained because they inform a concrete data, architecture, detection, or evaluation decision and have a DOI or stable official link. The selection includes empirical studies, dataset papers, a review article, exploratory AI research, and technical specifications. These types provide different levels of evidence: specifications define data semantics, dataset papers explain provenance, and empirical studies evaluate methods under particular conditions. They should not be treated as interchangeable validation of the proposed system.

The source assessments for Zou et al. [2] and Goncu and Sahin [3] are based on publisher abstracts. Limitations and project implications in the analysis table include critical assessments of applicability to Astana. The selection was not governed by a documented reproducible database search or a primary research only rule. It therefore cannot establish that all relevant work has been identified.

## II. Analysis table

**TABLE I. Reviewed sources**

| # | Source | Type | Approach | Key findings | Limitations | Relevance to the project |
|---|---|---|---|---|---|---|
| [1] | Mansurova et al., 2025 | Dataset article | Reconstructs bus trip and stop records from GPS in Astana | Provides observed running and dwell times for three routes over 55 days | Narrow route and seasonal coverage; reconstructed observations are not planned schedules | Establishes local data provenance and evaluation scope |
| [2] | Zou et al., 2023 | Journal article; abstract assessed | Flink stream processing, Complex Event Processing, and Longest Common Subsequence similarity | Reports 90.5% and 89.3% accuracy for route deviation and failure to stop detection | Requires trajectories and reference sequences; distributed processing may be excessive for a small prototype | Informs route and stop sequence checks where suitable input exists |
| [3] | Goncu and Sahin, 2024; online 2023 | Journal article; abstract assessed | GPS based incident detection on Istanbul Metrobus | Evaluates detection rate, false alarms, and mean detection time against 19 incidents | Small incident sample and dedicated BRT corridor limit transferability | Motivates event based evaluation and detection latency reporting |
| [4] | Xian et al., 2024 | Data descriptor | Archives and cleans GTFS Realtime arrival and departure updates | Provides a processing pipeline and 25 months of Sydney records | Latest updates are treated as best estimates; they are not independent ground truth | Informs ingestion, deduplication, storage, and timestamp provenance |
| [5] | Kwesiga et al., 2026; online 2025 | Journal article | Empirical dwell time analysis and signal priority simulation | Dwell time magnitude and variability differ by stop and time period | Passenger count and door activity measurements differ from GPS reconstructed dwell | Supports contextual dwell baselines and careful feature interpretation |
| [6] | Rezazada et al., 2024 | Review article | Synthesises bus bunching research from demand, supply, and decision perspectives | Relates irregularity to passenger and operator outcomes and control choices | Does not validate a local detector or a particular intervention | Defines operational context and separates detection from control |
| [7] | Kim et al., 2025; online 2024 | Journal article | Resilience based headway inconsistency measurement | Measures magnitude and duration; applied to 320 Seoul lines | Needs sufficiently complete neighbouring vehicle observations and local calibration | Supports persistent event detection and duration reporting |
| [8] | Voß, 2023 | Exploratory journal article | Examines generative AI responses to bunching and bridging problems | Identifies potential for idea generation alongside academic limitations | Does not validate dispatcher advice or demonstrate service improvement | Motivates constrained suggestions and specialist review |
| [9] | Devunuri and Lehe, 2025 | Journal article | TransitGPT uses LLM generated Python to query, calculate, and visualise GTFS | Evaluates the framework on 100 tasks | GTFS Static focus; feed errors and hallucinations affect answers | Informs code based calculation and evidence grounded language interfaces |
| [10] | Liu et al., 2008 | Conference paper | Isolation Forest isolates unusual observations through random partitioning | Introduces a computationally efficient generic anomaly detection approach | Scores have no inherent transport meaning; features and thresholds need validation | Provides a machine learning baseline alongside rules and statistics |
| [11] | GTFS Schedule Reference | Official specification | Defines routes, stops, trips, stop times, service calendars, and constraints | Provides standard identifiers and relationships for scheduled service | Structure does not guarantee feed quality or establish observed performance | Guides validation and separation of schedules from observations |
| [12] | GTFS Realtime Reference | Official specification | Defines trip updates, vehicle positions, alerts, timestamps, and uncertainty | Supports interchange of changing operational information | Optional or missing fields constrain inference; specification does not guarantee local feed access | Guides a future live adapter and explicit missingness handling |

## III. Critical review

### A. Data provenance and transport record semantics

Mansurova et al. [1] provide the most directly relevant local foundation because the records describe Astana bus operations. Their value is geographic relevance and a documented path from raw GPS to analytical records. Their scope also constrains the diploma: three routes and 55 days cannot represent the entire network or a full seasonal cycle. Evaluation on this material can demonstrate prototype behaviour within the observed sample, while broader performance remains an empirical question.

The distinction between observed and planned time is essential. Reconstructed arrivals and departures describe vehicle behaviour inferred from GPS. GTFS Schedule [11] defines planned service information. Even when reconstructed records resemble GTFS tables, their timestamps cannot automatically serve as planned arrival times. Subtracting one observed timestamp from another does not measure schedule delay. A valid lateness indicator requires an independently sourced schedule, correct trip matching, and consistent service dates. Without these, the prototype should describe unusually long running time or dwell time rather than confirmed lateness.

Xian et al. [4] demonstrate why storing operational history requires explicit rules for repeated updates, missing records, and the interpretation of timestamps. Their pipeline retains the latest arrival and departure updates as the best available estimates. This is a useful engineering choice, but it does not make the estimates independent observations. Consequently, importing a feed and validating an event are separate tasks. The local implementation should preserve the original record, transformation rules, and quality flags so that a dispatcher can trace a computed indicator to its input.

The two GTFS references [11], [12] complement these dataset papers by defining relationships and message semantics. They support validation of identifiers, stop order, dates, and available fields. They do not establish that the Astana dataset contains every field or that an accessible live feed exists. A historical replay can validate processing and interface behaviour, but its results must be described separately from a live deployment.

### B. Movement anomalies and incident detection

Zou et al. [2] examine route deviation and failure to stop through stream processing and sequence similarity. This provides a useful contrast with numerical anomaly scoring: a bus can violate a route or stop sequence without having an extreme value in a running time feature. However, sequence checks require sufficiently detailed trajectories and reliable reference sequences. If the project works only with aggregated stop records, some deviations may no longer be observable. The proposed feature set therefore has to follow the available evidence rather than assume raw GPS precision survives preprocessing.

Goncu and Sahin [3] evaluate incidents with detection rate, false alarm rate, and mean detection time. These measures are closer to dispatcher needs than overall accuracy alone: a system can appear accurate when incidents are rare yet miss important events or generate an impractical number of alerts. Their dedicated BRT corridor and 19 recorded incidents constrain transfer to mixed traffic in Astana. The reported evaluation design is useful, but its performance cannot be adopted as a target city result.

Together, [2] and [3] support defining the event before choosing the detector. Route deviation, skipped stops, prolonged running time, and irregular headways require different inputs and reference conditions. The prototype should distinguish an operational anomaly from a data quality problem such as a duplicate timestamp, missing trip segment, or implausible coordinate. Otherwise, corrupted observations can dominate model scores and produce alerts that have no operational meaning.

### C. Dwell time headways and persistence

Kwesiga et al. [5] show that dwell time variability depends on stop and time context. This weakens the case for a single threshold applied to every stop. A busy interchange and a lightly used stop may have different normal ranges. The project can test contextual medians and dispersion measures by stop, direction, and time period, while checking whether each group contains enough observations for a stable estimate. These are proposed implementation choices, not thresholds validated by [5].

Measurement differences also matter. Door activity and passenger count data give information that GPS buffers may not capture. A vehicle near a stop could be boarding passengers, queuing, or waiting at a signal. A GPS reconstructed dwell time is therefore an indicator with uncertainty rather than a direct explanation of passenger service time. Recommendations should preserve that uncertainty instead of assigning a cause solely from duration.

Rezazada et al. [6] connect bus bunching to interacting demand, supply, and control processes. Their review explains why identifying irregular headways does not determine whether holding, dispatch adjustment, or another intervention is appropriate. A response can redistribute waiting or delay across passengers and vehicles. For this diploma, the defensible output is a reviewable event and a conditional suggestion, while intervention effectiveness needs a separate operational study.

Kim et al. [7] add a temporal perspective by considering both magnitude and duration of inconsistency. This supports grouping repeated exceedances into events and displaying persistence rather than issuing a new alert for every abnormal row. It also exposes a data requirement: headways depend on observations of successive vehicles serving the same stop and direction. Missing neighbouring trips can create an apparently large gap. Headway indicators must therefore be accompanied by coverage checks and should be withheld when the necessary comparison cannot be made reliably.

### D. Language models for analysis and recommendations

Voß [8] explores generative AI in transport disruption problems. The work motivates examining AI assisted reasoning, but it does not show that generated recommendations improve real bus operations. Fluent advice is not evidence of correct diagnosis, feasibility, or benefit. A recommendation should be treated as a candidate for dispatcher review and assessed independently from the detector that triggered it.

TransitGPT [9] offers a more concrete software pattern: use a language model to help interact with structured GTFS information and perform calculations through generated code. Its evaluation on 100 tasks is relevant to testing an analytical interface, but its static data focus limits conclusions about live incident response. For the proposed project, indicator calculations should be implemented and checked in the analysis component. The language model should receive verified values, event context, and data quality flags, then produce an explanation and a conditional response grounded in those facts.

This separation enables distinct evaluations. Detector performance concerns whether events are correctly identified. Recommendation evaluation concerns whether the text matches the supplied evidence, avoids invented causes or measurements, communicates uncertainty, and is useful to a dispatcher. A correct detector does not guarantee a correct recommendation, and a plausible recommendation does not validate the detector. Claims of reduced real world delays require a future pilot with an appropriate comparison, beyond demonstrating that the prototype generates advice.

### E. Rules contextual statistics and Isolation Forest

Isolation Forest [10] is relevant because labelled operational incidents may be scarce. Its scores identify unusual combinations of numerical features without requiring a complete catalogue of incident labels. However, unusual observations are not necessarily harmful, and common disruptions may not be statistical outliers. Route, stop, direction, and time context must be represented through features or suitable grouping; the method does not infer transport semantics automatically.

The literature supports testing three complementary approaches: explicit rules for interpretable conditions, contextual statistical thresholds for unusual values relative to similar service, and Isolation Forest for multivariate irregularity. This comparison is the diploma's proposed experimental design. None of the reviewed sources establishes in advance which will perform best on the Astana records.

All methods should use the same eligible data, event definitions, and test scenarios. Chronological training and evaluation splits can reduce leakage from neighbouring observations; preprocessing and thresholds must be fitted using training or validation data rather than the final test period. If verified incident labels are unavailable, results should distinguish expert reviewed events, injected anomalies, and unlabelled outliers. Synthetic scenarios can test sensitivity to a known disturbance, but they cannot establish real incident recall. Useful outputs include precision and recall where labels permit, false alerts per service period, processing time, and detection delay in replay. Alert rate alone measures workload, not correctness.

## IV. Research gap and implications for the project

Within the reviewed evidence, local GPS reconstruction [1], anomaly and incident detection [2], [3], temporal service indicators [5]–[7], and language interfaces [8], [9] are addressed separately. The sources do not demonstrate an integrated and locally validated Astana workflow that combines data quality checks, a controlled comparison of detection methods, and evidence grounded recommendations for dispatcher review. This is a gap in the reviewed set, not proof that no comparable system exists anywhere.

The project's contribution can therefore be framed as the design and evaluation of that integrated prototype. Its contribution is conditional on reproducible implementation and measured results rather than the novelty of any individual algorithm. The following implications translate the reviewed limitations into project decisions:

1. **Preserve data meaning [1], [4], [11], [12].** Store planned schedules, reconstructed observations, predictions, and quality flags distinctly. Compute schedule delay only when a valid planned reference is available.
2. **Match indicators to available input [2], [3].** Implement trajectory or stop sequence checks only where the data supports them. Separate corrupted records from candidate service disruptions.
3. **Use local context [5], [7].** Test stop and time dependent baselines, document minimum sample requirements, and avoid headway conclusions when neighbouring vehicle observations are incomplete.
4. **Represent events over time [3], [7].** Merge repeated flags into events, retain their duration, and measure alert workload and detection delay where the replay permits.
5. **Compare simple and machine learning methods [10].** Evaluate rules, contextual statistics, and Isolation Forest under common splits and scenarios. Explain what each metric can establish when labels are limited.
6. **Ground recommendations in calculated evidence [8], [9].** Provide the language model with verified indicators and require recommendations to state relevant uncertainty. Keep operational decisions under dispatcher review.
7. **Bound the claimed benefit [1], [6], [8].** Report prototype performance within the sampled routes and dates. Treat network generalisation and reduced service delays as questions for future validation.

## V. Limitations of this review

- The review contains a selected set of 12 sources rather than a reproducible systematic search. Relevant local publications or alternative methods may have been missed.
- Two studies [2], [3] were assessed from publisher abstracts. Their implementation details, experimental controls, and failure cases require full text assessment before close replication.
- The evidence combines dataset descriptions, empirical studies, a review, exploratory AI work, and specifications. A data format or conceptual argument cannot substitute for a detector evaluation.
- The original Isolation Forest paper [10] is outside the recent publication period. It establishes the baseline method, but this review does not comprehensively compare later anomaly detection variants.
- Reported results use different cities, operating environments, datasets, and metrics. They cannot be ranked as if they came from a common benchmark, and numerical results in the table are reported study findings rather than project outcomes.
- The Astana material [1] covers three routes and 55 days. It cannot establish performance across all routes, seasons, or unusual operating conditions.
- The reviewed AI studies [8], [9] do not validate safe or effective real time dispatch interventions. The proposed recommendation layer requires its own factual consistency and usability evaluation.
- The research gap is bounded by the reviewed evidence. Claims about worldwide novelty, accessible local live feeds, and real operational improvement remain unestablished.

## References

[1] A. Mansurova, A. Mussina, S. Aubakirov, A. Nugumanova, and D. Yedilkhan, “From Raw GPS to GTFS: A Real-World Open Dataset for Bus Travel Time Prediction,” *Data*, vol. 10, no. 8, article 119, 2025. doi: 10.3390/data10080119. Available: <https://doi.org/10.3390/data10080119>.

[2] Zou, Xiong, Wang, and Qin, “Research on Real-Time Anomaly Detection Method of Bus Trajectory Based on Flink,” *Electronics*, vol. 12, no. 18, article 3897, 2023. doi: 10.3390/electronics12183897. Available: <https://doi.org/10.3390/electronics12183897>.

[3] S. Goncu, and I. Sahin, “GPS-based incident detection algorithm for two-lane bus rapid transit systems: case study of Istanbul Metrobus,” *Public Transport*, vol. 16, pp. 803–829, 2024; published online 2023. doi: 10.1007/s12469-023-00343-6. Available: <https://doi.org/10.1007/s12469-023-00343-6>.

[4] T. Xian, T. K. Chin, B. Marks, J. D. Nelson, and E. Moylan, “Bus arrival and departure time updates in the Greater Sydney Area,” *Scientific Data*, vol. 11, article 1034, 2024. doi: 10.1038/s41597-024-03873-1. Available: <https://doi.org/10.1038/s41597-024-03873-1>.

[5] D. K. Kwesiga, A. Guin, and M. Hunter, “Analysis of bus dwell times from automated passenger count data and the impact of dwell-time variability on the performance of transit signal priority,” *Public Transport*, vol. 18, pp. 311–333, 2026; published online 2025. doi: 10.1007/s12469-025-00393-y. Available: <https://doi.org/10.1007/s12469-025-00393-y>.

[6] M. Rezazada, N. Nassir, E. Tanin, and A. Ceder, “Bus bunching: a comprehensive review from demand, supply, and decision-making perspectives,” *Transport Reviews*, vol. 44, no. 4, pp. 766–790, 2024. doi: 10.1080/01441647.2024.2313969. Available: <https://doi.org/10.1080/01441647.2024.2313969>.

[7] J. T. Kim, S. Moon, and D. Kim, “Resilience-Based Approach to the Measurement of Headway Inconsistency,” *Transportation Research Record*, vol. 2679, no. 1, pp. 1662–1679, 2025; published online 2024. doi: 10.1177/03611981241255907. Available: <https://doi.org/10.1177/03611981241255907>.

[8] S. Voß, “Bus Bunching and Bus Bridging: What Can We Learn from Generative AI Tools like ChatGPT?,” *Sustainability*, vol. 15, no. 12, article 9625, 2023. doi: 10.3390/su15129625. Available: <https://doi.org/10.3390/su15129625>.

[9] S. Devunuri, and L. Lehe, “TransitGPT: a generative AI-based framework for interacting with GTFS data using large language models,” *Public Transport*, vol. 17, pp. 319–345, 2025. doi: 10.1007/s12469-025-00395-w. Available: <https://doi.org/10.1007/s12469-025-00395-w>.

[10] F. T. Liu, K. M. Ting, and Z.-H. Zhou, “Isolation Forest,” in *Proceedings of the Eighth IEEE International Conference on Data Mining*, 2008, pp. 413–422. doi: 10.1109/ICDM.2008.17. Available: <https://doi.org/10.1109/ICDM.2008.17>. Author hosted full text: <https://cs.nju.edu.cn/zhouzh/zhouzh.files/publication/icdm08b.pdf>.

[11] General Transit Feed Specification, “GTFS Schedule Reference,” official technical specification. Available: <https://gtfs.org/documentation/schedule/reference/>. Source selection access date: October 23, 2026.

[12] General Transit Feed Specification, “GTFS Realtime Reference,” official technical specification. Available: <https://gtfs.org/documentation/realtime/reference/>. Source selection access date: October 23, 2026.
