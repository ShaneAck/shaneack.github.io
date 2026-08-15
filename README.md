# shaneackerley.com — GitHub Pages site

Your site as plain HTML/CSS, hosted free on GitHub Pages under your existing
domain. This version includes the redesign: fixed left sidebar nav, optional
looping background video on the homepage, and support for video (not just
images) on individual artwork pages.

## Folder structure

```
site/
├── index.html                  ← homepage (bio text filled in, ready to go)
├── artwork/
│   ├── circle-template.html    ← 11 pages, one per piece
│   ├── untitled-toronto.html      each has placeholders to fill in
│   ├── ... (9 more)               (title/year/dims/medium/description/media)
├── css/
│   └── style.css               ← all styling: sidebar nav, layout, fonts
├── js/
│   └── nav.js                  ← makes the Artwork dropdown tap-friendly on phones
├── fonts/                      ← your Forma DJR files (already in place)
├── images/                     ← drop artwork photos + homepage image here
├── videos/                     ← drop the homepage background video + any
│                                  per-piece videos here
├── files/
│   └── CV.pdf                  ← already in place
└── CNAME                       ← tells GitHub to serve shaneackerley.com
```

## What's new in this version

- **Sidebar nav**: fixed in the left margin (matches how it was on Wix),
  stays in place as you scroll. On phones/narrow screens it automatically
  collapses to a top bar, since a fixed sidebar doesn't work well on small
  screens.
- **No borders**: the gray dividing lines are gone site-wide.
- **Lowercase site title**: "shane ackerley" — handled in CSS
  (`text-transform: lowercase`), so it stays lowercase regardless of how
  it's typed in the HTML.
- **Nav hover**: text turns gray on hover, no underline.
- **Artwork captions**: left-aligned, all set in Computer Modern (no mixed
  fonts).
- **No background panels**: text sits directly over the page/video with no
  translucent white box behind it.

## 1. Add your homepage background video (optional)

Drop a video file into `/videos` named `homepage-bg.mp4`, and optionally a
still-frame image into `/images` named `homepage-poster.jpg` (shown briefly
while the video loads). That's it — `index.html` already references both.

It fills the entire screen and crops as needed regardless of the video's
aspect ratio, and loops automatically, muted, with no controls.

If you'd rather not use a background video at all, open `index.html`,
delete the `<div class="bg-video-wrap">...</div>` block near the top of
`<body>`, and the page will just have a plain white background instead.

## 2. Add your artwork images or videos

Each file in `/artwork` has two clearly labeled options in the HTML:
**Option A** (image, default) and **Option B** (video, commented out). For
each piece:

1. Decide whether it's an image or video piece.
2. If image: drop the photo in `/images`, update the `src` in Option A,
   delete the Option B block.
3. If video: drop the file in `/videos`, delete the Option A block,
   un-comment Option B, update its `src` (and `poster` if you want a
   thumbnail shown before playback).
4. Fill in the title/year/dimensions/medium in the caption, and either
   write a description or delete the `<p class="bio">` block if there
   isn't one.

Do the same for the homepage's image (`index.html`).

## 3. Push to GitHub

Replace the contents of your existing `yourusername.github.io` repo with
everything in this folder (drag-and-drop on github.com, or copy into your
GitHub Desktop-tracked folder and push — whichever you've been using).

Since your DNS and HTTPS are already set up and working, there's nothing
further to configure — updating the files in the repo is all that's needed
for the new design to go live.
