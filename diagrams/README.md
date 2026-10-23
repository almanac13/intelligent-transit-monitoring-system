# Architecture Diagrams

Editable Mermaid sources extracted from the
[architecture document](../docs/07-architecture.md).
The diagrams describe the proposed system.

| Diagram | Editable source | Readable export | Explanation |
|---|---|---|---|
| System context | [01-system-context.mmd](src/01-system-context.mmd) | [SVG](exports/01-system-context.svg) | [System context](../docs/07-architecture.md#iii-system-context-diagram) |
| Use cases | [02-use-cases.mmd](src/02-use-cases.mmd) | [SVG](exports/02-use-cases.svg) | [Use cases](../docs/07-architecture.md#iv-use-cases) |
| Components | [03-components.mmd](src/03-components.mmd) | [SVG](exports/03-components.svg) | [Component draft](../docs/07-architecture.md#v-component-draft) |

Open the `.mmd` files in a Mermaid-compatible editor, or view the embedded
diagrams in the architecture document using a Markdown viewer with Mermaid
support. Keep the standalone sources and embedded diagrams in sync when editing.

Regenerate the SVG exports from the project root with Node.js 22.13 or later:

```sh
npm ci
npm run diagrams
```

The renderer uses installed Chrome or Edge where available, or Puppeteer's
downloaded browser. Set `MERMAID_BROWSER_PATH` to select another browser executable.
Commit updated sources, matching architecture blocks, and exports together.
