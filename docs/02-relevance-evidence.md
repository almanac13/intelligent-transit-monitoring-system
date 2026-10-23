# Evidence of Relevance

**Author:** Meirbek Nurassyl Talgatbekuly, SE-2415  
**Project:** Development of an Intelligent Web Service for Improving the Efficiency of Urban Public Transport  
**Supervisor:** Madina Askarovna Yermaganbetova, Associate Professor  
**Date:** October 24, 2026  
**Status:** Published data provenance and an initial analysis of local historical files

## I. Overview and Evidence Categories

This document explains how available transport evidence informs the proposed service requirements. The evidence is a published dataset description and a reproducible exploratory inspection of local Astana transport files. The inspection confirms input scope, identifies a specific data-quality issue, and gives traceable examples of unusually long durations for investigation.

No dispatcher interviews, client agreement, or participant findings have been supplied for this project. None is invented here. Data analysis provides evidence of technical relevance; it does not establish stakeholder demand or demonstrate that the interface reduces investigation time.

| Category | Meaning in this document |
|---|---|
| Published source | A statement made by the dataset authors, with page/section reference |
| Verified local finding | A calculation or check performed on the identified local files for this document |
| Candidate for review | An observation exceeding a stated descriptive comparison; not a confirmed operational incident |
| Assumption or planned check | A user need, causal explanation, or future measurement not established by the evidence |

## II. Sources and Provenance

Mansurova et al. [1] describe a GPS-derived Astana dataset for routes 10, 12, and 46. Page 4 reports 19,769 valid trips and 785,976 stop-time records over July 29–September 21, 2024. The article identifies INNOFORCE SOLUTIONS as the original GPS provider and links the released dataset to Zenodo DOI 10.5281/zenodo.15769359 [2]. It reports the dataset license as CC BY 4.0 on page 1 and in the User Notes on page 13.

The local article PDF and both processed-data ZIP files were read directly. The publication webpage returned an access error during this check, and the Zenodo page could not be retrieved. Consequently, current remote download availability and a byte-for-byte match to the current online release were not confirmed. Local file availability and the checks below are independent of that remote-access limitation.

| Local input | Inspection performed | Finding |
|---|---|---|
| segment_level_data.zip | Entire CSV parsed; 15 input fields checked | 785,976 records in segment_level_data.csv |
| gtfs_data.zip | Routes, trips, stops, stop_times, and calendar_dates parsed | Tab-separated text tables, despite the .txt extension |
| gps_data.csv.zip | ZIP listing and CSV header read only | gps_data.csv is present; archive size 2,444,088,793 bytes, approximately 2.44 GB or 2.28 GiB |
| data-10-00119.pdf | Relevant sections of the 16-page article read | Dataset scope, conversion method, license statement, and limitations |

The two processed archives have recorded SHA-256 checksums in the accompanying analysis summary. They were read without modifying the inputs. Text tables were parsed with a Windows-compatible encoding because route names contain non-UTF-8 punctuation. Full raw GPS analysis was not performed: archive presence is not a validation of its trajectories or their coverage.

## III. Verified Local Findings

### A. Dataset Scope

| Check | Local result |
|---|---|
| Flattened CSV records | 785,976 |
| stop_times.txt records | 785,976 |
| Unique trips in CSV and trip table | 19,769 in each |
| Routes | 10, 12, 46 |
| Date coverage | July 29–September 21, 2024; 55 distinct dates |
| Stop reference records | 201 |
| calendar_dates.txt records | 55 |

The equality of CSV and stop-time row counts confirms a shared aggregate size, not a complete row-by-row equivalence of every reconstructed timestamp. The flattened file has one record per processed segment/stop event in this analysis; the publication describes the stop_times entries as stop-level events. This distinction should be preserved when describing the unit of observation.

| Route | Processed records | Unique trips | Zero running times | Median positive running time, seconds | Running-time p95, seconds |
|---|---|---|---|---|---|
| 10 | 243,243 | 6,480 | 301 | 72 | 285 |
| 12 | 207,655 | 5,150 | 149 | 67 | 222 |
| 46 | 335,078 | 8,139 | 475 | 70 | 289 |

These route-level summaries mix different stop pairs and time periods. They describe the sample and must not be used as universal anomaly thresholds or a performance ranking of routes.

### B. Data Quality Checks

| Check | Local result | Interpretation |
|---|---|---|
| Missing values in the 15 parsed input fields | 0 | No missing values detected under the parser's rules |
| Invalid parsed date/start/arrival/departure values | 0 | These supplied timestamps parsed successfully |
| Full duplicates across all 15 CSV fields | 0 | Does not exclude every possible semantic duplicate |
| Negative running or dwell durations | 0 | Non-negativity check passed |
| Zero running time | 925, approximately 0.118% of rows | All refer to different start and end stop identifiers; flag for review |
| Zero dwell time | 46,436, approximately 5.91% of rows | May reflect the reconstruction method; not automatically an error |
| Unresolved trip/start-stop/end-stop IDs in CSV | 0 for each check | References resolve in the supplied tables |
| Unresolved trip or stop IDs in stop_times | 0 for each check | References resolve in the supplied tables |
| Direction disagreement between CSV and trip table | 0 | The checked direction values agree |
| Running or dwell arithmetic disagreement | 0 for each check | Durations equal the relevant timestamp differences |

