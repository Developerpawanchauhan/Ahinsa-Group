# Ahinsa Group Agra — Official Website

A premium luxury real estate website for **Ahinsa Group Agra**, built with React + Vite + Tailwind CSS.

## Tech Stack

- **React 18** + **Vite 5** — fast dev server and build
- **Tailwind CSS 3** — utility-first styling, custom gold + ink theme
- **React Router v6** — client-side routing
- **Framer Motion** — scroll-reveal animations
- **Swiper** — hero slider, testimonials carousel
- **Lucide React** — clean icon set
- **Google Fonts** — Playfair Display (serif), Inter (sans), Cormorant Garamond (display)

## Pages

- `/` &mdash; **Home** (hero slider, about preview, stats, featured projects, why-choose-us, testimonials, media preview, CTA)
- `/about` &mdash; **About Us** (story, vision/mission, values, leadership, milestones timeline)
- `/projects` &mdash; **Our Projects** (filterable flat grid, no sub-categories)
- `/media` &mdash; **Media** (featured story, news grid, brand film, gallery)
- `/contact` &mdash; **Contact** (form, office details, map embed)

## Design System

- **Theme**: dark luxury (ink-900 background) + gold accents (#C9A227)
- **Typography**: Playfair Display for headings, Inter for body
- **Motifs**: gold dividers, eyebrow labels, ken-burns hero images, glass-card components

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
# → http://localhost:5173

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

## Project Structure

```
ahinsa-group/
├── public/
│   └── logo.svg              # Brand logo (replace with final asset)
├── src/
│   ├── components/
│   │   ├── Footer.jsx
│   │   ├── Logo.jsx          # SVG logo component
│   │   ├── Navbar.jsx        # Sticky transparent → solid on scroll
│   │   ├── PageHero.jsx      # Reusable inner-page hero
│   │   ├── Reveal.jsx        # Scroll-reveal wrapper (Framer Motion)
│   │   └── SectionHeading.jsx
│   ├── data/
│   │   └── site.js           # ALL placeholder content (edit this!)
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Home.jsx
│   │   ├── Media.jsx
│   │   └── Projects.jsx
│   ├── App.jsx
│   ├── index.css             # Tailwind + custom utility classes
│   └── main.jsx
├── index.html
├── tailwind.config.js        # Theme: gold, ink, fonts, animations
├── vite.config.js
└── package.json
```

## Customization Guide

### 1. Replace placeholder content
All textual content (company name, projects, news, testimonials, leadership) lives in **`src/data/site.js`**. Edit this single file to update content across the site.

### 2. Replace images
Currently using Unsplash placeholder URLs. Replace with your own assets:
- Drop images in `public/images/` and reference as `/images/your-file.jpg`
- Or update URLs in `src/data/site.js`

### 3. Replace logo
Replace `public/logo.svg` with your final logo file. The `Logo.jsx` component renders an inline SVG — swap with `<img src="/logo.svg" />` if you prefer.

### 4. Update brand colors
Edit `tailwind.config.js` &rarr; `theme.extend.colors.gold` and `colors.ink`.

### 5. Update contact info
- Phone, email, address are in `src/data/site.js` &rarr; `COMPANY`
- Also referenced in `Footer.jsx` and `Navbar.jsx` top bar

### 6. Wire up the contact form
The form in `src/pages/Contact.jsx` currently shows a success state on submit. Wire it to your preferred backend (Formspree, EmailJS, custom API, etc.) inside `handleSubmit`.

## Deployment

Works out of the box with:
- **Vercel** — `vercel deploy`
- **Netlify** — drop `dist/` folder or connect repo
- **GitHub Pages** — `npm run build` then deploy `dist/`
- **Any static host**

For client-side routing on static hosts, ensure all 404s redirect to `index.html`.

## License

Proprietary. (c) Ahinsa Group Agra. All rights reserved.
