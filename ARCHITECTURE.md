# byninaaustin.com Page Architecture

Snapshot taken 2026-10-10 at commit 686f2a5 (main). Repo: github.com/manicpixiedigifairy/nina-site (public). Owner: Nina Austin, creative director and copywriter, Brooklyn.

## 1. System Overview

Three delivery paths read from this one repo.

1. **Squarespace loaders (live today).** Each Squarespace page holds one Code Block with a tiny loader. The loader fetches `pages/<slug>.html` from `raw.githubusercontent.com/.../main/pages/` and mounts it in a shadow DOM. A push to main goes live in about 5 minutes. Page-only edits never need a re-paste.
2. **Netlify test site (portfoliodupe).** `site/build.py` assembles the whole site into `dist/` at real page URLs. Squarespace stays the live domain until she switches DNS.
3. **Portfolio Giveaway (portfoliogiveaway on Netlify).** `giveaway/` is published as its own project by `build.sh`, which picks what to build from the Netlify `SITE_NAME`.

Header injection on Squarespace loads two shared scripts from `custom-js/` the same way (fetched from GitHub, run with `new Function`).

## 2. Repository Layout

| Path | Role |
| --- | --- |
| `pages/*.html` | 33 standalone page files, one per page or variant. Source of truth for every live page. |
| `loaders/*.loader.html` | 33 paste-ready Code Block loaders, generated, one per page file. |
| `assets/` | 399 flat image files (webp, gif, jpg), about 235 MB, referenced by absolute raw GitHub URL with `?v=N` cache busters. |
| `loader.template.html`, `make_loaders.py` | Loader template and generator. Run `python3 make_loaders.py manicpixiedigifairy nina-site`. |
| `custom-js/` | `project-pages.js` (hides Squarespace header and footer on project pages, edge to edge on phones), `sitewide-menu.js` (hamburger MENU and full-screen numbered overlay), their loaders, and `header-injection.html` (single Header Code Injection block that loads both). |
| `custom-css/` | `footprint-ebay-header-footer.html`, page-level CSS injection that turns the header and footer white for the eBay Footprint page. |
| `home-gallery/` | 3D Portfolio Gallery homepage: `index.html` and `black.html` (identical live version), `writers-room.html` (earlier version), shared `assets/`. |
| `giveaway/` | Portfolio Giveaway site (`index.html`, `work/`, `assets/`). |
| `site/` | `build.py` and README for the Netlify test build. |
| `build.sh`, `netlify.toml` | Netlify entry. `portfoliodupe` builds the full site, `portfoliogiveaway` publishes `giveaway/`. |
| `README.md` | Setup and update notes. |

## 3. Page Contract

Every page file follows the same rules so loaders and the Netlify build can treat them alike.

- Standalone HTML with its own `<style>` and `<script>`. The loader injects stylesheet links into the host head, moves `style[data-global]` into the host head, puts the rest inside the shadow root, and runs page JS with `new Function('document', code)(root)`. Page JS therefore uses `root.getElementById` and `root.querySelector`, never `document`.
- Root class per family (see section 4). All selectors are scoped under it.
- Images use absolute raw GitHub URLs. Image `alt=""` with `role="img"` and an `aria-label`.
- Fonts come from Google Fonts links in the page head.
- Copy rules: no em or en dashes, no underlines, no byline or personal name on project pages, "case study" never appears in new project page copy, no placeholder text, no fabricated quotes, handles, credits, URLs or stats.
- Reveals use IntersectionObserver with a 2.5 second fallback so content never stays hidden.

## 4. Design Families

| Family | Root | Used by | Look |
| --- | --- | --- | --- |
| Landing | `.pg` (Commercials, Content) and `:host` (Experiential) | `commercials-vertical`, `content-vertical`, `experiential-vertical`, `about` | Black ground, Marcellus display, Source Serif body, Jost labels, gold `#F5D98A` accent. `--u:clamp(11px,1.1111vw,28px)`, gutter 5.5u (1.75rem at 1000px and below). Three-tab nav at x 88, y 72 at 1440, identical on all three landings. |
| Campaign editorial (RR) | `.rr` | `pepsi-dig-in`, `restaurant-royalty`, `brunch-with-the-best`, `brunch-with-the-best-menu`, `shea-us-what-you-got-v2` and `-v2-site-fonts` | Container-query scale `--u:clamp(11px,1.1111cqw,28px)`, breakpoints 1000px (`2.1cqw`) and 700px (`3.15cqw`). Retro Haus extruded Unbounded 900 headlines, cream `#FBF1E3`, paper `#FFF8EE`, ink `#1F1209`, blue `#0B22E4`, orange `#F26A2E`, gold `#F7A81B`, Archivo body, Anton accents. HD blue doodle backgrounds `rr-doodle.webp` and `rr-doodle-mir.webp`. |
| Menu variant | `.rr` | `brunch-with-the-best-menu` | Cream menu card with double border over the blue doodle, Playfair Display italic, courses and a receipt. |
| Immersive project pages | `.pg` or bare | Air Max Day, Seize The Summer, Walmart x Beautycon (three variants), Dear Dad, Streamathon, Nike Come Thru, TH Monogram, Sponsored By Suave, Big New Yorker, OK V-Day, Butterfinger, Silk Press, Shea (v1) | One-off aesthetics per campaign, built from the immersive case study recipe (tickers, sticker art, sideways scroll). |
| Large embeds | none | `the-footprint`, `the-footprint-ebay`, `creative-dna-magazine`, `creative-dna-emboss` | Assets inlined in the file (the two Footprint files are about 4 MB each). |

