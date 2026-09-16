# Accessibility Audit Report — Lexington Public Library (lexpublib.org)

## Summary
Five issues were identified on the Lexington Public Library homepage
(https://www.lexpublib.org), ranging from Medium to High severity. Full
detail, evidence, and remediation for each is in
[`accessibility-audit-completed.csv`](accessibility-audit-completed.csv).
This document explains *how* the audit was performed and lists the manual
checks still needed to complete the evidence package.

| ID | Issue | Severity |
|----|-------|----------|
| WEB-001 | Non-descriptive social icon link text (e.g. "facebook-black") | Medium |
| WEB-002 | Duplicate adjacent links per carousel item | Medium |
| WEB-003 | Inconsistent/skipped heading hierarchy | Medium |
| WEB-004 | Raw CSS color values leaking into readable page content | High |
| WEB-005 | Repeated ambiguous "Learn more" link text | Medium |

## Methodology

### 1. Static markup review (completed)
The live page's rendered structure was fetched and read directly — headings
in document order, every link's accessible text, every image's `alt`
attribute, and landmark/section structure. This method is reliable for
catching structural and semantic problems (heading order, link text,
missing/bad alt text, duplicate links) because those are properties of the
markup itself, not of how a particular browser paints pixels.

### 2. Manual browser verification (to be completed locally before final submission)
Some accessibility properties genuinely cannot be judged from markup alone —
they depend on rendered pixels, computed styles, or real keyboard focus
behavior in a live browser. Do the following and save each screenshot into
`docs/screenshots/` using the suggested filename:

1. **Lighthouse accessibility score**
   - Open https://www.lexpublib.org in Chrome.
   - Open DevTools (F12) → **Lighthouse** tab.
   - Check only **Accessibility**, choose **Desktop** (or **Mobile** — note
     which one), click **Analyze page load**.
   - Screenshot the score + the list of flagged audits.
   - Save as `docs/screenshots/lighthouse-score.png`.

2. **Keyboard-only navigation pass**
   - On the same page, click once in the address bar to remove focus from
     the page, then press **Tab** repeatedly (never touch the mouse).
   - Confirm: Is there a visible "Skip to main content" link on first tab?
     Does the focus outline stay visible as you move through the mega-menu?
     Can you open a mega-menu submenu and reach every link inside it using
     only Tab/Shift+Tab/Enter?
   - Screenshot at least one moment where focus is on a link/button so the
     (in)visibility of the focus outline is documented.
   - Save as `docs/screenshots/keyboard-focus-nav.png`.

3. **Color contrast spot-check**
   - In DevTools, use the **Inspect** tool on the footer social icons and
     on any light-gray body text; check the **Contrast ratio** shown in the
     Styles pane's color picker against the WCAG AA threshold (4.5:1 for
     normal text, 3:1 for large text/UI components).
   - Screenshot any element that fails the ratio.
   - Save as `docs/screenshots/contrast-check.png`.

Once these three screenshots exist in `docs/screenshots/`, the evidence
package is complete: structural findings from the markup review (WEB-001
through WEB-005) plus rendered-browser confirmation of focus visibility and
contrast (which independently corroborate the WEB-001/WEB-003-style
patterns fixed in this repo's own `client/` code).

## Why this scope
The audit intentionally covers the homepage in depth rather than skimming
many pages shallowly, per WCAG-EM guidance to prioritize representative,
high-traffic templates (home, primary navigation) over exhaustive
page-by-page coverage. The homepage exercises the site's global navigation,
carousel, and footer patterns, which repeat across the rest of the site —
so fixes here have leverage across every other page that reuses the same
templates.
