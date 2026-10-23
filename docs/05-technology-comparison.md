# Technology Comparison

**Author:** Meirbek Nurassyl
**Project:** Urban public transport monitoring and anomaly detection with AI assisted recommendations
**Task:** Technology comparison
**Date:** October 24, 2026

## I. Purpose and Method

This document records three technical decisions for the urban public transport prototype: the backend platform, persistent storage, and communication between components. Three realistic options are compared for each decision, and one is selected. The selections reflect the project's data, functionality, development workload, and the developer's existing Java and Spring experience. Trade-offs are project-specific assessments rather than benchmark results.

The driving requirements are drawn from the planned application responsibilities and evaluation needs:

| ID | Driver | Implication for selection |
|---|---|---|
| D1 | Manage transport records, passenger reports, and user permissions | Structured business logic, validation, and configurable access control |
| D2 | Represent routes, stops, vehicles, trips, observations, and events | Relationships, integrity constraints, and traceable records |
| D3 | Filter by route and time, aggregate records, and perform selected spatial queries | Suitable schemas, indexes, and distance semantics |
| D4 | Integrate Python processing and machine learning | A defined contract between the application and analysis components |
| D5 | Keep development workload manageable with existing Java experience | Familiar backend tooling and limited initial infrastructure |
| D6 | Evaluate representative workloads and component failures | Measurable imports, queries, jobs, and recovery behaviour |

Official framework and database documentation supports capability statements. The rationale for selecting one option is an engineering assessment for this prototype. The comparison does not assume that an alternative is incapable simply because it requires different implementation work.

## II. Decision 1 Backend Platform

The backend must manage transport records, passenger reports, user permissions, analysis requests, and integration with the Python component.

| Option | Advantages relevant to the project | Trade-offs |
|---|---|---|
| **Java and Spring Boot — selected** | Supports HTTP APIs, SQL database integration, and configurable authentication and authorisation through Spring Security. Fits the developer’s existing Java and Spring experience. | A separate Python analysis component introduces communication, deployment, and integration-testing work. [1] |
| **Python and Django** | Provides an ORM and an authentication system. Keeping application logic and analysis in Python could reduce the number of languages used. | Would require learning Django conventions and moving the main application away from the developer’s established Spring workflow. [2] |
| **Node.js and Express** | A flexible routing and middleware framework suitable for web APIs. Could support a JavaScript or TypeScript application stack. | Its minimal core requires additional choices for database access, validation, authentication, and application structure. [3] |

**Justification.** Spring Boot is selected because the project requires structured business logic, access control, and relational data management, while the developer already has relevant experience. Python will handle data processing and machine learning. The additional integration work is an accepted cost of this architecture.

## III. Decision 2 Data Storage

The database must represent relationships between routes, stops, vehicles, trips, observations, detected events, and passenger reports. It must support filtering by route and time, aggregation, and selected spatial queries.

| Option | Advantages relevant to the project | Trade-offs |
|---|---|---|
| **PostgreSQL with PostGIS — selected** | PostgreSQL provides relational constraints. PostGIS adds spatial queries and indexes, including proximity searches useful for matching observations to stops. | Requires schema migrations and index design. Spatial reference systems and distance units must be handled correctly. [4] |
| **MySQL with spatial features** | Supports geometry data and spatial indexes, making it a reasonable alternative for a relational transport database. | Spatial operations would require their own implementation and validation. No project-specific advantage over the selected PostgreSQL/PostGIS approach has yet been demonstrated. [5] |
| **MongoDB** | Supports flexible documents, GeoJSON, and geospatial indexes. Useful when incoming records have varying structures. | The project’s interconnected entities would require careful decisions about embedded records, references, and consistency across collections. [6] |

**Justification.** PostgreSQL is selected because the transport dataset naturally contains linked entities and requires comparisons across trips, stops, and routes. PostGIS will support spatial operations when needed [10]. Its use does not establish that PostgreSQL is universally faster than the alternatives.

Raw imported records should remain traceable, while validation flags and derived events are stored separately. Query performance will be measured using the available dataset before introducing additional storage infrastructure.

## IV. Decision 3 Communication Between Components

The application must exchange information between the web interface, Java backend, and Python analysis component.

| Option | Advantages relevant to the project | Trade-offs |
|---|---|---|
| **REST-style HTTP APIs with JSON — selected** | Supported by Spring and FastAPI. Allows explicit request and response schemas and straightforward inspection during development. | Requires timeout handling, error responses, and API versioning. Large datasets should be processed in bounded batches or background jobs. [1] |
| **gRPC with Protocol Buffers** | Provides defined service contracts, generated client interfaces, and unary or streaming communication. Suitable for Java–Python interaction. | Adds schema compilation and generated-code maintenance. Streaming requirements have not yet been established for the first prototype. [7] |
| **Asynchronous messaging with RabbitMQ** | Work queues can distribute time-consuming tasks to background workers and separate task submission from execution. | Adds a broker and requires message lifecycle, acknowledgement, retry, and duplicate-processing logic. [8] |

