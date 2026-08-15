# shaneackerley.com — GitHub Pages site

This is your Wix site rebuilt as plain HTML/CSS, ready to host for free on
GitHub Pages under your existing domain.

## Folder structure

```
site/
├── index.html                  ← homepage (done, uses your real bio text)
├── artwork/
│   ├── circle-template.html    ← 11 pages, one per piece, all placeholders
│   ├── untitled-toronto.html      to fill in (title/year/dims/medium/desc/image)
│   ├── ... (9 more)
├── css/
│   └── style.css               ← all styling, fonts, layout
├── fonts/                      ← EMPTY — drop your Forma DJR files here
├── images/                     ← EMPTY — drop your artwork photos here
├── files/                      ← EMPTY — drop your CV PDF here as CV.pdf
└── CNAME                       ← tells GitHub to serve shaneackerley.com
```

## 1. Add your fonts

Drop your licensed Forma DJR files into `/fonts` using these exact filenames
(rename them if needed):

- `FormaDJRDeck-Regular.woff2` (or `.otf`)
- `FormaDJRDeck-Medium.woff2` (or `.otf`)
- `FormaDJRMicro-Regular.woff2` (or `.otf`)
- `FormaDJRMicro-Medium.woff2` (or `.otf`)

If your files have different weight names, just edit the `src` paths in
`css/style.css` (top of the file) to match. `.woff2` is preferred (smaller,
faster); `.otf` works as a fallback if that's all you have.

Computer Modern (body text) is already wired up via a free CDN — no action
needed there.

## 2. Add your images

Drop each artwork photo into `/images`, then open each page in `/artwork/`
and:

1. Replace `PIECE-FILENAME.jpg` in the `<img src="...">` with your actual
   filename.
2. Fill in `YEAR`, `DIMENSIONS`, and `MEDIUM` in the caption.
3. Replace the description paragraph at the bottom (or delete that whole
   `<p class="bio">...</p>` block if a piece has no description).

Do the same for the homepage image (`index.html` — swap out
`images/homepage-piece.jpg`).

## 3. Add your CV

Drop your CV PDF into `/files` and name it exactly `CV.pdf` (or rename it
and update the link in `index.html` / each artwork page's nav).

## 4. Push to GitHub

1. Create a GitHub account if you don't have one: github.com
2. Create a new repository named exactly `yourusername.github.io`
   (replace `yourusername` with your actual GitHub username — this exact
   naming makes GitHub Pages activate automatically).
3. Upload everything inside this `site/` folder into that repo (drag-and-drop
   works fine on github.com, or use `git push` if you're comfortable with it).

## 5. Turn on GitHub Pages

In the repo: **Settings → Pages → Source → Deploy from branch → main → / (root)**.
Save. Your site will be live at `https://yourusername.github.io` within a
minute or two.

## 6. Point your domain at GitHub

Log into wherever `shaneackerley.com` is registered (check your Wix account
first — domains bought through Wix can still be managed there even after you
stop using Wix's site builder) and add these DNS records:

**A records** for the root domain (`shaneackerley.com`), pointing to all
four of GitHub's IPs:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**CNAME record** for `www`:
```
www.shaneackerley.com  →  yourusername.github.io
```

DNS changes can take a few hours to propagate.

Then in GitHub: **Settings → Pages → Custom domain** → enter
`shaneackerley.com` → Save. GitHub will verify it (using the CNAME file
already in this repo) and automatically issue free HTTPS once DNS is
confirmed. Nothing with "github.io" will ever be visible to visitors.

## 7. Cancel Wix

Once `shaneackerley.com` loads correctly from GitHub Pages, cancel your Wix
subscription.
