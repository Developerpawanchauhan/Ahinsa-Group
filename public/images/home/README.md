# Home Page Images

Yeh folder home page (`/`) ke saare images ka hai. Niche bataye gaye exact filenames use karke images upload kar.

## Folder Structure

```
public/images/home/
├── hero/                    Hero slider images (top of page)
│   ├── slide-1.jpg
│   ├── slide-2.jpg
│   └── slide-3.jpg
│
├── about/                   "About Ahinsa Group" section
│   ├── main.jpg
│   └── secondary.jpg
│
├── backgrounds/             Section background images
│   ├── stats.jpg
│   ├── why-choose-us.jpg
│   └── parallax-quote.jpg
│
└── testimonials/            Customer photos
    ├── person-1.jpg
    ├── person-2.jpg
    ├── person-3.jpg
    └── person-4.jpg
```

## Step-by-Step: Kahan Kya Upload Karna Hai

### 1. Hero Slider (top banner — 3 slides)

**Folder:** `public/images/home/hero/`

| File | Section | Recommended Size |
|---|---|---|
| `slide-1.jpg` | Slide 1 — "Iconic Landmarks" | 1920 x 1080 |
| `slide-2.jpg` | Slide 2 — "Luxury Residences" | 1920 x 1080 |
| `slide-3.jpg` | Slide 3 — "Commercial Excellence" | 1920 x 1080 |

> **Tip:** High-res landscape photos. Faces / important details centre-frame mein rakhna (kyunki ken-burns zoom hoga).

---

### 2. About Preview Section (home page ka 2nd full section)

**Folder:** `public/images/home/about/`

| File | Section | Recommended Size |
|---|---|---|
| `main.jpg` | Bada vertical image (left side) | 1200 x 1500 (4:5) |
| `secondary.jpg` | Chhota square image (overlapping bottom-right) | 600 x 600 |

> **Tip:** `main.jpg` mein hero project ka exterior, `secondary.jpg` mein interior detail ya amenity.

---

### 3. Section Backgrounds (subtle — opacity 5-10% pe show hote hain)

**Folder:** `public/images/home/backgrounds/`

| File | Section | Recommended Size |
|---|---|---|
| `stats.jpg` | Stats section background (20+, 35+, etc.) | 1920 x 800 |
| `why-choose-us.jpg` | "The Ahinsa Promise" section background | 1920 x 1080 |
| `parallax-quote.jpg` | Big quote section (full-width parallax) | 1920 x 1080 |

> **Tip:** In images pe heavy overlay padta hai, to even average-quality images bhi chal jayengi.

---

### 4. Testimonials (customer photos — 4 small circular avatars)

**Folder:** `public/images/home/testimonials/`

| File | Customer | Recommended Size |
|---|---|---|
| `person-1.jpg` | Rohit Agarwal | 240 x 240 (square) |
| `person-2.jpg` | Priya Sharma | 240 x 240 (square) |
| `person-3.jpg` | Arjun Mehra | 240 x 240 (square) |
| `person-4.jpg` | Sneha Kapoor | 240 x 240 (square) |

> **Tip:** Square headshots — circular crop apne aap hoga.

---

## Total Images Needed for Home Page

**12 images** (3 hero + 2 about + 3 backgrounds + 4 testimonials)

## Upload Karne Ka Tarika

### Option A: GitHub Web UI
1. Yeh URL khol: https://github.com/Developerpawanchauhan/Ahinsa-Group/tree/feat/ahinsa-website-v1/public/images/home
2. Kisi sub-folder mein jaa (jaise `hero/`)
3. **`Add file`** → **`Upload files`**
4. Drag-drop kar
5. Filename ko above table ke according rename kar
6. **`Commit changes`** → directly to `feat/ahinsa-website-v1` branch

### Option B: Mujhe Bata
Sab images upload ho jaye to chat mein bata de — main `site.js` aur `Home.jsx` mein URLs ko local paths se replace kar dunga, jaise:
```js
// Pehle:
'https://images.unsplash.com/photo-...'
// Baad mein:
'/images/home/hero/slide-1.jpg'
```

## File Format & Compression

- **Format:** `.jpg` (photos ke liye), `.png` (transparent assets ke liye)
- **Compress karna:** [TinyPNG](https://tinypng.com) ya [Squoosh](https://squoosh.app) use kar
- **Target size:** Hero images 300-500 KB tak, others 100-250 KB
