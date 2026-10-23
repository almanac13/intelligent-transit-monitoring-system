# Intelligent Transit Monitoring System

## Diploma Project

Development of an Intelligent Web Service to Improve the Efficiency of Urban Public Transport.

## Description

A web service for analysing urban public transport data, detecting unusual operations, and presenting evidence for investigation.

## Student

Nurassyl Meirbek — SE-2415, Astana IT University.

## Supervisor

Madina Askarovna Yermaganbetova — Associate Professor.

## Current Status

Research and design stage. Research documents and a clickable UX prototype are available. Application implementation is planned.

## Planned Technologies

Java, Spring Boot, Python, FastAPI, PostgreSQL, React, and TypeScript.

## Documentation

See the [documentation index](docs/README.md) for the proposal, research, comparisons, requirements, architecture, UX, verification plan, and project risks.

## Run the UX Prototype

Open [frontend/prototype/index.html](frontend/prototype/index.html) in a modern browser. No server, installation, or internet connection is required. The prototype uses illustrative data and simulated interactions.

See the [prototype guide](frontend/prototype/README.md) for scenarios and limitations.

## Repository Structure

```text
docs/                 Numbered Markdown documents and documentation index
frontend/
  prototype/          Self-contained clickable HTML prototype and guide
backend/              Spring Boot component plan; implementation pending
analysis/             Python analysis component plan; implementation pending
config/               Configuration guide and placeholder environment example
diagrams/
  src/                Editable Mermaid architecture diagrams
  exports/            Readable SVG diagram exports
tests/
  repository.test.mjs  Automated repository checks
  fixtures/           Synthetic supporting test materials
scripts/              Diagram rendering script
package.json          Tooling dependencies and commands
package-lock.json     Locked tooling dependency versions
```

Document numbering follows the supplied materials. Application implementation is
planned; the existing executable interface is the HTML prototype. Local
configuration can be based on [config/.env.example](config/.env.example).

## Repository Checks and Diagram Exports

With Node.js 22.13 or later and Git installed, run from the project root:

```sh
npm ci
npm test
npm run diagrams
```

`npm test` checks documentation links, the flat `docs/` layout, diagram consistency,
export availability, and Git ignore rules. `npm run diagrams` regenerates the SVG
exports using the pinned Mermaid renderer. See the [diagram guide](diagrams/README.md)
and [test guide](tests/README.md).

Keep passwords, API keys, personal data, and confidential information out of Git.
Use placeholder values in configuration examples; local secrets, datasets,
dependency folders, and generated caches are covered by `.gitignore`.

## Project Links

- [GitHub repository](https://github.com/almanac13/intelligent-transit-monitoring-system)
- [YouTrack project](https://almanac.youtrack.cloud/projects/DIP)
