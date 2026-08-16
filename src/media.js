/* =========================================================
   MEDIA ASSETS — PERSONALIZE HERE
   =========================================================

   Every image this project uses is listed below.

   To use your own images, pick ONE of these ways:

   1. Easiest — replace the files inside `public/media/`
      with your own images, keeping the exact same file
      names (for example, put your own photo over
      `public/media/Image1.jpeg`). No code changes needed.

   2. Full control — drop your own images into
      `public/media/` and point any entry below at them
      (for example, change a value to
      '/media/my-photo.jpg').

   Anything inside `public/` is served at the matching
   URL, so `public/media/foo.jpg` is reachable as
   '/media/foo.jpg'.

   If a file is missing, that image simply won't appear —
   the rest of the site keeps working.
   ========================================================= */

export const MEDIA = {
  /* Background of the music section (CSS: .music-section) */
  sky: '/media/music-section-sky.jpeg',

  /* Scrapbook frame that the photos sit inside */
  template: '/media/template.jpeg',

  /* Album cover shown in the music player */
  cover: '/media/preet-cover.jpeg',

  /*
   * Photos pinned onto the scrapbook.
   *
   * The scrapbook has 5 photo slots. If you list fewer
   * photos here, they repeat to fill every slot (so you
   * can list as few as 1). Missing or broken files are
   * skipped automatically and replaced with another
   * available photo, so no slot is ever left empty.
   */
  photos: [
    '/media/Image1.jpeg',
    '/media/Image2.jpeg',
    '/media/Image3.jpeg',
    '/media/Image4.jpeg',
    '/media/Image5.jpeg',
    '/media/Image6.jpeg',
  ],

  /* Floating stickers on the birthday reveal screen */
  stickers: {
    clover: '/media/clover.png',
    whiteFlower: '/media/white-flower.png',
    evilEye: '/media/evil-eye.png',
    rose: '/media/rose.png',
  },
}
