# Configuration

[.env.example](.env.example) lists proposed environment variables with placeholder
credentials. Copy it to a local `.env` when configuring the application; the
application has not implemented consumption of these variables yet.

Local `.env` files, keys, private data, and dataset directories are excluded by
the root `.gitignore`. Keep real credentials and confidential data out of tracked
files. Example values must remain placeholders.

The root [package.json](../package.json) and `package-lock.json` define and lock
the diagram tooling dependencies. Application dependency definitions will be
added within each component when implementation begins.