Shared RR section vocabulary: `.nav` (sticky pill tabs plus Back), `.hero` (h1.x, `.pan` photo pair, `.hl` headline), `.mq` marquee, `.sc` sections with `.sh` header (`.lb` numbered label, `h2.x.m`), `.gr` 12-column grid, `.rv` reveal, `.ft` footer card.

Components built in the Brunch work and reusable: story viewer `.sv` (five-frame tap-through with progress bars), review rail `.rl` (scroll-snap cards, prev/next, progress bar) with Craving and City filter `.ff`, experience gallery `.xdg`, `hdrfix` (measures the Squarespace header and pads `.rr` so the nav is never covered).

## 5. Site Map and Page Status

Section is the Notion tracker section. Repo file is the file in `pages/`. Netlify column says whether `site/build.py` serves it (PAGES) or redirects to Squarespace (SQUARESPACE_ONLY).

### Core and landings

| Live slug | Repo file | Netlify | Notes |
| --- | --- | --- | --- |
| `/` | `home-gallery/index.html` | built | 3D Portfolio Gallery. Squarespace Home is still the old page (Notion row "Home (OLD)"). |
| `/commercials` | `commercials-vertical.html` | built | Landing, 8 cards. |
| `/content` | `content-vertical.html` | built | Landing, 9 cards plus Coming Soon. No Restaurant Royalty card yet. |
| `/experiential` | `experiential-vertical.html` | built | Landing, Walmart x Beautycon featured plus 5-row accordion (OK V-Day, HBCU Tour, Brunch With The Best, The '85 Shop, Father's Day Streamathon). Nav matches the other two landings as of 686f2a5. `experiential-carousel.html` is the earlier carousel version. |
| `/about-me` | `about.html` | built | Hides Squarespace header via `data-global` style. Footer removed by project-pages.js. |
| `/creative-dna` | `creative-dna-emboss.html` | built | Shown in nav as "Methodology". `creative-dna-magazine.html` is the earlier version. |
| `/capabilities` | none | none | Live on Squarespace, listed in CORE in project-pages.js. |
| `/portfolio-giveaway` | `giveaway/index.html` | built | Separate Netlify project. |

### Content projects

| Live slug | Repo file | Netlify |
| --- | --- | --- |
| `/shea-us-what-you-got` | `shea-us-what-you-got-v2.html` (v1 and v2-site-fonts kept) | built |
| `/come-thru` | `nike-come-thru.html` | built |
| `/dear-dad` | `dear-dad.html` | built |
| `/monogram` | `th-monogram.html` | built |
| `/seize-the-summer` | `seize-the-summer-v2.html` (v1 kept) | built |
| `/big-new-yorker` | `pizza-hut-big-new-yorker.html` | built |
| `/sponsored-by-suave` | `sponsored-by-suave.html` | built |
| `/the-footprint` | `the-footprint-ebay.html` (plain `the-footprint.html` kept) | built |
| `/silkpressconference` | `silk-press-conference.html` | built |
| `/air-max-day` | `air-max-day.html` | not in PAGES, not in SQUARESPACE_ONLY (gap) |
| Restaurant Royalty | `pepsi-dig-in.html` and `restaurant-royalty.html` | not mapped, no Squarespace slug assigned yet |
| `/walmart-beautycon` | `walmart-beautycon.html`, `-pop`, `-pink` | not mapped, tracker status Editing (Unpublished) |

### Experiential projects

| Live slug | Repo file | Netlify |
| --- | --- | --- |
| `/fathers-day-streamathon` | `dear-dad-streamathon.html` | built |
| `/brunch-with-the-best` | `brunch-with-the-best.html` and `brunch-with-the-best-menu.html` | redirects to Squarespace (not mapped to the repo files). Tracker: Editing (Unpublished). |
| `/ok-v-day` | `ok-v-day.html` | redirects to Squarespace |
| `/hbcu-tour`, `/the-85-shop` | none | redirect to Squarespace |

### Commercials

