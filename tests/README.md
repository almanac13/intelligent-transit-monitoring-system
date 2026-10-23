# Tests

Run repository checks from the project root with Node.js 22.13 or later and Git:

```sh
npm test
```

These checks verify the flat documentation structure, local documentation links,
diagram source consistency, SVG export availability, and Git ignore rules.
`fixtures/ignore-cases.json` contains synthetic file paths for the ignore checks;
it contains no credentials or passenger data.

Application tests will be added with implementation: Java tests under
`backend/src/test/`, Python tests under `analysis/tests/`, and React tests beside
the frontend components. Shared synthetic input files belong in `tests/fixtures/`.
The [verification plan](../docs/09-verification-plan.md) defines acceptance testing
and evaluation; repository checks do not establish application acceptance.
