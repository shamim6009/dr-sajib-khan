# ডাঃ মোঃ সজীব খান — Candidate Website (One Page)

A modern, responsive, **Bengali-first one-page** information website for **ডাঃ মোঃ সজীব খান**
(৫১নং ওয়ার্ড, খরতৈল, সাতাইশ) — এম.বি.বি.এস চিকিৎসক, ড্যাব (ইস্টওয়েস্ট মেডিকেল কলেজ শাখা) সিনিয়র যুগ্ম-সাধারণ সম্পাদক, সাতাইশ ক্রীড়া সংঘের সভাপতি।

This is the **local development / static prototype** version. It is written so that it can later be converted into a **custom WordPress theme** without rewriting the front-end.

---

## Technology

| Purpose | Technology |
|---|---|
| Structure | HTML5 (semantic, no build step) |
| Styling | CSS3 (custom properties + Bootstrap 5 grid/utilities) |
| Layout / components | Bootstrap 5.3 (CDN) |
| Icons | Font Awesome 6 (CDN) |
| Scroll animation | AOS 2.3 (CDN) |
| Behaviour | Vanilla JavaScript (no jQuery, no framework) |
| Typography | Google Fonts — *Plus Jakarta Sans*, *Noto Sans Bengali*, *Noto Naskh Arabic* (বিসমিল্লাহ) |

> No React / Vue / Next.js / Tailwind. No PHP. No bundler. Open `index.html` and it works.

---

## Project structure

```
dr-sajib-khan/
│
├── index.html                     ← the whole one-page website
├── promt.txt                      ← the approved content source
│
├── assets/
│   ├── css/
│   │   └── style.css              ← all custom styles (dr-home-* prefix)
│   │
│   ├── js/
│   │   └── script.js              ← header, scroll progress, AOS, modals, video
│   │
│   ├── images/
│   │   ├── logo.png
│   │   ├── sajib-khan.jpg
│   │   ├── video-thumbnail.jpg
│   │   ├── activities-1.jpg … activities-3.jpg
│   │   └── gallery/
│   │       └── work-1.jpg … work-4.jpg
│   │
│   └── videos/
│       ├── README.md
│       └── (place your local .mp4 files here)
│
└── README.md
```

All asset paths in the HTML are **relative** (`assets/images/...`) — no absolute paths — so the project can be pushed to GitHub or hosted anywhere as-is.

---

## Local setup

```bash
# Python
python -m http.server 8000

# or Node
npx serve .
```

Then open `http://localhost:8000`.

> Internet is required on first load because Bootstrap, Font Awesome, AOS and Google Fonts come from a CDN. For a fully offline build, download those files into `assets/vendor/` and update the `<link>` / `<script>` tags in `index.html`.

---

## Sections included on the one page

| # | Section | `id` |
|---|---|---|
| 1 | Topbar + sticky navbar (scroll progress bar, transparent → white on scroll) | `#home` |
| 2 | হোম / Hero (বিসমিল্লাহ, নাম, এলাকা, লক্ষ্য, ভিডিও কার্ড) | `#home` |
| 3 | পরিচিতি / About (তাঁর সম্পর্কে, লক্ষ্য, ৩টি হাইলাইট কার্ড + "আরও জানুন" মডাল) | `#about` |
| 4 | মূল তথ্য / Quick facts (ওয়ার্ড / এলাকা / যোগ্যতা / ফোন) | — |
| 5 | অগ্রাধিকার / Priorities (৬টি কার্ড + "আমাদের লক্ষ্য") | `#priorities` |
| 6 | কর্মকাণ্ড / Activities (৩টি কার্ড) | `#activities` |
| 7 | সর্বশেষ খবর / News (৩টি কার্ড) | `#news` |
| 8 | ফটো গ্যালারি / Gallery (৪টি ছবি + মডাল) | `#gallery` |
| 9 | ভিডিও ও মিডিয়া / Media (৩টি ভিডিও কার্ড) | `#media` |
| 10 | আমাদের সঙ্গে যুক্ত হোন / CTA | `#contact` |
| 11 | লাইভ মার্কি (শিক্ষাবান্ধব • সন্ত্রাসমুক্ত • মাদকমুক্ত • আদর্শ মডেল ওয়ার্ড) | — |
| 12 | Footer (৪ কলাম: ব্র্যান্ড / দ্রুত লিংক / গুরুত্বপূর্ণ তথ্য / যোগাযোগ + সোশ্যাল) | — |
| 13 | Floating phone + back-to-top buttons, ৩টি মডাল | — |

