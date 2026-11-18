# FIRE242 Project Card Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add FIRE242 (National Voter Management & Election Survey Platform) as the first card in the Featured Projects grid, and make the project card component support cards that have no outbound link.

**Architecture:** `components/projects.tsx` gains an optional `link` field on the project data type. When `link` is present the card renders inside a `<Link>` exactly as today; when absent it renders inside a plain `<div>`, shows a "Confidential" badge in place of the arrow icon, and drops the hover treatments that imply clickability. `CardTitle` in `components/ui/card.tsx` gains an `asChild` prop (via `@radix-ui/react-slot`) so project titles render as `<h3>`.

**Tech Stack:** Next.js 16.1.6 (App Router), React 19.2.4, TypeScript 5.7.3, Tailwind CSS v4, lucide-react 0.564, Node's built-in test runner (`node --test`) with `jsdom` for DOM assertions.

**Spec:** `docs/superpowers/specs/2026-11-18-fire242-project-card-design.md`

## Global Constraints

- No new runtime dependencies. `Vote` and `Lock` both exist in the installed `lucide-react@0.564`. Nothing is added to `dependencies`.
- No new build dependencies. `jsdom` and `@types/jsdom` are added as **devDependencies** only, and are used solely by the test files under `tests/`. They are not imported by any component and never reach the browser bundle.
  - *Reconciliation with the spec:* the spec's "no new dependencies" constraint was written about the card feature itself (no new icon package needed). The test harness is an orthogonal addition the spec did not anticipate. It is confined to `devDependencies` and `tests/`, so the shipped bundle is unaffected. If you would rather add zero packages, the harness can be dropped and the tasks reduced to `tsc --noEmit` + `npm run build` as the only verification — at the cost of the behavioral assertions in Task 3 Step 1.
- Client name and country stay in the card description verbatim — "the Free National Movement (FNM) in The Bahamas" — despite the Confidential badge. (User decision, 2026-11-18.)
- Test files live in `tests/`. Run with `npm test`. No watch mode, no CI wiring in this plan.
- Do not touch `components/experience.tsx`, `app/page.tsx`, or any other file. This plan changes exactly three source files plus test scaffolding.
- The existing 7 project cards must render identically after this change. Their `href`, `target`, and `rel` attributes are unchanged.
- Test harness is already scaffolded, verified, and committed as `f9dee9c` (Task 1). Do not add Vitest, Jest, or any other test framework.

## Review Focus

Inputs and conditions the spec implies but no task's assertions directly cover. Each line names the condition and the behavior a reasonable person would expect.

- **A card with no `link` must not be reachable by keyboard or pointer.** Expected: no `<a>` wrapper, no `href`, no `tabIndex` — the card is inert. If a linkless card still gets an anchor or a focusable element, a keyboard user can tab into something that does nothing.
- **A card with no `link` must not look clickable.** Expected: no `hover:border-primary/50`, no `hover:bg-card`, no `group-hover:text-primary`, no arrow icon. If hover styling survives on an inert card, the page lies about what is interactive.
- **A card with a `link` must keep every affordance it has today.** Expected: `<a href target="_blank" rel="noopener noreferrer">`, arrow icon, all three hover treatments. Dropping one silently regresses all 7 existing cards.
- **The Confidential badge must be readable text, not an icon alone.** Expected: the words "Confidential" appear in the DOM alongside the lock icon. An icon with no accessible name tells a screen-reader user nothing.
- **Titles must remain in the document heading outline.** Expected: each project title is an `<h3>`. A `<div>` (the current state) is invisible to heading navigation.
- **`next/link` must not render as a bare `<a>` without `rel="noopener noreferrer"`.** Expected: every external link keeps both attributes.

---

## File Structure

