# Foundry Friction Woodcut Color-Pop Dual-Surface Pass

Date: 2026-06-05
Working spec: `.context/rebuilding-our-company-image-spec.md`
Tool mode: built-in `image_gen`, parallelized with Codex worker agents.
Purpose: generate both frankc.net landscape sources and LinkedIn portrait sources so one surface does not distort the other.

Copied into `fxchen.github.io`:

- Repo path: `img-posts/rebuilding-our-company/2026-06-05-color-pop-dual-surface/`
- Public URL base after deploy: `/img-posts/rebuilding-our-company/2026-06-05-color-pop-dual-surface/`
- Frank-selected favorite from this pass: `native/portrait/hero-2-surfaces-verdigris-portrait.png`
- Active set: Hero 2 verdigris surfaces, kept in the primary `native/` and `preview-*` folders.
- Unused candidates: Heroes 1, 3, 4, and 5, moved under `unused/` with the same subfolder structure.

## Current Generation Inventory

Before this pass, the newest color-pop set was portrait-only:

- 5 native portrait candidates in `.context/generated_images/foundry-friction-woodcut-color-pop-2026-06-05/native/`
- 5 LinkedIn previews in `.context/generated_images/foundry-friction-woodcut-color-pop-2026-06-05/preview-1080x1350/`

Durable project assets already exist from earlier passes:

- `Action/Projects/frank-public-platform/assets/2026-06-11-rebuilding-our-company/2026-06-04/` — earlier neoclassical/single-symbol image set.
- `Action/Projects/frank-public-platform/assets/2026-06-11-rebuilding-our-company/2026-06-04-woodcut/` — early woodcut landscape/source assets and one 1200x630 social crop.

This pass originally added a complete temporary review set:

- 5 landscape native candidates for frankc.net / blog / OG review.
- 5 portrait native candidates for LinkedIn feed / carousel review.
- 5 `1200x630` landscape previews.
- 5 `1080x1350` portrait previews.

After Frank selected Hero 2, the unused candidates were moved under `unused/` so accidental article references point only at the active group.

## Active Outputs

| Surface | Path | Dimensions |
|---|---|---|
| frankc.net landscape native | `native/landscape/hero-2-surfaces-verdigris-landscape.png` | `1536x1024` |
| LinkedIn portrait native | `native/portrait/hero-2-surfaces-verdigris-portrait.png` | `1122x1402` |
| OG / link preview | `preview-1200x630/hero-2-surfaces-verdigris-landscape.png` | `1200x630` |
| LinkedIn feed preview | `preview-1080x1350/hero-2-surfaces-verdigris-portrait.png` | `1080x1350` |

## Native Outputs

| Hero | Facet | Accent/background | Landscape native | Portrait native |
|---|---|---|---|---|
| 1 | Company reorganized by graph | Acid moss / survey green | `unused/native/landscape/hero-1-cover-acid-moss-landscape.png` `1536x1024` | `unused/native/portrait/hero-1-cover-acid-moss-portrait.png` `1122x1402` |
| 2 | One graph under many surfaces | Verdigris / weathered teal | `native/landscape/hero-2-surfaces-verdigris-landscape.png` `1536x1024` | `native/portrait/hero-2-surfaces-verdigris-portrait.png` `1122x1402` |
| 3 | Load-bearing description | Faded coral / warning red | `unused/native/landscape/hero-3-keystone-coral-landscape.png` `1536x1024` | `unused/native/portrait/hero-3-keystone-coral-portrait.png` `1122x1402` |
| 4 | Consumer mode / trusted slice | Dusty periwinkle / muted lapis | `unused/native/landscape/hero-4-consumer-periwinkle-landscape.png` `1536x1024` | `unused/native/portrait/hero-4-consumer-periwinkle-portrait.png` `1122x1402` |
| 5 | Kitchen reframe / cutting board as graph | Pale ochre / old gold | `unused/native/landscape/hero-5-kitchen-ochre-landscape.png` `1536x1024` | `unused/native/portrait/hero-5-kitchen-ochre-portrait.png` `1122x1402` |

## Preview Outputs

frankc.net / OG previews:

- `preview-1200x630/hero-2-surfaces-verdigris-landscape.png`

LinkedIn previews:

- `preview-1080x1350/hero-2-surfaces-verdigris-portrait.png`

Unused frankc.net / OG previews:

- `unused/preview-1200x630/hero-1-cover-acid-moss-landscape.png`
- `unused/preview-1200x630/hero-3-keystone-coral-landscape.png`
- `unused/preview-1200x630/hero-4-consumer-periwinkle-landscape.png`
- `unused/preview-1200x630/hero-5-kitchen-ochre-landscape.png`

Unused LinkedIn previews:

- `unused/preview-1080x1350/hero-1-cover-acid-moss-portrait.png`
- `unused/preview-1080x1350/hero-3-keystone-coral-portrait.png`
- `unused/preview-1080x1350/hero-4-consumer-periwinkle-portrait.png`
- `unused/preview-1080x1350/hero-5-kitchen-ochre-portrait.png`

## Review Notes

- The dual-surface approach is justified. The landscape outputs are properly restaged wide images, not clipped portrait art.
- Active selection is Hero 2, which best represents the whole essay thesis: many surfaces, one graph underneath.
- Landscape Hero 3 remains a strong unused OG alternative for the war-story beat.
- Portrait Hero 3 remains a strong unused feed alternative for the war-story beat.
- Landscape Hero 5 remains a strong unused wide closing/reframe image.
- Portrait Hero 2 fixed the previous aspect problem; it is now a clean 4:5 active candidate.
- Do not promote the flat background color-field rule into the durable skill until Frank confirms this direction.

## Blog Integration (frankc.net) — 2026-06-05

Created `_posts/2026-06-11-rebuilding-our-company.md` (local, unpushed) using three heroes copied to flat published names under `img-posts/`. Native `1536x1024` landscapes for the in-body images; the `1200x630` only for the OG meta (the one surface that needs that ratio).

| Published file | Source hero | Role | Insertion point + why |
|---|---|---|---|
| `img-posts/rebuilding-our-company.png` (1200x630) | Hero 1 acid-moss | `share-img` OG meta | Carries the whole-post thesis (company reorganized by its graph) and stays legible at thumbnail size. The only 630 asset used. |
| `img-posts/rebuilding-our-company-cover.png` (1536x1024) | Hero 1 acid-moss | in-body, after the intro paragraph | Visualizes "being reorganized by your own tools / rebuilding the company," setting the frame before the "everything is a graph" beat. |
| `img-posts/rebuilding-our-company-surfaces.png` (1536x1024) | Hero 2 verdigris | in-body, after the CEO paragraph | Depicts "many different surfaces, one graph underneath" exactly where the text lands that idea. Landscape crop; the verdigris portrait stays the LinkedIn feed image. |
| `img-posts/rebuilding-our-company-keystone.png` (1536x1024) | Hero 3 coral | in-body, after the load-bearing-description war story | The arch + corrected keystone node is the literal picture of "one sentence held up every answer." |

Principle: each image punctuates the paragraph whose idea it depicts (image as evidence, not decoration), so the three in-body slots match the three narrative beats. Heroes 4 (consumer/periwinkle) and 5 (kitchen/ochre) stay in `unused/`, reserved for the LinkedIn carousel. The dated run folder and `unused/` curation were left untouched; published copies are flat for clean, stable URLs.

Pending before push: sign-off gates (James naming, Palantir FDE review). Preview with `bundle exec jekyll serve --watch --future` (post is future-dated 2026-06-11).
