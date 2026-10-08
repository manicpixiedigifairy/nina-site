# byninaaustin.com page code

Each page lives in `pages/`. Squarespace Code Blocks hold a tiny loader that fetches the page from this repo, so editing a file here updates the live page. No re-pasting.

## One-time setup
1. Create a public GitHub repo and upload this folder's contents (`pages/`, `make_loaders.py`, `loader.template.html`).
2. Run `python3 make_loaders.py YOUR_GITHUB_USERNAME YOUR_REPO_NAME` (or ask Claude to). It writes one paste-ready loader per page into `loaders/`.
3. In Squarespace, replace each page's current Code Block contents with the matching `loaders/<page>.loader.html`.

## Updating a page
Replace the file in `pages/` and commit. The live page picks it up within about 5 minutes (GitHub's cache). Hard refresh to see it sooner.

## Notes
- Pages render inside an isolated shadow DOM, so Squarespace styles can't break them.
- `about.html` also hides the Squarespace header on that page (the `data-global` style block).
- Repo must be public for the loader to read it.

## Homepage gallery (3D)
`home-gallery/` holds the Portfolio Gallery homepage: `index.html` (wood floor) and `stone.html` (white stone floor), sharing `home-gallery/assets/`. The Writers Room is the building seen through the gallery doorway; clicking it opens About Me, My Approach and Email Me.
Paste `loaders/home-gallery.loader.html` into one Code Block on the Home page. Change `PAGE` in that loader to switch versions.