**Justification.** HTTP/JSON is selected for the initial prototype because the planned interactions are limited and can use explicit API contracts. Long-running imports and analysis will run as background jobs, with stored status and results accessible through the API. A message broker can be reconsidered if testing demonstrates a need for independent workers or more complex task distribution.

## V. Chosen Stack

| Component | Proposed responsibility |
|---|---|
| **Spring Boot** | Main application API, permissions, transport records, passenger reports, and analysis coordination |
| **Python with FastAPI** | Data-processing and ML interfaces, with validated inputs and documented API schemas |
| **PostgreSQL** | Persistent application data, imported observations, events, and analysis-job records |
| **PostGIS** | Spatial matching and proximity queries where required |
| **HTTP/JSON** | Communication between application components |

FastAPI is the **Python web framework** used to implement the analysis API; REST-style HTTP communication is the **interaction approach**. FastAPI’s documented validation and OpenAPI support help define the contract between Java and Python. [9]

These choices will be checked through representative imports, route-and-time queries, analysis jobs, and component-failure scenarios. Final performance claims will be based on those measurements.

### Version Policy

The stack above identifies technologies rather than prescribing unverified release numbers. Select mutually compatible supported releases when implementation begins, and record exact application dependencies and infrastructure versions in project configuration. Verify Java and Spring Boot compatibility, Python package support, and PostgreSQL and PostGIS compatibility before deployment. Recheck these choices when a dependency or requirement changes.

## VI. Risks and Items to Verify

1. **Java and Python integration.** Define request and response schemas, timestamp formats, identifiers, and units. Check invalid input, timeouts, unavailable analysis services, and consistent error responses. FastAPI schema generation supports the contract but does not replace integration tests.
2. **Background job reliability.** HTTP does not itself provide durable execution. Define persisted job states, worker ownership, restart recovery, and retry behaviour. Use job identifiers to prevent retries from silently creating duplicate results. Reconsider a broker if measured workloads require independently managed workers or more complex task distribution.
3. **Spatial correctness.** Verify coordinate order, spatial reference systems, and distance units with known examples before using proximity results for stop matching. A nearest stop is a candidate match, not proof that a bus served that stop.
4. **Data integrity and provenance.** Keep imported observations traceable to their source. Store validation flags and derived events separately, and verify route, trip, and stop relationships during imports. Do not substitute observed timestamps for planned schedules when calculating delay.
5. **Performance and payload size.** Measure representative imports, route-and-time queries, spatial queries, and analysis jobs on the available dataset. Use bounded batches and suitable indexes before adding storage or messaging infrastructure. Do not infer a speed advantage from technology choice alone.
6. **Access control across components.** Verify permissions for transport records, passenger reports, and analysis requests at the application boundary, and define how the analysis service accepts trusted calls. Selecting Spring Security does not automatically configure a correct permission model.

These checks will validate the planned architecture rather than presume its success. Record dataset size, hardware, configuration, and workload alongside results so that performance claims remain reproducible.

## VII. Limitations of This Comparison

- Alternatives were assessed from documentation and project fit; no controlled framework, database, or communication benchmark was performed.
- Existing Java and Spring experience is a stated project constraint. Learning effort for the alternatives has not been quantified.
- HTTP request handling and background job execution are separate concerns. Detailed worker and recovery design remains an implementation task.
- The comparison covers three decisions. It does not select a web client framework, deployment platform, or language model provider.
- Exact versions, resource limits, deployment costs, and production-scale capacity remain to be established during implementation and measurement.

## References

[1] Spring, “Building a RESTful Web Service,” official guide. Available: <https://spring.io/guides/gs/rest-service>. Accessed: October 24, 2026.

[2] Django Software Foundation, “Models,” Django 6.0 documentation. Available: <https://docs.djangoproject.com/en/6.0/topics/db/models/>. Accessed: October 24, 2026.

[3] Express, “Using middleware,” official documentation. Available: <https://expressjs.com/en/guide/using-middleware/>. Accessed: October 24, 2026.

[4] PostgreSQL Global Development Group, “Constraints,” PostgreSQL documentation. Available: <https://www.postgresql.org/docs/current/ddl-constraints.html>. Accessed: October 24, 2026.

[5] Oracle, “Creating Spatial Indexes,” MySQL 8.4 Reference Manual. Available: <https://dev.mysql.com/doc/refman/8.4/en/creating-spatial-indexes.html>. Accessed: October 24, 2026.

[6] MongoDB, “Geospatial Queries,” Database Manual. Available: <https://www.mongodb.com/docs/manual/geospatial-queries/>. Accessed: October 24, 2026.

[7] gRPC, “Core concepts, architecture and lifecycle,” official documentation. Available: <https://grpc.io/docs/what-is-grpc/core-concepts/>. Accessed: October 24, 2026.

[8] RabbitMQ, “Work Queues,” Python tutorial. Available: <https://www.rabbitmq.com/tutorials/tutorial-two-python>. Accessed: October 24, 2026.

[9] FastAPI, “Features,” official documentation. Available: <https://fastapi.tiangolo.com/features/>. Accessed: October 24, 2026.

[10] PostGIS Project, “ST_DWithin,” official reference. Available: <https://postgis.net/docs/ST_DWithin.html>.
