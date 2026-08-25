# Ahinsa The Grand Square Mall — Images

**Project URL:** `/projects/grand-square-mall`
**Location:** Agra, UP
**Type:** Retail &middot; Entertainment &middot; Multiplex

## In use

Paths are set in `src/data/site.js` &rarr; `PROJECT_DETAILS['grand-square-mall']`.

| File | Where it appears |
| --- | --- |
| `img1.png` | Homepage card, nav menu, projects page (daytime corner view) |
| `hero.png` | Project page hero (straight-on facade) |
| `img5.png` | Overview section (dusk render) |

All three also appear in the project page gallery.

## Worth adding

Interior renders would fill out the gallery — atrium, anchor store fronts,
food court, multiplex. Drop them here and add the paths to the `gallery`
array in `src/data/site.js`.

Note: the three renders are PNGs of roughly 2.4 MB each. Re-saving them as
JPEG (~85% quality) would cut each to a few hundred KB with no visible
difference, and make the page noticeably faster on mobile data.

## Still to fill in `src/data/site.js`

Each is marked `TODO`. Sections left empty skip themselves, so the page
stays tidy meanwhile:

- `fullAddress` — the exact street address
- `overview` — the full write-up (one paragraph is there now)
- `highlights` — the "What makes it special" cards
- `amenities` — the "Lifestyle, delivered" grid
- `locationAdvantages` — the "Key Distances" list
- `rera` — registration number, if there is one
- `mapEmbed` — a Google Maps embed URL; without it the page falls back to a
  search pin for "Agra, India"
