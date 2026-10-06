# Fingerprints

Every site you build with **scrollcraft** gets one row here, appended after it
ships. The registry exists so your next build can prove it is a different page
rather than a re-skin of one you already made.

This file is **yours**. It starts empty on purpose: the gate is about not
repeating *yourself*, so it has nothing to say until you have built something.

The rules and the gate live in the skill's
`references/uniqueness.md`. Short version:

**A new build must differ from EVERY row below on at least 4 of the 6
dimensions.** Four against each row individually, not four on average across the
table. If a planned build fails, change the plan. Never edit a row to make room
for it.

The six dimensions are: **grammar**, **nav treatment**, **hero device**,
**act-sequence shape**, **close pattern**, **signature move**.

Dimension 6 is free, because a signature move is unique by definition. So the
gate really asks for three more out of the remaining five, and a build that
changes only grammar and world will fail it.

---

## The registry

| Build | Grammar | Nav treatment | Hero device | Act-sequence shape | Close pattern | Signature move | World | Port |
|---|---|---|---|---|---|---|---|---|
| editorial-portfolio | Chaptered editorial | Sticky top bar + mobile sheet, anchor scroll-spy | Title page: pure type on dark plate, entrance via data-sc-in (no media above fold) | 3 tagged acts flow > flow > pan(5vh) plus flow plates; ~12vh total; marquee intertitle plate before the peak | Colophon plate: dark masthead, contact links, set-in note, portrait | Career-trail rail in the margin drawing from --sc-trail-p; milestone nodes + labels light as the line passes | Premium-minimal editorial: cream/white + blue-slate (portfolio identity) | 3000 |
| dark-network-portfolio | Filmic one-shot | Fixed minimal bar: wordmark + live WIB clock, no menu / no CTA / no scroll-spy | Pinned span-4 title page with a Three.js wireframe globe + topic nodes driven from --sc-p (assemble -> break apart -> reassemble, caption greets the reassembly) | pin(4) > flow stats > marquee plate > pan(3.5) > flow x4 > pin(1.5); ~12vh total; engineered silence inside the peak act | Pinned contact scene: centred CTA set, magnetic email button, pointer spotlight; footer = brand + Back to top only | Orbiting ML node map: bespoke Three.js globe that explodes into nodes and reassembles around the profile | Dark-brutalist editorial: near-black void + off-white + one electric blue #1e46c8 (portfolio identity) | 3007 |

*(empty: your first build has nothing to clear, so build whatever the interview
points at. From the second onwards, this table is the constraint.)*

---

## What is taken

Add a bullet here whenever a build claims something a later build should avoid
reusing: a grammar, a nav treatment, a close pattern, a signature move, an
act-count-and-length band. The shared columns are what the next build inherits
as a constraint, so writing them down is the whole point.

- **Chaptered editorial on a cream/blue editorial world, sticky top bar, colophon close, ~12vh act band with a single ~5vh pan peak** (editorial-portfolio). The next build inherits these as constraints: change at least the grammar, the nav treatment, or the close before reusing this shape.
- **Filmic one-shot on a dark-brutalist world, menu-less minimal nav (wordmark + clock), pinned contact close, Three.js globe signature, ~12vh band with a pin(4) opening peak** (dark-network-portfolio). Shared with the row above: the dark slate accent family, the marquee plate, the pan act. The next build inherits: pick a different grammar, nav treatment, and close, and no second wireframe-globe signature.

---

## Appending a row

After shipping, add one line to the table and one bullet to **What is taken** if
the build claimed something new. Fill every column. Say what the build shares
with existing rows.

Rows are append-only. A build that has been superseded stays in the table,
because the space it occupies is still occupied.

---

## Worked example

The skill's author kept a registry of twelve builds across eight page grammars.
If you want to see what a filled-in table looks like, and which shapes tend to
collide, read `EXAMPLES.md` in the upstream scroll-craft repository *(upstream repo — not vendored in this port)*. Treat it as
illustration only: those rows are somebody else's builds and they do **not**
constrain yours.