> There is **no contact form** — the CTA section is the contact block (`#contact`), and the nav/footer "যোগাযোগ" links point to it.

---

## Where to replace content

### 1. Candidate photo
`index.html` → `assets/images/sajib-khan.jpg`
Recommended: portrait orientation, roughly 4:5, at least 1200×1500 px, under ~300 KB.

### 2. Logo
`index.html` → `assets/images/logo.png` (used in navbar, footer and as favicon).
Recommended: square PNG with a transparent background, at least 256×256 px.

### 3. Gallery images
`index.html` → `assets/images/gallery/work-1.jpg` … `work-4.jpg`
Update the button attributes together with the `<img src>`:

```html
<button class="dr-home-gal"
        data-dr-gallery="assets/images/gallery/work-1.jpg"
        data-dr-gallery-caption="ছবির বিবরণ">
```

To add a 5th or 6th tile, copy the whole `<div class="col-6 col-lg-3"> … </div>` block and change
the `src` and `data-aos-delay`. `work-2.jpg` and `work-3.jpg` are also reused as the thumbnails for
মিডিয়া card 2 and 3.

The কর্মকাণ্ড and খবর cards use `assets/images/activities-1.jpg` … `activities-3.jpg` — the same three
photos appear in both sections by design.

### 4. Video thumbnail
`index.html` → `assets/images/video-thumbnail.jpg` (1280×720, 16:9).

### 5. Local video
Place the file in `assets/videos/` (e.g. `assets/videos/intro.mp4`, MP4/H.264 recommended),
then point any play button to it:

```html
<button data-dr-video-open="1"
        data-dr-video-type="local"
        data-dr-video-src="assets/videos/intro.mp4"
        data-dr-video-title="পরিচিতি ভিডিও">
```

The file is only requested when the visitor clicks play. If it is missing, the player shows a friendly
Bengali notice instead of a broken player.

### 6. YouTube video ID
No YouTube ID is hard-coded. Replace the placeholder value:

```html
<button data-dr-video-open="1"
        data-dr-video-type="youtube"
        data-dr-video-id="YOUTUBE_VIDEO_ID"
        data-dr-video-title="ভিডিও ০১">
```

`data-dr-video-id` accepts only the **ID part** (for a URL
`https://www.youtube.com/watch?v=AbCdEf123`, the ID is `AbCdEf123`).
While the placeholder is still there, the player shows a friendly "video link not added yet" notice instead of a broken embed.

### 7. Social links
`index.html` → footer, `.dr-home-social` block. Facebook, YouTube and Instagram still use `href="#"`:

```html
<a href="#" class="dr-home-social__link" aria-label="Facebook পেজ">
```

Replace `href="#"` with the real profile/channel URL. Until then, clicking them is safely ignored
(they do not jump the page back to the top). WhatsApp already points to `https://wa.me/8801680696928`.

### 8. Bengali content
All copy lives directly in `index.html`. Editable placeholders:

| Placeholder | Where |
|---|---|
| `[ভিডিও বিবরণ এখানে যোগ করুন]` | Media cards |
| `[এখানে প্রয়োজন হলে অতিরিক্ত বিস্তারিত পরিচিতি যোগ করা যাবে]` | বিস্তারিত পরিচিতি মডাল |
| `ভিডিও ০১` / `ভিডিও ০২` / `ভিডিও ০৩` | Media card titles |
| Gallery captions | `data-dr-gallery-caption="..."` |

Phone and email appear in several places (topbar, quick facts, CTA, footer, floating button). Search and
replace `01680696928` → your number and `sajibkhan0027@gmail.com` → your email, then update the
`tel:` links too (`tel:01680696928`) and the WhatsApp link (`https://wa.me/8801680696928`).

---

## Design tokens

