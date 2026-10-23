# Analysis Component

Reserved for Python analysis code and its FastAPI internal endpoint. It will
calculate indicators and candidate events, fetching input and returning results
through the Spring Boot internal API.

Application modules will use `src/`, with automated tests in `tests/`. Add a
Python dependency definition when implementation is initialised. Local datasets
and model outputs are ignored by Git.

See the [architecture](../docs/07-architecture.md) and
[verification plan](../docs/09-verification-plan.md).
