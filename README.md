# Legal Content Review Register

Legal Content Review Register helps a practice record who owns a website page, who reviewed it and when it needs another check. It turns a small content register into a review queue and a clear sign-off summary.

It supports editorial work rather than assessing legal or regulatory compliance. Maintained by [Web Design for Law Firms](https://webdesignforlawfirms.co.uk/), operated by JW Digital Services Ltd.

![Complete example](docs/preview.png)

## Start locally

Requires Node.js 22 or later. No runtime dependencies or account required.

```sh
npm ci
npm test
npm run build
npm run serve
```

Open http://127.0.0.1:4173/ for the complete local demonstration. Browser examples do not upload or persist entered data. The optional development server binds to loopback only.

## Input and output

Supply practice, asOf and pages with page_id, url, content_type, owner, reviewer, last_reviewed, next_review_due, status, content_version, reviewed_version and source_note. Approval requires a reviewer and valid date, and must match the current content version.

Use [examples/input.json](examples/input.json) as the complete input contract. Compare the generated [JSON result](examples/output.json), [Markdown report](examples/output.md) and [complete HTML](examples/output.html). The demo is in [demo/index.html](demo/index.html). It needs the local server for JavaScript modules. HTML reports can be opened as standalone files.

```sh
node cli.mjs examples/input.json --format json
node cli.mjs examples/input.json --format html --output report.html
node cli.mjs examples/input.json --format md --output report.md
```

Flat collections can also be imported with `--csv data.csv --context context.json --key items` (replace `items` with the documented collection). Nested structures use JSON. See `node cli.mjs --help`.

## Worked example

Use a fictional practice with six pages: two practice areas, two team profiles, a fee explanation and contact information. Show one approval missing its reviewer, one overdue page and one draft with no next-review date. Use synthetic names and example.com links, never matter descriptions or client data.

All supplied example records are synthetic. No clients, outcomes, current professional advice or real service availability are represented by them. Keep real records private and review output before sharing it.

## Checks

- An approved record requires the declared reviewer and review date. Overdue and unapproved are different states.
- Date comparisons use a supplied test clock and documented date format, including leap-day fixtures.
- An edit to a source record does not silently inherit an earlier approval for changed content.
- CSV formula-like values and supplied markup are safe in exported reports. Confidential reviewer data is excluded from public screenshots.
- The example produces an identical review queue on repeated local runs.

The automated results and browser checks performed for this release are recorded in [verification.md](docs/verification.md). Manual screen-reader testing has not been performed. A passing automated check is not accessibility certification.

## Contribute and maintain

Use [Issues](https://github.com/Web-Design-For-Law-Firms/legal-content-review-register/issues) for a reproducible bug and [Discussions](https://github.com/Web-Design-For-Law-Firms/legal-content-review-register/discussions) for questions and improvements. Follow [CONTRIBUTING.md](CONTRIBUTING.md); report vulnerabilities privately using [SECURITY.md](SECURITY.md). See [CHANGELOG.md](CHANGELOG.md) for releases. Maintenance is best effort.

Code, original illustrations and synthetic fixtures are MIT licensed. There is no required website backlink when reusing the resource. Commercial brand assets and third-party material are not included.

## CSV example

```sh
node cli.mjs --csv examples/input.csv --context examples/context.json --key pages --format html --output csv-report.html
```

The context holds the root settings; the CSV holds the flat collection. Explicit booleans use `true` or `false`. Nested data uses JSON.