All custom CSS variables live in `:root` at the top of `assets/css/style.css` and are prefixed with `--dr-home-`:

```css
--dr-home-primary:       #006A4E;   /* Bangladesh green */
--dr-home-primary-dark:  #004D3A;
--dr-home-primary-deep:  #00382B;
--dr-home-primary-soft:  #E6F2EC;
--dr-home-accent:        #F42A41;   /* red — small accents only */
--dr-home-accent-soft:   rgba(244, 42, 65, 0.10);
--dr-home-white:         #FFFFFF;
--dr-home-dark:          #17211D;
--dr-home-muted:         #66736E;
--dr-home-light:         #F3F8F5;
--dr-home-border:        #DDE8E2;
--dr-home-flag-green:    #006A4E;
--dr-home-flag-red:      #F42A41;
```

Every custom class is prefixed with `dr-home-` (e.g. `.dr-home-card`, `.dr-home-footer__title`) so the
stylesheet can be dropped into a WordPress theme without colliding with theme or plugin CSS.
Only Bootstrap and Font Awesome classes are left unprefixed.

---

## Live animations

- **Scroll progress bar** at the very top of the header (green → red gradient).
- **Sticky header** that turns white with a shadow; the topbar collapses away on scroll.
- **Pulsing play button** around the hero video.
- **Floating icon tiles** that gently move around the hero video frame.
- **Live dot** blinking in the CTA badge.
- **Running marquee** strip above the footer.
- **Slow light sweep** across the footer background.
- AOS fade/slide/zoom on every block (`once: true`), and all of it is disabled automatically when the
  visitor's system asks for `prefers-reduced-motion`.

---

## JavaScript features (`assets/js/script.js`)

- Sticky header: transparent over the hero, white + shadow after scrolling
- Scroll progress bar (`#drHomeProgressBar`)
- Smooth scrolling with a fixed-header offset (also correct while the mobile menu is open)
- Active navigation state (updates on scroll, sections sorted by position)
- Back-to-top button (appears after scrolling)
- Mobile menu closes automatically after tapping a link
- AOS initialised with `duration: 800, once: true, offset: 80`
- Gallery preview modal (single reusable modal)
- Video modal that can play **both** YouTube iframes and local MP4 files
- Biography modal ("আরও জানুন")
- Placeholder `href="#"` links (social) are neutralised
- Image fallback: a missing image is replaced with a neutral placeholder block instead of a broken icon
- `prefers-reduced-motion` is respected

---

## Accessibility & performance

- Semantic landmarks: `header`, `nav`, `main`, `section`, `article`, `figure`, `footer`
- `lang="bn"`, UTF-8, viewport meta, skip-to-content link
- `alt` text on every meaningful image; `aria-label` on every icon button
- Visible keyboard focus styles, `aria-expanded` / `aria-current` states
- Gallery and card images use `loading="lazy"`
- No inline CSS; all styling lives in `assets/css/style.css`
- Tested for no horizontal scrolling at 320 px, 375 px, 768 px, 1024 px and 1440 px

---

## WordPress conversion plan (later)

| Static file | WordPress template |
|---|---|
| `<header>` + `<nav>` in `index.html` | `header.php` |
| Hero … CTA inside `<main>` | `front-page.php` |
| কর্মকাণ্ড / সংবাদ single view | `single.php` |
| General content page | `page.php` |
| Footer block | `footer.php` |
| `assets/css/style.css` | theme `style.css` + `assets/css/style.css` |
| `assets/js/script.js` | enqueued from `functions.php` |

For the theme later: add a `Theme Header` comment to the top of the CSS, register menus, replace static
text with `get_theme_mod()` / Customizer fields, and add a Custom Post Type for কর্মকাণ্ড (activities) and
সংবাদ (news).

---

## Notes for the client

- The site contains **informational content only** — no helpline, no direct electoral persuasion language.
- News dates and the gallery/media captions are **placeholders** and must be replaced with verified
  information before publishing.
- A YouTube ID has deliberately **not** been invented; add the real one where the placeholder says
  `YOUTUBE_VIDEO_ID`.

---

© 2026 ডাঃ মোঃ সজীব খান। সর্বস্বত্ব সংরক্ষিত।
