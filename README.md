# Birthday Surprise 🎂

A personalized birthday website with a countdown, scrapbook, playlist, and a letter.

## Personalizing the images

**All images used by the site are listed in one file: `src/media.js`.**

To swap in your own images, pick one of these ways:

### Option 1 — Just replace the files (easiest)

Open the `public/media/` folder and replace the images with your own,
**keeping the exact same file names**. For example, put your own photo over
`public/media/Image1.jpeg` to change the first scrapbook photo.

| File in `public/media/` | Where it appears |
| --- | --- |
| `music-section-sky.jpeg` | Background of the music section |
| `template.jpeg` | The scrapbook frame the photos sit in |
| `preet-cover.jpeg` | Album cover in the music player |
| `Image1.jpeg` – `Image5.jpeg` | The photos pinned on the scrapbook — there are 5 slots, so if you have fewer photos they **repeat** to fill every slot, and missing files are skipped automatically |
| `clover.png`, `white-flower.png`, `evil-eye.png`, `rose.png` | Floating stickers on the reveal screen |

### Option 2 — Point the config at your own files (full control)

1. Drop your images into `public/media/` (any file names).
2. Edit `src/media.js` and set each entry to your file, e.g.
   `'/media/my-photo.jpg'`.

Anything inside `public/` is served at the matching URL, so a file at
`public/media/foo.jpg` is reachable as `/media/foo.jpg`. If a referenced
file is missing, that image simply won't show — the rest of the site keeps
working.

## Development

```bash
npm install
npm run dev
```

Build for production with `npm run build` (output in `dist/`).

## Stack

- React 19 + Vite 8 (Oxlint for linting)
