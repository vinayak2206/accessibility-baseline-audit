# Accessibility Baseline & Repository Architecture Audit

## Audit Target
**Lexington Public Library** — https://www.lexpublib.org

This is a real, public-facing municipal library website chosen because it is a
public-service site (comparable traffic/complexity to a small business site),
runs on Drupal 10 with a large mega-menu and content-carousel pattern, and is
representative of the kind of site most junior developers will be asked to
audit or maintain.

## Objective
Identify real accessibility issues on the target site, document them with
evidence and severity, and use the findings to inform the architecture and
first feature slice of a small full-stack project.

## Audit Methodology
The audit combined two methods:

1. **Static markup review** — the live site's rendered HTML/DOM structure was
   fetched and inspected directly (headings, link text, image `alt`
   attributes, landmark structure). This method reliably catches semantic and
   structural issues and does **not** require a browser.
2. **Manual verification checklist (to be completed locally)** — a few checks
   genuinely require a real browser and cannot be done from static markup
   alone: color-contrast ratios, visible focus outlines while tabbing, and a
   Lighthouse accessibility score. `docs/accessibility-audit-report.md`
   contains a step-by-step checklist so these can be captured as real
   screenshots and dropped into `docs/screenshots/` before submission —
   see that file for the exact steps and where each screenshot goes.

Being explicit about which findings come from which method is itself good
audit practice: it tells a reader exactly how much confidence to place in
each row of `docs/accessibility-audit-completed.csv`, rather than presenting
every issue as if it carries equal evidentiary weight.

Full findings, evidence, and remediation priorities: see
[`docs/accessibility-audit-completed.csv`](docs/accessibility-audit-completed.csv)
and the narrative write-up in
[`docs/accessibility-audit-report.md`](docs/accessibility-audit-report.md).

## Project Structure

```
project-root/
├── client/             # Static front end: accessible catalog-search UI
│   ├── index.html
│   ├── style.css
│   └── app.js
├── server/             # Express API
│   ├── data/
│   │   └── catalog.json
│   ├── lib/
│   │   └── search.js   # Pure, unit-testable search/filter logic
│   ├── server.js
│   └── package.json
├── docs/
│   ├── accessibility-audit-completed.csv
│   ├── accessibility-audit-report.md
│   └── screenshots/    # Real Lighthouse + keyboard-nav screenshots go here
├── tests/
│   └── search.test.js
└── README.md
```

### Boundaries between `client`, `server`, and `docs`
- **`client/`** owns presentation only. It knows nothing about how search
  results are computed — it calls `GET /api/search?q=...` and renders
  whatever JSON comes back. This keeps the UI swappable (it could become a
  React app later) without touching the API.
- **`server/`** owns data and business logic. `server/lib/search.js` exports
  a pure function with no Express or HTTP dependency, so it can be unit
  tested in isolation (see `tests/search.test.js`) without spinning up a
  server or a browser.
- **`docs/`** is evidence and process, not code — the audit, the
  methodology, and the screenshots that prove the manual-verification steps
  were actually carried out.
- **`tests/`** is kept at the repo root (not nested inside `server/`) so it
  can grow to cover `client/` as well once that layer has logic worth
  testing.

## First Vertical Feature Slice: Catalog Search
To ground the architecture in something real (not just empty folders), the
skeleton includes one working, accessible feature end-to-end:

- A user types into a labeled search box (`client/index.html`) and either
  submits the form or the client debounces on `input`.
- `client/app.js` calls `GET /api/search?q=<term>` on `server/server.js`.
- The server delegates to `searchCatalog()` in `server/lib/search.js`, which
  filters `server/data/catalog.json` by title/author, and returns JSON.
- Results render into a live-updating list. The result count is announced
  via `aria-live="polite"` so screen reader users get feedback without
  focus being moved — a direct fix for the kind of "silent update" pattern
  flagged in the audit (see WEB-003 in the audit CSV).
- The form uses a real `<label for>` (fixing the WEB-002-style
  placeholder-only pattern found on the live site) and a visible
  `:focus-visible` outline (fixing the WEB-001-style low-visibility focus
  issue found on the live site).

## Local Setup
1. Clone the repository.
2. Install server dependencies:
   ```bash
   cd server
   npm install
   ```
3. Run the server (also serves the client at the same port):
   ```bash
   npm start
   ```
4. Open `http://localhost:3000` in a browser and try the search box.
5. Run the unit tests:
   ```bash
   npm test
   ```
6. Perform the Lighthouse + keyboard-only manual checks described in
   `docs/accessibility-audit-report.md` and save the screenshots into
   `docs/screenshots/`.
