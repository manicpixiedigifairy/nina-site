# byninaaustin.com on Netlify (test build)

`build.py` assembles the full site into `dist/` from the files already in this repo, so `pages/`, `home-gallery/`, `giveaway/` and `custom-js/` stay the single source of truth. Netlify runs it on every push through `build.sh` at the repo root (project: portfoliodupe).

## Addresses
- `/` the 3D Portfolio Gallery (`home-gallery/index.html`, assets at `/assets/`)
- `/<slug>/` each case study and core page, mapped in `PAGES` inside `build.py`
- `/portfolio-giveaway/` the giveaway
- Pages that only exist in Squarespace are listed in `SQUARESPACE_ONLY` and redirect to the live site until they are rebuilt here

## Before switching the domain
1. Rebuild every page in `SQUARESPACE_ONLY` (otherwise those redirects would loop once the domain points here).
2. Set the Netlify environment variable `SITE_LAUNCHED=1` so `robots.txt` lets search engines in.
3. Point byninaaustin.com's DNS at Netlify.