The 925 zero running times reproduce the previously reported count. They do not establish 925 operational disruptions. Possible explanations require source-trace inspection. The records should retain a quality flag and be excluded from comparisons requiring a positive running duration until an inclusion policy is justified.

The arithmetic checks compare arrival_time minus start_time with run_time_in_seconds, and departure_time minus arrival_time with dwell_time_in_seconds. Passing these checks confirms internal arithmetic consistency; it does not independently verify the accuracy of GPS reconstruction. The checks also do not constitute complete GTFS compliance validation.

### C. Contextual Exploratory Comparison

Positive running durations were grouped by route, direction, directed start/end stop identifiers, and two-hour bins of segment start time. Non-negative dwell durations were grouped by route, direction, destination stop, and the same segment-start time bins. All dates in the observation window were pooled. No weekday or seasonal adjustment was made.

For each group, the comparison uses its count, median, first quartile Q1, third quartile Q3, and upper fence Q3 + 3 × (Q3 − Q1). Only groups with at least 30 records and a positive upper fence are included. A record becomes a candidate when its duration is strictly greater than that fence. The multiplier and sample minimum are exploratory choices for finding examples, not calibrated acceptance thresholds.

| Measure | Eligible comparison groups | Covered records | Candidate records |
|---|---|---|---|
| Running time | 2,401 | 773,472 | 10,551 |
| Dwell time | 2,182 | 775,344 | 13,097 |

These counts are flagged records, not consolidated events; the same underlying episode can contribute several records and overlap between measures. They are not precision, recall, incident totals, or results of a held-out detector benchmark. Because reference statistics use the full observation window, this is descriptive evidence exploration only. The final method comparison must use the chronological separation specified in the verification plan.

### D. Traceable Candidate Examples

One candidate with the highest observation-to-fence ratio was selected per route and measure. This deliberate selection illustrates extremes and is not representative sampling. Very long values may expose reconstruction or matching problems as well as possible operational conditions. No cause is assigned.

| Case | Type and route | Trip | Segment start timestamp | Observed seconds | Context median | Upper fence | Group n |
|---|---|---|---|---|---|---|---|
| C1 | Running; 10 | 2715 | 2024-08-03 21:32:57 | 4,923 | 55 | 101 | 365 |
| C2 | Running; 12 | 2382 | 2024-08-01 18:00:54 | 2,607 | 13 | 65 | 296 |
| C3 | Running; 46 | 17452 | 2024-08-26 12:10:02 | 6,962 | 98 | 175 | 533 |
| C4 | Dwell; 46 | 27146 | 2024-09-14 22:18:39 | 1,040 | 2 | 15 | 150 |
| C5 | Dwell; 12 | 19572 | 2024-08-29 13:45:50 | 4,976 | 31 | 78 | 398 |
| C6 | Dwell; 10 | 14252 | 2024-08-29 16:28:16 | 3,190 | 24 | 64 | 334 |

For dwell cases, the displayed timestamp is the source segment start, not the beginning of the dwell interval. Times are reproduced as stored without independently confirming their time zone. The candidate CSV retains direction, stop UUIDs, quartiles, group size, time bin, and a parsed record locator. Its source_row equals the one-based data-record ordinal plus one for the header; it is not guaranteed to be a physical text line if blank lines occur.

**Figure asset not included:** `relevance-evidence/candidate-durations.png`.
The duration values are retained in the table above.

Figure 1. Observed durations, group medians, and upper fences on a logarithmic seconds scale. Cases C1–C6 are the same records as the table above.

**Figure asset not included:** `relevance-evidence/candidate-stop-coordinates.png`.

Figure 2. Supplied stop coordinates with candidate destination stops marked. This coordinate plot has no street basemap, route geometry, or inferred vehicle path; it must not be presented as a validated trajectory map.

**Repository note:** The two figure files and the supporting
`relevance-evidence/analysis-summary.json` and
`relevance-evidence/review-candidates.csv` referenced by this document are not
included in the repository. The calculations cannot be reproduced from the
repository contents alone.

## IV. Published Findings and Their Limits

Pages 12–13 of [1] describe deriving trips and stop events from GPS, including terminal matching and directional stop buffers. Arrival, departure, and dwell values therefore depend on reconstruction choices. These times are empirically reconstructed observations, not an independent planned timetable; comparisons with them alone cannot establish schedule lateness.