| File | Responsibility |
|---|---|
| `tests/tsxloader.mjs` | Node ESM loader hook. Transpiles `.ts`/`.tsx` via the `typescript` package, resolves the `@/` path alias, resolves `next/*` to `next/*.js`. |
| `tests/tsxhook.mjs` | Registers the loader hook via `node:module`'s `register()`. Imported via `--import` by the test script. |
| `tests/projects.test.tsx` | Assertions on the rendered `Projects` component: card count, link presence/absence per card, badge, heading levels, hover classes. |
| `tests/card.test.tsx` | Assertions on `CardTitle` `asChild` behavior. |
| `components/ui/card.tsx` | **Modify.** `CardTitle` gains `asChild`. |
| `components/projects.tsx` | **Modify.** Optional `link`, conditional wrapper/badge/hover, FIRE242 entry. |

---

### Task 1: Test harness scaffolding

> **State on disk:** the harness files, the `package.json` scripts, the `jsdom` /
> `@types/jsdom` devDependencies, and the `.gitignore` entry were created during
> plan validation on 2026-11-18 and are **already committed** as `f9dee9c`
> (`chore: add node:test harness for component tests`). The steps below describe
> creating them from scratch for a fresh checkout. If a file already exists with
> the content shown, skip its creation step and keep going — the end state is what
> matters. Verify the whole task with Step 6 regardless.

**Files:**
- Create: `tests/tsxloader.mjs`
- Create: `tests/tsxhook.mjs`
- Modify: `package.json` (add `test` and `typecheck` scripts, add `jsdom` devDependency)
- Modify: `.gitignore` (add `tsconfig.tsbuildinfo`)

**Interfaces:**
- Consumes: `typescript` (already a devDependency at 5.7.3), `jsdom` (new devDependency), Node 24's `node:test` and `node:module`.
- Produces: a working `npm test` that runs `node --test` over `tests/**/*.test.ts` and `tests/**/*.test.tsx`, with `.ts`/`.tsx` files transpiled on the fly and the `@/` alias resolved.

- [ ] **Step 1: Create `tests/tsxloader.mjs`**

```javascript
import { readFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import ts from 'typescript'

export async function load(url, context, nextLoad) {
  if (!url.includes('node_modules') && (url.endsWith('.tsx') || url.endsWith('.ts'))) {
    const filePath = fileURLToPath(url)
    const source = readFileSync(filePath, 'utf8')
    const out = ts.transpileModule(source, {
      compilerOptions: {
        jsx: ts.JsxEmit.ReactJSX,
        module: ts.ModuleKind.ESNext,
        target: ts.ScriptTarget.ES2022,
      },
      fileName: filePath,
    })
    return { format: 'module', shortCircuit: true, source: out.outputText }
  }
  return nextLoad(url, context)
}

export async function resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('@/')) {
    const base = pathToFileURL(process.cwd() + '/' + specifier.slice(2)).href
    for (const cand of [base, base + '.tsx', base + '.ts', base + '/index.tsx']) {
      try { return await nextResolve(cand, context) } catch {}
    }
  }
  try {
    return await nextResolve(specifier, context)
  } catch (err) {
    if (specifier.startsWith('next/')) return await nextResolve(specifier + '.js', context)
    throw err
  }
}
```

- [ ] **Step 2: Create `tests/tsxhook.mjs`**

```javascript
import { register } from 'node:module'
register('./tsxloader.mjs', import.meta.url)
```

- [ ] **Step 3: Add scripts and devDependency to `package.json`**

In `scripts`, replace the `lint` line with these three lines (keeping `lint` exactly as it is):

```json
    "lint": "eslint .",
    "test": "node --import ./tests/tsxhook.mjs --test \"tests/**/*.test.ts\" \"tests/**/*.test.tsx\"",
    "typecheck": "tsc --noEmit"
```

In `devDependencies`, add these two entries (alphabetically, `@types/jsdom` before `@types/node`):

```json
    "@types/jsdom": "^30.0.0",
    "jsdom": "^31.0.1",
```

`@types/jsdom` is required — without it `tsc --noEmit` fails with `TS7016: Could not find a declaration file for module 'jsdom'` in every test file that imports it.

- [ ] **Step 4: Add `tsconfig.tsbuildinfo` to `.gitignore`**

