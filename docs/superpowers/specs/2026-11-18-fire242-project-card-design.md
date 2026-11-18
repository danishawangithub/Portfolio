# FIRE242 Project Card — Design

**Date:** 2026-11-18
**Type:** Small change (one component + one data entry)
**Status:** Awaiting approval

## Intent

Add FIRE242 (National Voter Management & Election Survey Platform) to the Featured
Projects grid in `components/projects.tsx` as the first card, and make the project
card component support cards that have no public link.

## Why

FIRE242 is the newest and most distinctive piece of work in the portfolio — a
national-scale platform with RBAC, multi-cycle election data, and real-time
reporting. It currently has no representation on the site.

Separately, the grid currently holds 7 cards in a 2-column layout, leaving an
orphan row. FIRE242 makes 8, which closes the grid cleanly.

## Goals

- FIRE242 appears in the Featured Projects grid, positioned first.
- The card renders correctly with no outbound link (no navigation, no hover
  affordance that implies clickability, no "opens in new tab" arrow).
- It is visibly marked as confidential work.
- The card reads at the same weight as the other seven cards.

## Non-goals

- No change to the Work Experience timeline (FIRE242 is not an employer entry).
- No detail/expand view — the card carries a condensed summary only.
- No new dependencies. `Vote` and `Lock` both exist in the already-installed
  `lucide-react@0.564`.

## Approaches considered

### 1. Condensed card, no link (chosen)
One-paragraph description, `Confidential` badge in place of the arrow icon, no
navigation. Matches the visual weight of the existing seven cards.

*Trade-off:* a third of the platform's feature depth is not shown. Acceptable —
the full write-up is not what a card grid is for.

### 2. Featured full-width card spanning both columns
Carries the full breakdown (8 features, 4 tech-stack layers, impact).

*Trade-off:* makes the section asymmetric and breaks the rhythm of the grid.
Rejected — the user chose the condensed approach.

### 3. Condensed card + expandable disclosure
Summary in the grid, full breakdown revealed inline on click.

*Trade-off:* introduces an interaction pattern used nowhere else on the page;
the "More" affordance competes with the card's own hover treatment.
Rejected.

### 4. Linked card with a placeholder `#` href
Minimal code change.

*Trade-off:* clicking jumps the page to the top with no destination — the same
bug already present in `components/experience.tsx`. Rejected outright.

## The change

### `components/projects.tsx`

**Data shape.** `link` becomes optional (`link?: string`). FIRE242 is added
first in the `projects` array with `link` omitted and `icon: Vote`.

**Rendering.** The card body is extracted into a local variable, then wrapped
conditionally:

- `link` present → `<Link href target="_blank" rel="noopener noreferrer">`
- `link` absent → plain `<div>`

Both wrappers sit as direct grid children so the existing `h-full` stretch
behaviour is unchanged.

**Top-right slot of the card header.** Currently an unconditional
`<ArrowUpRight>`. For a linkless card this is replaced with a `Confidential`
badge (`<Lock>` icon + label).

**Hover treatment.** `hover:border-primary/50`, `hover:bg-card`, and
`group-hover:text-primary` are currently applied unconditionally to the card
and its title. For a non-navigable card these imply clickability, so they are
made conditional on `link` being present.

**Title as a heading.** `CardTitle` currently renders a `<div>`, so project
titles are absent from the document heading outline — flagged as a finding in
the code review. `CardTitle` gains an `asChild` prop (matching the existing
`asChild` pattern already used by `Button` and `Badge` in this codebase), and
project titles render as `<h3>` inside the card.

### `components/ui/card.tsx`

`CardTitle` gains `asChild`, backed by `@radix-ui/react-slot` (already a
dependency). No other card part changes.

### Content

**Title:** FIRE242 — National Voter Management & Election Survey Platform

**Description (condensed, ~55 words):**
> National voter management and election operations platform built for the Free
> National Movement (FNM) in The Bahamas. Covers voter records by constituency
> and polling division, door-to-door survey collection, three-tier role-based
> access control, real-time reporting dashboards, and multi-election-cycle data
> separation. Deployed on a Linux VPS with CI/CD via GitHub Actions.

**Tech badges:** Laravel, Next.js, MySQL, REST APIs, RBAC, Election Systems

**Icon:** `Vote` (lucide)

## Open point for the owner to decide

The description names the client (FNM) and the country while the card is
labelled Confidential. Options:

- **(a) Keep the name as written** — adds credibility; the client may already
  be publicly known to be running this platform.
- **(b) Genericize** — "a national political party in The Bahamas". Preserves
  confidentiality but reads as vague.

My recommendation is (a), since the name appears in the user's own write-up
and was clearly deliberate — but it is a judgment call about client
confidentiality, not a technical one.

## Decisions made by me (not requiring sign-off)

- Card position: first in the array. Rationale: newest work, most distinctive
  domain, and reads strongest at the top-left of the grid.
- `Confidential` badge placement: the card header's top-right slot, replacing
  the arrow. Rationale: that slot is already the card's "action" affordance,
  so the badge occupies it naturally without disturbing the tech-badge row.
- The `h3` heading fix is included. Rationale: it touches the exact lines
  being rewritten anyway, and it closes an accessibility finding from the
  review.

## What the builder still needs

Nothing outstanding except approval of this design and a decision on the
client-naming question above.
