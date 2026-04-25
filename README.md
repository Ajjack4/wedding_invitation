# Sangram & Prajakta — Wedding Invitation

A beautiful wedding invitation website built with Next.js 16, Tailwind CSS v4, and Framer Motion.

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Styling**: Tailwind CSS v4 with custom `@theme` tokens
- **Animations**: Framer Motion
- **Icons**: Custom inline SVGs (lotus, diya, mandap, marigold, rings)
- **Maps**: Google Maps embed (iframe)
- **i18n**: Next.js built-in routing with JSON dictionaries
- **Fonts**: Playfair Display · Lato · Tiro Devanagari Marathi

---

## URL Structure

| URL | Description |
|-----|-------------|
| `/en` | English, fallback name "You Are Invited" |
| `/mar` | Marathi, fallback "आपले स्वागत आहे" |
| `/en/Rahul-Sharma` | English, invitee "Rahul Sharma" |
| `/mar/Priya-Patil` | Marathi, invitee "Priya Patil" |

Hyphens in the invitee segment are replaced with spaces and title-cased automatically.

---

## Adding Real Photos

1. Place the bride's photo at `public/images/bride.jpg`
2. Place the groom's photo at `public/images/groom.jpg`
3. Open [components/CoupleSection.tsx](components/CoupleSection.tsx) and replace the `src` props:
   ```tsx
   // Groom — replace placeholder
   src="/images/groom.jpg"
   // Bride — replace placeholder
   src="/images/bride.jpg"
   ```
4. Remove the `placehold.co` entry from `next.config.ts` once real photos are in place.

---

## Generating Invitee URLs

Replace spaces in the guest's name with hyphens:

```
Rahul Sharma  →  /en/Rahul-Sharma
Priya Patil   →  /en/Priya-Patil
```

Bulk-generate a share list:

```js
const guests = ["Rahul Sharma", "Anita Patil", "Vikram Joshi"]
const links = guests.map(
  name => `https://your-domain.com/en/${name.replace(/ /g, '-')}`
)
```

---

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm run start
```

---

## Deploy to Vercel

1. Push to a GitHub repository.
2. Import the project at [vercel.com](https://vercel.com).
3. Set **Root Directory** to `wedding_invitation` if the repo root is the parent folder.
4. No environment variables needed.
5. Click **Deploy**.

`generateStaticParams` pre-generates both `/en` and `/mar` layouts for fast static delivery.

---

## i18n

Translation files are in [`messages/en.json`](messages/en.json) and [`messages/mar.json`](messages/mar.json). Edit keys there to update text site-wide. To add a new language, add a new file and register it in [`app/[lang]/dictionaries.ts`](app/%5Blang%5D/dictionaries.ts).
