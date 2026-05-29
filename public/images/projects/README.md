# Project Images Directory

This folder holds all images used on the project detail pages.

## Folder Structure

```
public/images/projects/
├── grand-green-valley/
├── green-valley-empire/
├── green-valley-township/
├── green-valley-orchid/
├── ahinsa-complex/
└── ahinsa-mall-firozabad/
```

Each subfolder corresponds to one project (the folder name is the project's
URL slug, e.g. `/projects/grand-green-valley`).

## Image Filename Convention

Drop your images into the matching folder using these exact filenames so the
website picks them up automatically:

| Filename            | Used For                                     | Recommended Size |
|---------------------|----------------------------------------------|------------------|
| `hero.jpg`          | Full-screen hero banner at top of detail page| 1920 x 1080      |
| `card.jpg`          | Thumbnail on Home / Projects listing grid    | 1200 x 900       |
| `overview.jpg`      | Side image in the "About this project" block | 1200 x 1500 (4:5)|
| `gallery-1.jpg`     | Gallery image 1                              | 1200 x 800       |
| `gallery-2.jpg`     | Gallery image 2                              | 1200 x 800       |
| `gallery-3.jpg`     | Gallery image 3                              | 1200 x 800       |
| `gallery-4.jpg`     | Gallery image 4                              | 1200 x 800       |
| `gallery-5.jpg`     | Gallery image 5                              | 1200 x 800       |
| `gallery-6.jpg`     | Gallery image 6                              | 1200 x 800       |
| `floorplan-1.jpg`   | Floor plan / unit plan image (optional)      | 1200 x 900       |
| `floorplan-2.jpg`   | Floor plan / unit plan image (optional)      | 1200 x 900       |
| `master-plan.jpg`   | Project master plan / site layout (optional) | 1600 x 1200      |
| `location-map.jpg`  | Location / connectivity map (optional)       | 1600 x 1000      |
| `logo.png`          | Project sub-brand logo (optional)            | 600 x 600 (PNG)  |

## How To Replace Placeholders

Right now `src/data/site.js` references **Unsplash URLs** for every image.
Once you upload your own images here, swap the URLs in `site.js` for local
paths like:

```js
hero: '/images/projects/grand-green-valley/hero.jpg',
```

That's it — the site will serve them from this `public/` folder.

## Notes

- Use `.jpg` for photographs and `.png` for logos / transparent assets.
- Keep file sizes reasonable (compress with TinyPNG or Squoosh): hero
  banners under ~400 KB, gallery images under ~250 KB.
- Aspect ratios listed above match the design — using very different ratios
  may cause cropping.