Append the line `tsconfig.tsbuildinfo` to the end of `.gitignore`.

- [ ] **Step 5: Install the new devDependencies**

Run: `npm install -D @types/jsdom jsdom@^31.0.1`
Expected: installs cleanly, updates `package-lock.json`, and adds both packages to `devDependencies` in `package.json`.

This must come **after** Step 3, because Step 3 edits `package.json` by hand and an `npm install` would otherwise reconcile the file against the registry and could reorder the `dependencies` block.

- [ ] **Step 6: Write a smoke test and verify the harness runs**

Create `tests/harness.test.ts`:

```typescript
import { test } from 'node:test'
import assert from 'node:assert/strict'

test('harness runs TypeScript test files', () => {
  const value: number = 41
  assert.equal(value + 1, 42)
})
```

Run: `npm test`
Expected: PASS — `✔ harness runs TypeScript test files`, `ℹ pass 1`, `ℹ fail 0`.

- [ ] **Step 7: Verify the harness transpiles TSX and resolves the `@/` alias**

Create `tests/harness.test.tsx`:

```tsx
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { renderToStaticMarkup } from 'react-dom/server'
import { JSDOM } from 'jsdom'
import { Projects } from '@/components/projects'

test('harness transpiles TSX, resolves alias, and renders', () => {
  const html = renderToStaticMarkup(<Projects />)
  const doc = new JSDOM(html).window.document
  assert.equal(doc.querySelectorAll('[data-slot="card"]').length, 7)
})
```

Run: `npm test`
Expected: PASS — 2 tests pass, 0 fail. The count is **7** because FIRE242 does not exist yet.

- [ ] **Step 8: Delete the smoke test files**

Delete `tests/harness.test.ts` and `tests/harness.test.tsx`. They were probes to prove the harness works; the real tests in Tasks 2 and 3 supersede them.

Run: `npm test`
Expected: PASS with 0 tests reported (no test files match). This is not a failure — it confirms the harness files are gone and no stray probes remain.

- [ ] **Step 9: Commit the harness**

```bash
git add tests/ package.json package-lock.json .gitignore
git commit -m "chore: add node:test harness for component tests"
```

---

### Task 2: `CardTitle` gains `asChild`

**Files:**
- Modify: `components/ui/card.tsx:31-39`
- Create: `tests/card.test.tsx`

**Interfaces:**
- Consumes: `@radix-ui/react-slot` (already a dependency at 1.2.4). `Button` in `components/ui/button.tsx` and `Badge` in `components/ui/badge.tsx` already use this exact pattern — follow theirs.
- Produces: `CardTitle` accepting an optional `asChild?: boolean` prop. When `true`, it renders its child element with `data-slot="card-title"` and the computed className applied to that child, instead of rendering a `<div>`. This is consumed by Task 3.

- [ ] **Step 1: Write the failing test**

Create `tests/card.test.tsx`:

```tsx
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { renderToStaticMarkup } from 'react-dom/server'
import { JSDOM } from 'jsdom'
import { CardTitle } from '@/components/ui/card'

test('CardTitle renders a div by default', () => {
  const html = renderToStaticMarkup(<CardTitle>Plain</CardTitle>)
  const doc = new JSDOM(html).window.document
  assert.equal(doc.querySelector('[data-slot="card-title"]')?.tagName, 'DIV')
  assert.equal(doc.querySelector('[data-slot="card-title"]')?.textContent, 'Plain')
})

test('CardTitle with asChild renders the child element', () => {
  const html = renderToStaticMarkup(
    <CardTitle asChild>
      <h3>Heading</h3>
    </CardTitle>
  )
  const doc = new JSDOM(html).window.document
  const el = doc.querySelector('[data-slot="card-title"]')
  assert.equal(el?.tagName, 'H3')
  assert.equal(el?.textContent, 'Heading')
})

test('CardTitle with asChild merges className onto the child', () => {
  const html = renderToStaticMarkup(
    <CardTitle asChild className="text-foreground">
      <h3 className="font-bold">Heading</h3>
    </CardTitle>
  )
  const doc = new JSDOM(html).window.document
  const el = doc.querySelector('[data-slot="card-title"]')!
  assert.ok(el.className.includes('text-foreground'))
  assert.ok(el.className.includes('font-bold'))
  assert.ok(el.className.includes('leading-none'))
})
```