| Live slug | Repo file | Netlify |
| --- | --- | --- |
| `/never-ever` | `butterfinger-never-ever.html` | built |
| `/plan-for-the-best`, `/for-your-lifes-work`, `/curls-just-wanna-have-fun`, `/never-through`, `/tiny-wins`, `/people-not-profit`, `/how-you-moto`, `/wtyw` | none (Squarespace native) | redirect to Squarespace |

Navigation: landing tabs link Commercials, Content, Experiential. Project pages link back to their landing (`/content`, `/experiential` or `/commercials`). Sitewide MENU links: Home, Commercials, Content, Experiential, Methodology, About Me, Contact (mailto).

## 6. Brunch With The Best and Restaurant Royalty (current state)

- `brunch-with-the-best.html` (main) and `brunch-with-the-best-menu.html` (menu feel) are separate pages with separate loaders. The menu page has Signature Plates, Table Setting, the sweepstakes review rail with filter, and the receipt. The main page still has the photo mosaic "Takeover" section.
- `restaurant-royalty.html` is a standalone copy of `pepsi-dig-in.html` plus the `hdrfix` fix and the title "Pepsi: Restaurant Royalty". Back goes to `/content`. `pepsi-dig-in.html` is unchanged.
- Brunch assets use the `bwb-` prefix (66 files). Restaurant Royalty uses `rr-` (21 files). Both families share `rr-doodle*.webp` and `rr-logo.webp`.

## 7. Assets

Flat folder. Prefix is the campaign: `bwb` Brunch, `bc` Beautycon, `am` Air Max Day, `bfn` Butterfinger, `th` Tommy Hilfiger Monogram, `sts` Seize The Summer, `nk` Nike Come Thru, `okv` OK V-Day, `rr` Restaurant Royalty, `shea` Shea Us What You Got (heaviest at about 69 MB), `ds` Streamathon, `ph` Pizza Hut, `amdww` Walmart, `dd` Dear Dad, `suave`, `silk`. Landing cards use a `-poster.webp` plus `.gif` pair per project in `home-gallery/assets/`.

Rules: WebP for stills, real animated GIF kept as GIF (optimized with ffmpeg palettegen and gifsicle lossy), no deck-only or non-live assets, cache bust with `?v=N` after replacing a file. Assets can not be uploaded to Notion from the shell, so Nina adds new assets to the Notion Assets property by hand.

## 8. Build, Test and Release Workflow

1. Edit or generate the page into `pages/<slug>.html`.
2. Run `python3 make_loaders.py manicpixiedigifairy nina-site`, then `git checkout loaders/creative-dna-emboss.loader.html` (that loader is hand-kept).
3. Test through the loader in headless Chromium at 1440, 1000, 390 and 280 wide (no overflow, no console errors). Pages are tested through the shadow DOM loader, never as a bare file.
4. Run the dash check (grep for em and en dashes) and confirm the count is 0.
5. Commit with the Co-Authored-By and Claude-Session trailers, push to main (`git pull --rebase origin main` first if rejected), verify with `git ls-remote origin main`.
6. Build a base64-inlined preview (replace raw asset URLs with data URIs) and send it for review.
7. Update only the Notion tracker rows of pages changed.
8. Tell Nina when a new Loader Block must be pasted. Existing pages never need a re-paste.

Notion tracker: "Portfolio Pages: Edits and Assets" under her hub "Portfolio Web Design". Data source `collection://24c56467-cdad-4b70-abdc-c395956ea387`. Properties: Page, Section, Status, Loader Block Added, Live URL, Page #, Last updated, Latest update notes. 37 rows at this snapshot.

## 9. Known Gaps and Open Items

- Pasting required: Loader Blocks for `brunch-with-the-best`, `brunch-with-the-best-menu` and `restaurant-royalty`. Streamathon loader unconfirmed.
- Netlify mapping gaps: `air-max-day`, `walmart-beautycon`, Restaurant Royalty, `brunch-with-the-best` and `ok-v-day` repo pages are not served by `site/build.py`. Rebuilding every `SQUARESPACE_ONLY` page is required before the domain switch.
- Content landing has no Restaurant Royalty card. Experiential landing Brunch row copy still says Super Bowl weekend and 13M organic views while the page itself now says 4.7 Billion earned media impressions.
- Experiential landing accordion "+" icon sits on its own line under each title (pre-existing). Landing copy still uses the phrase "case study" in the section heading and link text.
- Brunch: confirm header overlap fix on the live Squarespace header, Super Bowl Weekend year ('23 or '24), "Battalion" spelling on the menu page, Nomad tags, MGM activation content, Vimeo link `https://vimeo.com/1234630272` placement, restaurant detail accuracy on the review rail (eat. may have closed, Blondie's location least certain).
- Main Brunch page has no Hybrid Rollout section yet (only the menu page does).
- `the-footprint` files embed assets and are about 4 MB each.
- Several near-duplicate variants (`-v2`, `-pop`, `-pink`, `-magazine`, `-carousel`) remain in `pages/` as history.