The authors state on page 13 that overtaking, bunching, and dispatch irregularities were retained. This motivates investigating service patterns but does not supply confirmed anomaly labels for the records checked here. The processed tables inspected contain no dedicated confirmed-incident label field. No separate external label source was verified.

Page 14 identifies the 55-day late-summer window as a limitation. The evidence cannot establish winter conditions, annual performance, or citywide prevalence. Raw GPS presence creates a possible next analysis step, but route-deviation claims still require validated trajectories, reference geometry, and explicit matching criteria.

## V. Implications for Requirements

| Evidence | Design implication | Related requirements |
|---|---|---|
| Three routes, 55 dates, and linked trip/stop identifiers | Preserve reference relationships and filter by route/time | FR02, FR03, FR11 |
| 925 zero running times between different stop identifiers | Separate quality flags from movement events and document inclusion decisions | FR04; NFR03 |
| Resolved references and arithmetic checks are reproducible but not independent truth | Retain source records, batch, method, configuration, and limitations | FR03–FR05; NFR03–NFR04 |
| Large within-context duration differences | Support running/dwell candidate detection with comparison groups and sample minimums | FR06 |
| Six candidates can be traced to trips, stops, and source records | Show values, references, quality flags, and appropriately labelled locations | FR10, FR11 |
| No confirmed labels established | Compare methods honestly and restrict supervised metrics to suitable reference sets | FR09 |
| Candidate causes remain unverified | Generate suggested checks grounded in measurements and provide a labelled fallback | FR12 |
| Raw GPS archive exists but trajectories are unvalidated | Keep route deviation conditional on additional analysis and geometry | FR08, Should |

The data do not establish a passenger-report workflow, the preferred role matrix, provider usefulness, a two-second response target, or a five-minute usability target. Those remain proposed requirements or evaluation targets requiring stakeholder discussion and implementation testing.

## VI. Assumptions and Stakeholder Evidence Still Needed

| Assumption | Current support | Next verification |
|---|---|---|
| Dispatchers need combined evidence and quality flags | Engineering rationale and identifiable candidate records | Discuss current investigation practice with prospective users |
| The interface reduces investigation effort | Not measured | Compare equivalent spreadsheet and web tasks |
| Recommendations are understandable and useful | Not established by unusual durations | Review grounded outputs with a transport specialist or prospective user |
| Headways can be measured reliably | Not tested in this inspection | Verify successive-vehicle coverage, repeated visits, and service-date semantics |
| Raw GPS supports deviation or stationary-event checks | Archive/header available only | Validate a bounded trajectory sample and reference geometry |

Aim for three to five documented discussions with prospective dispatchers, analysts, or transport representatives where access permits. Record participant role, date, questions, paraphrased findings, uncertainties, and the requirement decisions each discussion informs. No completed conversations or substantive client agreement are claimed. If the assessment requires three to five discussions or an actual client agreement in addition to data analysis, that part remains outstanding.

## VII. Limitations and Next Steps

This inspection is a descriptive data study, not an operational incident investigation or a detector-quality benchmark. It uses a limited window, full-window grouping, no day-of-week control, and deliberately selected extreme cases. Confirmed causes, delay reduction, and user demand are not demonstrated. Timestamp arithmetic and reference resolution do not validate road geometry, completeness of real operations, or absolute timestamp accuracy.

The immediate next steps are to review the zero-duration records, inspect the raw GPS around selected candidates, verify time-zone and service-date semantics, and examine less extreme cases as well as unflagged controls. Headway work should follow coverage checks. Final detector fitting and evaluation must use separate chronological periods. Stakeholder discussions should test the proposed interpretation and workflow before their benefits are claimed.

The dataset authors' contribution is the collection, processing, and release of transport data. The student's contribution is the documented analysis and the proposed implementation and evaluation of a service for data-quality handling, event detection, visual investigation, and grounded suggestions. Publication provenance supports data selection; the local analysis supplies concrete evidence for several technical requirements.

## References

[1] A. Mansurova, A. Mussina, S. Aubakirov, A. Nugumanova, and D. Yedilkhan, “From Raw GPS to GTFS: A Real-World Open Dataset for Bus Travel Time Prediction,” Data, vol. 10, no. 8, article 119, 2025. doi: 10.3390/data10080119. Available: <https://doi.org/10.3390/data10080119>. Evidence inspected from the local 16-page publication PDF, especially pages 4 and 12–14.

[2] Dataset associated with [1], Zenodo, doi: 10.5281/zenodo.15769359. Available: <https://doi.org/10.5281/zenodo.15769359>. Dataset DOI and CC BY 4.0 license are reported in [1]; current remote download access was not independently confirmed.

[3] Local processed files segment_level_data.zip and gtfs_data.zip, analysed October 24, 2026. Archive checksums, validation counts, route summaries, and candidate definitions are retained in relevance-evidence/analysis-summary.json; candidate details are in relevance-evidence/review-candidates.csv. These are author calculations, not publisher findings.