Run: `npm test`
Expected: FAIL — the second and third tests fail. `CardTitle` currently has no `asChild` prop, so React renders the `<h3>` child as-is without `data-slot="card-title"`, making `doc.querySelector('[data-slot="card-title"]')` return `null` and `el?.tagName` return `undefined` instead of `'H3'`. The first test passes.

- [ ] **Step 2: Implement `asChild` in `components/ui/card.tsx`**

Add this import at the top of the file, after the existing `import * as React from 'react'`:

```tsx
import { Slot } from '@radix-ui/react-slot'
```

Replace the `CardTitle` function (currently lines 31-39) with:

```tsx
function CardTitle({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'div'> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      data-slot="card-title"
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  )
}
```

- [ ] **Step 3: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS — all 3 tests pass, 0 fail.

- [ ] **Step 4: Verify the type check still passes**

Run: `npm run typecheck`
Expected: PASS — no TypeScript errors. `Slot` accepts the `data-slot` and `className` props; `React.ComponentProps<'div'>` with the `asChild` addition type-checks.

- [ ] **Step 5: Commit**

```bash
git add components/ui/card.tsx tests/card.test.tsx
git commit -m "feat(card): add asChild support to CardTitle"
```

---

### Task 3: Support linkless project cards

**Files:**
- Modify: `components/projects.tsx:1-4` (imports), `components/projects.tsx:6-63` (data), `components/projects.tsx:65-113` (render)
- Create: `tests/projects.test.tsx`

**Interfaces:**
- Consumes: `CardTitle` with `asChild` from Task 2. `Badge` from `components/ui/badge.tsx` (already accepts `asChild` and children). `ArrowUpRight` from `lucide-react`. New imports: `Lock`, `Vote` from `lucide-react`; `cn` from `@/lib/utils`.
- Produces: the `Projects` component rendering 8 cards. Cards with a `link` render inside `<a>`; cards without render inside `<div>`. Consumed by Task 4, which adds the FIRE242 entry.

**Note on ordering:** This task makes the component support linkless cards but does not add any linkless card yet — FIRE242 arrives in Task 4. To test the linkless path here, add a temporary 8th entry to the `projects` array with no `link`, then remove it at the end of this task. The test file written in Step 1 expects 8 cards for this reason.

- [ ] **Step 1: Write the failing test**

Create `tests/projects.test.tsx`:

