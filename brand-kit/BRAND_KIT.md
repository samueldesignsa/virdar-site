# Virdar Brand Kit

Custom AI systems for operations-heavy businesses. Dark + gold. Confident, direct, no jargon.

---

## 1. Color System

### Primary

| Role | Token | Hex | RGB | Usage |
|---|---|---|---|---|
| **Background** | `bg` | `#0A0A0A` | 10, 10, 10 | Default canvas, dark mode primary |
| **Accent (Gold)** | `accent` | `#C9A96E` | 201, 169, 110 | Brand identity, CTAs, logo mark, highlights |
| **Text** | `text` | `#F5F0E8` | 245, 240, 232 | Headings, body on dark |

### Secondary

| Role | Token | Hex | Usage |
|---|---|---|---|
| Surface | `surface` | `#141414` | Card backgrounds, secondary panels |
| Surface raised | `surface-raised` | `#1A1A1A` | Modal, elevated UI |
| Text secondary | `text-secondary` | `#8A8475` | Body copy, descriptions |
| Text tertiary | `text-tertiary` | `#7A7568` | Captions, timestamps |
| Border | `border` | `#1E1E1E` | Hairlines, dividers |
| Accent hover | `accent-hover` | `#B8943D` | Hover state for gold elements |

### Color rules

- **Gold is sacred.** Use only for the V mark, primary CTAs, and key accent moments. Never for body copy.
- **Cream over white.** Body text uses `#F5F0E8`, not pure white. Pure white feels sterile and fights the warm palette.
- **High contrast.** Text on `bg` should always be `text` or `text-secondary` — never below WCAG AA contrast.

---

## 2. Typography

### Font families