```tsx
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { renderToStaticMarkup } from 'react-dom/server'
import { JSDOM } from 'jsdom'
import { Projects } from '@/components/projects'

function render() {
  const html = renderToStaticMarkup(<Projects />)
  return new JSDOM(html).window.document
}

test('renders all eight project cards', () => {
  const doc = render()
  assert.equal(doc.querySelectorAll('[data-slot="card"]').length, 8)
})

test('cards with a link are wrapped in an anchor', () => {
  const doc = render()
  const linked = [...doc.querySelectorAll('[data-slot="card"]')].filter(
    (card) => card.parentElement?.tagName === 'A'
  )
  assert.equal(linked.length, 7)
  for (const card of linked) {
    const anchor = card.parentElement!
    assert.ok(anchor.getAttribute('href'))
    assert.equal(anchor.getAttribute('target'), '_blank')
    assert.equal(anchor.getAttribute('rel'), 'noopener noreferrer')
  }
})

test('a card without a link is not wrapped in an anchor', () => {
  const doc = render()
  const unlinked = [...doc.querySelectorAll('[data-slot="card"]')].filter(
    (card) => card.parentElement?.tagName !== 'A'
  )
  assert.equal(unlinked.length, 1)
  const anchor = unlinked[0].closest('a')
  assert.equal(anchor, null)
})

test('a card without a link contains no focusable element', () => {
  const doc = render()
  const unlinked = [...doc.querySelectorAll('[data-slot="card"]')].find(
    (card) => card.parentElement?.tagName !== 'A'
  )!
  const focusable = unlinked.querySelectorAll('a, button, input, select, textarea, [tabindex]')
  assert.equal(focusable.length, 0)
})

test('a card without a link shows a Confidential badge with readable text', () => {
  const doc = render()
  const unlinked = [...doc.querySelectorAll('[data-slot="card"]')].find(
    (card) => card.parentElement?.tagName !== 'A'
  )!
  assert.ok(unlinked.textContent?.includes('Confidential'))
  assert.ok(unlinked.querySelector('.lucide-lock'))
})

test('a card without a link has no clickable hover treatments', () => {
  const doc = render()
  const unlinked = [...doc.querySelectorAll('[data-slot="card"]')].find(
    (card) => card.parentElement?.tagName !== 'A'
  )!
  assert.ok(!unlinked.className.includes('hover:border-primary/50'))
  assert.ok(!unlinked.className.includes('hover:bg-card'))
  assert.ok(!unlinked.querySelector('.lucide-arrow-up-right'))
  const title = unlinked.querySelector('[data-slot="card-title"]')!
  assert.ok(!title.className.includes('group-hover:text-primary'))
})

test('a card with a link keeps its arrow icon and hover treatments', () => {
  const doc = render()
  const linked = [...doc.querySelectorAll('[data-slot="card"]')].find(
    (card) => card.parentElement?.tagName === 'A'
  )!
  assert.ok(linked.querySelector('.lucide-arrow-up-right'))
  assert.ok(linked.className.includes('hover:border-primary/50'))
  assert.ok(linked.className.includes('hover:bg-card'))
  const title = linked.querySelector('[data-slot="card-title"]')!
  assert.ok(title.className.includes('group-hover:text-primary'))
})

test('every project title renders as an h3', () => {
  const doc = render()
  const titles = [...doc.querySelectorAll('[data-slot="card-title"]')]
  assert.equal(titles.length, 8)
  for (const title of titles) {
    assert.equal(title.tagName, 'H3')
  }
})
```

Run: `npm test`
Expected: FAIL — the count assertions fail with `7 !== 8`, the "card without a link" tests fail because no such card exists, and the heading test fails with `7 !== 8` plus `assert.equal(title.tagName, 'H3')` failing on `DIV`. The "cards with a link are wrapped in an anchor" test should pass (7 linked cards), and "a card with a link keeps its arrow icon" should pass.

- [ ] **Step 2: Add a temporary linkless entry to the data array**

In `components/projects.tsx`, insert this as the **first** object in the `projects` array (it is a temporary fixture — Task 4 replaces it with the real FIRE242 entry):

```tsx
  {
    title: "Temporary Linkless Fixture",
    description: "Temporary entry used to exercise the linkless card path. Removed in Task 4.",
    icon: Warehouse,
    tech: ["Laravel", "Next.js"],
  },
```

- [ ] **Step 3: Add the required imports**

Replace the import block at the top of `components/projects.tsx` (lines 1-4) with:

```tsx
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { ArrowUpRight, ShoppingCart, Ticket, Newspaper, BookOpen, Monitor, Warehouse, Bot, Lock, type LucideIcon } from "lucide-react"
```

- [ ] **Step 4: Make `link` optional on the project data type**

Add this type declaration immediately above the `const projects = [` line:

```tsx
type Project = {
  title: string
  description: string
  icon: LucideIcon
  tech: string[]
  link?: string
}
```

Then change the array declaration from `const projects = [` to `const projects: Project[] = [`.

- [ ] **Step 5: Render the card conditionally**

Replace the body of the `projects.map` callback in `components/projects.tsx` (currently lines 74-109) with:

```tsx
          {projects.map((project, index) => {
            const Icon = project.icon
            const isLinked = Boolean(project.link)

            const card = (
              <Card
                className={cn(
                  "group h-full bg-card/50 border-border",
                  isLinked && "hover:border-primary/50 transition-all hover:bg-card"
                )}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="p-2 rounded-lg bg-primary/10 w-fit mb-4">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>

                    {isLinked ? (
                      <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    ) : (
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 text-primary border-0 gap-1"
                      >
                        <Lock className="h-3 w-3" />
                        Confidential
                      </Badge>
                    )}
                  </div>

                  <CardTitle asChild>
                    <h3
                      className={cn(
                        "text-foreground",
                        isLinked && "group-hover:text-primary transition-colors"
                      )}
                    >
                      {project.title}
                    </h3>
                  </CardTitle>

                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge key={tech} variant="outline" className="border-border text-muted-foreground text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )

            return project.link ? (
              <Link
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                {card}
              </Link>
            ) : (
              <div key={index} className="block">
                {card}
              </div>
            )
          })}
```

Note the `Link` wrapper keeps `className="block"` so the grid child keeps its height behavior. The `div` wrapper mirrors it.

- [ ] **Step 6: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS — all 7 tests pass, 0 fail.

- [ ] **Step 7: Verify the type check passes**

Run: `npm run typecheck`
Expected: PASS — no TypeScript errors. The ternary `project.link ? ... : ...` narrows `project.link` to `string` inside the `<Link>` branch, so no non-null assertion is needed.

- [ ] **Step 8: Verify the production build still succeeds**

Run: `npm run build`
Expected: PASS — "✓ Compiled successfully", 2 static routes (`/` and `/_not-found`). No type errors reported (note: `next.config.mjs` sets `ignoreBuildErrors`, so `next build` will NOT catch type errors — that is why Step 7 matters).

- [ ] **Step 9: Remove the temporary fixture entry**

Delete the "Temporary Linkless Fixture" object added in Step 2 from the `projects` array.

Run: `npm test`
Expected: FAIL — the count assertions now report `7 !== 8`. This is the **expected** result at this point: the fixture is gone and FIRE242 has not been added yet. Task 4 restores the green state.

- [ ] **Step 10: Commit the component change**

```bash
git add components/projects.tsx tests/projects.test.tsx
git commit -m "feat(projects): support project cards without a public link"
```

---

### Task 4: Add the FIRE242 project card

**Files:**
- Modify: `components/projects.tsx` (add FIRE242 as the first entry in the `projects` array)

**Interfaces:**
- Consumes: the linkless-card support from Task 3.
- Produces: the `Projects` component rendering 8 cards, the first being FIRE242.

- [ ] **Step 1: Add the FIRE242 entry**

In `components/projects.tsx`, insert this as the **first** object in the `projects` array:

```tsx
  {
    title: "FIRE242 — National Voter Management & Election Survey Platform",
    description:
      "National voter management and election operations platform built for the Free National Movement (FNM) in The Bahamas. Covers voter records by constituency and polling division, door-to-door survey collection, three-tier role-based access control, real-time reporting dashboards, and multi-election-cycle data separation. Deployed on a Linux VPS with CI/CD via GitHub Actions.",
    icon: Vote,
    tech: ["Laravel", "Next.js", "MySQL", "REST APIs", "RBAC", "Election Systems"],
  },
```

Add `Vote` to the `lucide-react` import in the same file. The import line must end with:

```tsx
import { ArrowUpRight, ShoppingCart, Ticket, Newspaper, BookOpen, Monitor, Warehouse, Bot, Lock, Vote, type LucideIcon } from "lucide-react"
```

Keep `type LucideIcon` in that import — the `Project` type added in Task 3 Step 4 depends on it, and dropping it breaks the type check.

Note: this entry has **no `link` field**. That absence is what renders it as a non-navigable card.

- [ ] **Step 2: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS — all 7 tests pass, 0 fail. The count assertions now see 8 cards: 7 linked, 1 unlinked.