| Use | Font | Weights | Source |
|---|---|---|---|
| **Display / Headings** | DM Serif Display | 400 | [Google Fonts](https://fonts.google.com/specimen/DM+Serif+Display) |
| **UI / Body** | Inter | 400, 500, 600, 700 | [Google Fonts](https://fonts.google.com/specimen/Inter) |
| **Fallback (serif)** | Georgia, Times New Roman, serif | — | System |
| **Fallback (sans)** | system-ui, -apple-system, Segoe UI | — | System |

### Type rules

- **Headlines:** DM Serif Display, tight letter-spacing (-2 to -3 at large sizes).
- **Body:** Inter 400. Line height 1.7.
- **Labels / eyebrows:** Inter 600, uppercase, letter-spacing 0.15em.
- **Don't use:** italics, ALL CAPS body text, more than 2 fonts on one piece.

---

## 3. Logo System

The Virdar logo is a stylized **V** with negative space (a chevron with a smaller V cut from it). Always render in **gold (#C9A96E)** on dark backgrounds, **black (#0A0A0A)** on light backgrounds.

### Logo files

All sources live in `brand-kit/svg/`. Rendered PNGs in `brand-kit/png/`.

| File | When to use |
|---|---|
| `mark-on-dark.svg/png` | Square profile photos on platforms with dark feeds; default avatar |
| `mark-on-light.svg/png` | When the platform has a light/white background |
| `mark-transparent.svg/png` | Embedding the V mark inside other graphics; favicons |
| `wordmark-on-dark.svg/png` | Email signatures, slide decks, dark-bg headers |
| `wordmark-on-light.svg/png` | Print, white-bg one-pagers |
| `wordmark-transparent.svg/png` | Layering over a custom background |
| `banner-twitter` (1500×500) | X / Twitter profile cover |
| `banner-linkedin` (1128×191) | LinkedIn company/personal cover |
| `banner-facebook` (820×312) | Facebook page cover |
| `banner-youtube` (2560×1440) | YouTube channel art (safe zone centered) |

### Logo usage rules

**Clear space.** Always leave clear space around the V mark equal to **half the height of the V** in every direction. Don't crowd it.

**Minimum size.** Don't render the V mark smaller than 24×24 px. The negative space inside breaks down below that — use the favicon instead.

**Do:**
- Use gold V on dark backgrounds for the primary brand presentation
- Pair the V with the "Virdar" wordmark for first-time touchpoints (banners, intros)
- Use the V mark alone for repeat touchpoints (avatars, favicons, watermarks)

**Don't:**
- Recolor the V outside the gold/black palette
- Stretch, skew, rotate, or distort the mark
- Add drop shadows, glows, or 3D effects
- Place the gold V on backgrounds with poor contrast (mid-greys, cluttered photos)
- Reconstruct the wordmark in any font other than DM Serif Display

---

## 4. Voice & Tone

Virdar's voice is **direct, confident, and operations-savvy**. We speak to business owners, not engineers. We don't use buzzwords. We don't hype. We tell people what's true.

**Do:**
- Lead with specifics ("$15K-$25K," "2-4 weeks," "62% of calls go unanswered")
- Use real verbs ("we build it," "you see it working," "you don't pay until it works")
- Acknowledge what AI is *not* good for, when relevant — credibility comes from honesty

**Don't:**
- Use "synergy," "transform," "leverage," "AI-powered" as headline language
- Promise outcomes you can't measure
- Hide behind vague timelines or pricing

**The Virdar tagline:**
> *We build it. You see it working. Then you pay.*

---

## 5. Social Media Upload Index

Use this table when updating accounts. Every file is in `brand-kit/png/`.

### Profile pictures (avatars)

| Platform | Recommended size | Use file |
|---|---|---|
| **X / Twitter** | 400×400 (source 800+) | `mark-on-dark-1024.png` |
| **LinkedIn (Company & Personal)** | 300×300 (source 800+) | `mark-on-dark-1024.png` |
| **Facebook** | 320×320 (source 800+) | `mark-on-dark-1024.png` |
| **Instagram** | 320×320 (source 1080+) | `mark-on-dark-1024.png` |
| **YouTube channel icon** | 800×800 | `mark-on-dark-800.png` |
| **TikTok** | 200×200 (source 800+) | `mark-on-dark-800.png` |

### Cover / banner images

| Platform | Required size | Use file |
|---|---|---|
| **X / Twitter banner** | 1500×500 | `banner-twitter-1500x500.png` |
| **LinkedIn cover (personal)** | 1584×396 | crop or extend `banner-twitter-1500x500.png` |
| **LinkedIn cover (company)** | 1128×191 | `banner-linkedin-1128x191.png` |
| **Facebook page cover** | 820×312 | `banner-facebook-820x312.png` |
| **YouTube channel art** | 2560×1440 | `banner-youtube-2560x1440.png` |

### Other

| Use case | Use file |
|---|---|
| Email signature logo | `wordmark-on-dark-1200.png` (resize to ~200-300px wide) |
| Slide deck title slide | `wordmark-on-dark-1200.png` |
| Print collateral on white | `wordmark-on-light-1200.png` |
| Embedded in custom graphics | `mark-transparent-1024.png` or `wordmark-transparent-1200.png` |

---

## 6. File Index

```
brand-kit/
├── BRAND_KIT.md                       (this file)
├── render-kit.mjs                     (rebuild PNGs from SVGs)
├── svg/
│   ├── mark-on-dark.svg               1024×1024
│   ├── mark-on-light.svg              1024×1024
│   ├── mark-transparent.svg           1024×1024
│   ├── wordmark-on-dark.svg           1200×320
│   ├── wordmark-on-light.svg          1200×320
│   ├── wordmark-transparent.svg       1200×320
│   ├── banner-twitter.svg             1500×500
│   ├── banner-linkedin.svg            1128×191
│   ├── banner-facebook.svg            820×312
│   └── banner-youtube.svg             2560×1440
└── png/
    ├── mark-on-dark-1024.png          (primary avatar)
    ├── mark-on-dark-800.png
    ├── mark-on-dark-400.png
    ├── mark-on-light-1024.png
    ├── mark-transparent-1024.png      (transparent V mark, large)
    ├── mark-transparent-512.png       (transparent V mark, medium)
    ├── wordmark-on-dark-1200.png
    ├── wordmark-on-light-1200.png
    ├── wordmark-transparent-1200.png
    ├── banner-twitter-1500x500.png
    ├── banner-linkedin-1128x191.png
    ├── banner-facebook-820x312.png
    └── banner-youtube-2560x1440.png
```

---

## 7. Rebuilding the Kit

If you ever change a color, font, or layout in the SVG sources, regenerate all PNGs with:

```bash
node brand-kit/render-kit.mjs
```

The script uses Puppeteer (already in devDependencies) to render each SVG at its target dimensions with the proper Google Fonts loaded.

---

*Last updated: April 2026. Maintained alongside virdar.co.*