- [ ] **Step 3: Verify the FIRE242 card content is correct**

Add this test to `tests/projects.test.tsx`:

```tsx
test('the FIRE242 card renders its title, client name, and stack', () => {
  const doc = render()
  const fire = [...doc.querySelectorAll('[data-slot="card"]')].find(
    (card) => card.textContent?.includes('FIRE242')
  )!
  assert.ok(fire)
  assert.ok(fire.textContent?.includes('Free National Movement (FNM) in The Bahamas'))
  for (const tech of ['Laravel', 'Next.js', 'MySQL', 'REST APIs', 'RBAC', 'Election Systems']) {
    assert.ok(fire.textContent?.includes(tech), `missing tech badge: ${tech}`)
  }
})
```

Run: `npm test`
Expected: PASS — 8 tests pass, 0 fail.

- [ ] **Step 4: Verify the type check and build pass**

Run: `npm run typecheck`
Expected: PASS — no TypeScript errors.

Run: `npm run build`
Expected: PASS — "✓ Compiled successfully", 2 static routes.

- [ ] **Step 5: Verify the built HTML contains FIRE242 as a non-linked card**

Run:
```bash
node -e "const h=require('fs').readFileSync('.next/server/app/index.html','utf8');const b=h.replace(/<script[^>]*>[\s\S]*?<\/script>/g,'');console.log('FIRE242 present:', b.includes('FIRE242'));console.log('cards:', (b.match(/data-slot=\"card\"/g)||[]).length);console.log('h3 titles:', (b.match(/data-slot=\"card-title\"[^>]*>/g)||[]).length)"
```
Expected output:
```
FIRE242 present: true
cards: 8
h3 titles: 8
```

- [ ] **Step 6: Commit**

```bash
git add components/projects.tsx tests/projects.test.tsx
git commit -m "feat(projects): add FIRE242 voter management platform card"
```

---

## Verification Record

The full implementation was dry-run on 2026-11-18 before this plan was finalized. Every assertion below was executed and passed; the source changes were then reverted so the executor starts from a clean tree.

| Check | Result |
|---|---|
| `npm test` — all 12 assertions (3 `CardTitle` + 9 `Projects`) | PASS, 12/12 |
| `npm run typecheck` (`tsc --noEmit`) | PASS, no errors (requires `@types/jsdom`) |
| `npm run build` | PASS, 2 static routes (`/`, `/_not-found`) |
| Built HTML: `FIRE242 present` | `true` |
| Built HTML: `cards` | `8` |
| Built HTML: `h3 titles` | `8` |
| Built HTML: `Free National Movement (FNM) in The Bahamas` | `true` |
| Built HTML: `Confidential` | `true` |

Two details confirmed by this run and relied on by the plan's assertions:

- `lucide-react` renders `class="lucide lucide-lock"` and `class="lucide lucide-arrow-up-right"`, and both survive a custom `className` (`class="lucide lucide-lock h-3 w-3"`). The `.lucide-lock` and `.lucide-arrow-up-right` selectors are therefore valid.
- `Slot` merges className from both the slot props and the child element, so `<CardTitle asChild className="text-foreground"><h3 className="font-bold">` yields a single element carrying `text-foreground`, `font-bold`, and `leading-none`.

## Out of Scope

Not part of this plan, deliberately:

- The 51 unused shadcn components in `components/ui/` and their ~12 orphaned dependencies.
- The broken `npm run lint` script (ESLint is not installed).
- `next.config.mjs` setting `typescript.ignoreBuildErrors: true`.
- The two tracked lockfiles and the wrong inferred workspace root.
- The `experience.tsx` entries with `link: "#"` that jump to the top of the page.
- The 949 KB `profile.png` served unoptimized.
- Missing OpenGraph/sitemap/robots metadata.
- `next@16.1.6` carries a critical advisory (HTTP request smuggling in rewrites, plus several DoS and XSS issues); `next@16.4.6` is the current release and is the fixed version. This is a separate dependency-upgrade task.
