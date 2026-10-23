# byninaaustin.com Page Architecture

Snapshot taken 2026-10-10 at commit 686f2a5 (main). Updated 2026-10-13 at commit 6d86543 (Selected Works page added). Updated 2026-10-15 at commit df158c5 (Butterfinger 100 page added). Updated 2026-10-20 at commit 6316c1a (People Not Profit page added). Repo: github.com/manicpixiedigifairy/nina-site (public). Owner: Nina Austin, creative director and copywriter, Brooklyn.

## 1. System Overview

Three delivery paths read from this one repo.

1. **Squarespace loaders (live today).** Each Squarespace page holds one Code Block with a tiny loader. The loader fetches `pages/<slug>.html` from `raw.githubusercontent.com/.../main/pages/` and mounts it in a shadow DOM. A push to main goes live in about 5 minutes. Page-only edits never need a re-paste.
2. **Netlify test site (portfoliodupe).** `site/build.py` assembles the whole site into `dist/` at real page URLs. Squarespace stays the live domain until she switches DNS.
3. **Portfolio Giveaway (portfoliogiveaway on Netlify).** `giveaway/` is published as its own project by `build.sh`, which picks what to build from the Netlify `SITE_NAME`.

Header injection on Squarespace loads two shared scripts from `custom-js/` the same way (fetched from GitHub, run with `new Function`).

## 2. Repository Layout

| Path | Role |
| --- | --- |
| `pages/*.html` | Standalone page files, one per page or variant. Source of truth for every live page. |
| `loaders/*.loader.html` | Paste-ready Code Block loaders, generated, one per page file. |
| `assets/` | Flat image files (webp, gif, jpg), referenced by absolute raw GitHub URL with `?v=N` cache busters. |
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
- Loader regeneration rewrites every loader from the template. Keep `loaders/creative-dna-emboss.loader.html` and `loaders/ok-v-day.loader.html` (pink `#F9D6D2` host background) as hand-kept: run `git checkout` on both after `make_loaders.py`.

## 4. Design Families

| Family | Root | Used by | Look |
| --- | --- | --- | --- |
| Landing | `.pg` (Commercials, Content) and `:host` (Experiential) | `commercials-vertical`, `content-vertical`, `experiential-vertical`, `about` | Black ground, Marcellus display, Source Serif body, Jost labels, gold `#F5D98A` accent. `--u:clamp(11px,1.1111vw,28px)`, gutter 5.5u (1.75rem at 1000px and below). Three-tab nav at x 88, y 72 at 1440, identical on all three landings. Content starts 2.5u (1.75rem at 1000px and below) below the nav on all three, measured at 1920, 1440, 1000 and 390. |
| Campaign editorial (RR) | `.rr` | `pepsi-dig-in`, `restaurant-royalty`, `brunch-with-the-best`, `brunch-with-the-best-menu`, `shea-us-what-you-got-v2` and `-v2-site-fonts` | Container-query scale `--u:clamp(11px,1.1111cqw,28px)`, breakpoints 1000px (`2.1cqw`) and 700px (`3.15cqw`). Retro Haus extruded Unbounded 900 headlines, cream `#FBF1E3`, paper `#FFF8EE`, ink `#1F1209`, blue `#0B22E4`, orange `#F26A2E`, gold `#F7A81B`, Archivo body, Anton accents. HD blue doodle backgrounds `rr-doodle.webp` and `rr-doodle-mir.webp`. |
| Menu variant | `.rr` | `brunch-with-the-best-menu` | Cream menu card with double border over the blue doodle, Playfair Display italic, courses and a receipt. |
| Writing portfolio | `.sw` | `selected-works` | Black `#000` ground, system sans, Instrument Serif italic accents, orange `#F08A45` accent. Sticky top nav (Selected Works, Contact, My Thing Is), bio lead, Music and More filter toggles, article rows with cover thumbnail cards, right profile column above 1180px. CSS-timed loading block. Articles are static HTML; Contact switches by `data-view` (loader) or `:target` (bare file). |
| Immersive project pages | `.pg` or bare | Air Max Day, Seize The Summer, Walmart x Beautycon (three variants), Dear Dad, Streamathon, Nike Come Thru, TH Monogram, Sponsored By Suave, Big New Yorker, OK V-Day, Butterfinger, Butterfinger 100, Silk Press, Shea (v1), HBCU Tour | One-off aesthetics per campaign, built from the immersive case study recipe (tickers, sticker art, sideways scroll). Butterfinger 100 uses root `.bh`: Lilita One display, Fredoka labels, Newsreader body, wrapper yellow `#FFE500`, logo blue `#1F4FB8`, sky `#2EA6EC`, navy `#0B2466`, red `#E5322D`, crimped wrapper edges between sections. |
| People Not Profit | `.pnp` | `people-not-profit` | Campaign aesthetic: black `#0A0A0A` ground, black and white stills, campaign green `#629783` highlight bars, Barlow Condensed 800 uppercase display and labels, Archivo body. Green scribble X-eyes mark drawn on with stroke-dashoffset (inline SVG paths plus an feTurbulence rough filter; `<use>` references do not style inside the shadow root). Sticky top bar with section anchors and a Fight Back button, hero with clip-path reveal, green ticker, flavor loophole strike-through, click to play Vimeo (`.vl`, data-src), Dear Big Tobacco letter with staggered lines, sideways OOH strip (`#run` sticky stage, translateX on scroll, progress bar) that becomes a scroll-snap rail at 1000px and below, count up results. Root uses `overflow:clip`, not `hidden`, so sticky works. |
| Never Through | `.nt` | `never-through`, `never-through-detailed` (`never-through-v1` is a frozen snapshot) | Dark editorial, influenced by magazine spread and film contact sheet references: black `#0B0B0B` ground, off-white `#EDEBE6` type, one red accent `#E3261D`, grain overlay (SVG feTurbulence, screen blend, 7.5%). Archivo variable at 900 weight and 112 width for display (JS fitter shrinks the hero, the tagline lines and wrapped headings until the longest word fits the gutter), Space Mono frame labels (`[ 01 ]  Frame 01: The Manifesto`), Permanent Marker for short red scrawl lines placed beside type, never over imagery. No top row, no nav, no marquee, no footer, no overlapping layers; hero padding clears the sitewide MENU. Hero: NEVER / THROUGH lockup, the campaign manifesto (Taking a knee was the beginning... through And we'll never be through fighting, the last couplet in red marker) centered on the midline of the sizzle GIF frame `nt-sizzle.gif`, four-column meta strip. Then the hero film click to play Vimeo 535084885 (`.vl`, data-src, poster `nt-poster.webp`), the brief as a numbered index (Who, What, Where, Why It Matters), the rollout, the tagline evolution (The Only Way Is Through. with a red SVG strike drawn on scroll, then Never Through.), My Role, closer with Back To Commercials pill. Live page rollout (`.ro .tl`): four-column timeline, Launch then Phase 01 Diversity In Sport, Phase 02 Gender In Sport, Phase 03 Beyond Sport, each with moments, a film box and numbered brand actions, closing with the Making You, Sport, The World Better promise row. Detailed page adds Frame 04 The Strategy (cultural context, Focused Performer target with the three Sports Monitor stats, Jordan Generation vs Gen Z Culture, Leading The Pulse, Get To By cards, platform promise) and runs the rollout beat by beat: phase cards (`.pc`, title, moments, theme, universal insight, phase still in a frame, film bar) then one beat per brand action (`.bt`: Beat 01 / 06 counter, display title, claim line, hero still from the deck in a frame beside The Tension and The Move, then a Storyboard strip of two or three framed stills with Frame 01, 02, 03 titles). Deck stills live at `assets/nt-b-*.webp` (phase `p1`, beats `pf`, `pfx`, `btg`, `ptm`, `gig`, `atf`, `mvp`, `ltw`, `btb`, `ffe`, `oce`, `ss`, with `-1`, `-2`, `-3` storyboard frames); the Athlete Ally frame has no image (partner logo kept off the page). Frames From The Cut contact sheet and the Sizzle cut caption were removed 2026-10-23. |
| How You Moto | `.hm` | `how-you-moto` | Rodeo and Fluz influenced: paper `#FBF7F2` ground, charcoal `#1A1619` hero card inside a lilac `#C9A7FF` to peach `#FFC9B3` to mint `#7FE3C8` gradient frame, Bricolage Grotesque 800 display, Space Grotesk labels, Instrument Sans body, accents magenta `#FF4FD8`, lime `#B8F23D`, tangerine `#FF7A1A`. Sticker outline headlines (`.stk`, a 36 plus 18 step text-shadow ring in `--sc`, color per modifier m/t/l/n/k). Static top bar with anchors and Back To Commercials, phone frame hero GIF, Four Lives One Phone intro with Who / What / Where cards, four alternating film rows with click to play Vimeo (`.vid`, data-vimeo plus data-h for unlisted hashes, `.jp` buttons also play), static pixel sticker band (inline SVG rects, no marquee), The Lines cream cards on charcoal, Why It Matters three boxes, tagline closer. No overlapping layers. |
| Large embeds | none | `the-footprint`, `the-footprint-ebay`, `creative-dna-magazine`, `creative-dna-emboss` | Assets inlined in the file (the two Footprint files are about 4 MB each). |

Shared RR section vocabulary: `.nav` (sticky pill tabs plus Back), `.hero` (h1.x, `.pan` photo pair, `.hl` headline), `.mq` marquee, `.sc` sections with `.sh` header (`.lb` numbered label, `h2.x.m`), `.gr` 12-column grid, `.rv` reveal, `.ft` footer card.

Components built in the Brunch work and reusable: story viewer `.sv` (five-frame tap-through with progress bars), review rail `.rl` (scroll-snap cards, prev/next, progress bar) with Craving and City filter `.ff`, experience gallery `.xdg`, `hdrfix` (measures the Squarespace header and pads `.rr` so the nav is never covered).

Components built in Butterfinger 100 and reusable: tap-to-snap hero object (one image split by two clip-paths, crumb burst), Pick a Pack tab switcher, Time Capsule scroll-snap rail with drag and prev/next, Tear Open instant win tiles (wrapper top and bottom fly apart to reveal a prize, plus an open-all button and counter), title fitter that shrinks the hero title until its longest word fits.

## 5. Site Map and Page Status

Section is the Notion tracker section. Repo file is the file in `pages/`. Netlify column says whether `site/build.py` serves it (PAGES) or redirects to Squarespace (SQUARESPACE_ONLY).

### Core and landings

| Live slug | Repo file | Netlify | Notes |
| --- | --- | --- | --- |
| `/` | `home-gallery/index.html` | built | 3D Portfolio Gallery. Squarespace Home is still the old page (Notion row "Home (OLD)"). |
| `/commercials` | `commercials-vertical.html` | built | Landing, 8 cards. |
| `/content` | `content-vertical.html` | built | Landing, project cards plus Coming Soon. No Restaurant Royalty card yet. Butterfinger 100 card is last before Coming Soon (GIF `bf100-card.gif`). |
| `/experiential` | `experiential-vertical.html` | built | Landing, Walmart x Beautycon featured plus 5-row accordion (OK V-Day, HBCU Tour, Brunch With The Best, The '85 Shop, Father's Day Streamathon). Nav matches the other two landings as of 686f2a5. `experiential-carousel.html` is the earlier carousel version. |
| `/about-me` | `about.html` | built | Hides Squarespace header via `data-global` style. Footer removed by project-pages.js. |
| `/creative-dna` | `creative-dna-emboss.html` | built | Shown in nav as "Methodology". `creative-dna-magazine.html` is the earlier version. |
| `/capabilities` | none | none | Live on Squarespace, listed in CORE in project-pages.js. |
| `/portfolio-giveaway` | `giveaway/index.html` | built | Separate Netlify project. |
| not assigned | `selected-works.html` | not mapped | Writing portfolio (Music and Culture journalism). Bio, 8 articles (Offset, Doechii, Andre 3000, Cyhi Da Prince, WPGM JayProb & Rocky Snyda, Wale, Dying Breed, Black Art Round Up #1), Contact with ninaaustincreative@gmail.com, My Thing Is link. Assets `sw-*.webp`. Tracker row "Selected Works" (Standalone, Editing). Loader Block not pasted yet. Six Substack cards link to the publication home until per-article URLs are added; WPGM and Offset link to their articles. |
| not assigned | `what-the-spec.html` | not mapped | What The Spec?!, spec work gallery (Standalone), rebuilt 2026-10-17 from Nina's Lovable design. Root `.wts`: black ground, white type, gold `#F5D98A` accent (site palette), landing scale `--u` with 5.5u gutters, Anton display, Archivo body, Jost labels; header row is left aligned and 90px tall so it clears and centers on the sitewide MENU, grain, letterboxed hero with Rated S badge. Fill the Reel intro (3, 2, 1 dial, progress bar, skip on click, Escape or Space, locks host body scroll while it plays). Poster grid in the `pieces` array at the top of the script: No. 01 Super Fan Frenzy (poster art `assets/wts-super-fan-frenzy.gif`, credit "A spec film launch campaign") links to the Star Wars spec at super-fan-frenzy.lovable.app (built in Lovable; repo manicpixiedigifairy/starwarsspec). Posters with a url open in an in-page lightbox player (iframe) instead of a new tab, so the project address stays hidden: Mini player (PiP corner window, page stays scrollable), Full screen (Fullscreen API with a full-viewport fallback), Close; opening pushes `#screen-NN` so the browser Back button closes it and the hash deep links; 02 to 06 are Nina's FPO pieces, hidden with `hidden:true` until real work replaces them. Footer: The End?, mailto button, Terms of Viewing. Rental counter: posters with a url read "Rent free"; the first rental opens a Spec House Video membership application (name, optional company, email, Terms of Viewing checkbox), then issues a membership card (member no. SH-######, barcode) stored in localStorage `wts-member`, and the header shows "Member · SH-######" to reopen it. Each registration posts to Make hook 2947034 (scenario 6668971 to Notion "What the Spec: Visit Log"); the scenario is inactive until a Make active-scenario slot is free, so the hook queues up to 50 registrations meanwhile. Returning members go straight to the film. Grain fades out over the last 220px so the page meets the black Squarespace ground without a seam. Not in the sitewide MENU for now (added then removed 2026-10-17). Live Squarespace page (2026-10-17) holds a pasted static copy instead of the Loader Block, so repo updates do not reach it until the Code Block is replaced with loaders/what-the-spec.loader.html. |
| not assigned | `ripe.html` | not mapped | ripe, DTC gourmand fragrance brand positioning microsite, rebuilt 2026-10-17 as an immersive four-part scroll case (Foundation, Campaign World, The Object, World-Building) from Nina's brand and campaign outline. Root `.rp`: Barlow Condensed (stands in for GT America Condensed), Barlow, Yellowtail. Palette Mango #FFC247, Guava Coral #F26C8E, Papaya Red #E8471F, Plum #4A2340, Palm Olive #8E8E52, Coconut Cream #F6EEDF, Gold #C9A24B, plus eight per-fruit gradients. Interactions: eight-bottle lineup hero, editorial macro vs hyperreal CGI toggle, voice lines, eight-fruit cast chooser, logo lab (tanned, engraved, glowing plus ripeness slider), copyable palette, OOH board per fruit, auto story feed, pop-up floor plan, film storyboard, squeeze-to-spray bottle with hotspots, bulb atomizer, peelable stickers, openable Edition 03 book. Assets `ripe-el-*` (38 reference photos: reference wall, textures, cast backgrounds, feed, grid, creators), `ripe-bottle-*` (eight cutouts, identical logo size and placement; peach is derived from the mango render), `ripe-wordmark-*`, other `ripe-*` (references are mood direction only). Back links to /what-the-spec. Loader Block not pasted yet. |

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
| `/butterfinger-100th` | `butterfinger-100.html` | built (PAGES). 100th birthday with The Simpsons wrappers and the Birthday Sweepstakes. Tracker row "Butterfinger: 100 Years" (Content, Editing (Unpublished)). Back goes to `/content`, second button to `/never-ever`. Assets `bf100-*`. |

### Experiential projects

| Live slug | Repo file | Netlify |
| --- | --- | --- |
| `/fathers-day-streamathon` | `dear-dad-streamathon.html` | built |
| `/brunch-with-the-best` | `brunch-with-the-best.html` and `brunch-with-the-best-menu.html` | redirects to Squarespace (not mapped to the repo files). Tracker: Editing (Unpublished). |
| `/ok-v-day` | `ok-v-day.html` | redirects to Squarespace |
| `/hbcu-tour`, `/the-85-shop` | `hbcu-tour.html` (plus `-bus`, `-bus-mature`, `-poster`), `the-85-shop.html` | redirect to Squarespace |

### Commercials

| Live slug | Repo file | Netlify |
| --- | --- | --- |
| `/never-ever` | `butterfinger-never-ever.html` | built |
| `/wtyw` (new page) | `welcome-to-your-walmart.html` | not in PAGES yet. Surreal supermarket walk-through of the Walmart app launch campaign, root `.wy`: Bricolage Grotesque display, Instrument Sans body, Space Mono labels, True Blue `#001E60` ground and ink, Bentonville Blue `#0053E2`, Spark Yellow `#FFC220`, sky `#8ED8FA` fluorescent tubes. Sections: entrance (split hero, film in a framed storefront window with automatic doors that slide open once), Aisle One slider shelf (cans turn from Everything into named items, self-nudges on first view), Aisle Two sideways-scroll aisle (`#run` sticky stage, scroll-snap rail at 1000px and below) with store directory, Checkout price-check scanner and loyalty stamps, Customer Copy receipt that prints line by line, exit doors. No marquee. Hero spot links out to Vimeo 1230558835. Assets `wtyw-*.gif` (4, re-encoded from the Squarespace page's GIFs). Loader generated; Squarespace Code Block on `/wtyw` still holds the native page until the loader is pasted. |
| `/people-not-profit` | `people-not-profit.html` | not in PAGES yet. Tracker row "CTCP — People Not Profit" (Commercials, Editing (Unpublished)). Loader Block not pasted yet. Assets `pnp-*` (13 files). Four Vimeo spots: Fallen Hero 434524608, Kito 434537001, Yazmin 434536829, Cram 434536950. |
| `/how-you-moto` | `how-you-moto.html` | not in PAGES yet (still SQUARESPACE_ONLY). Rebuilt 2026-10-22. Tracker row "Motorola — How You Moto" (Commercials, Editing (Unpublished)). Loader Block not pasted yet. Assets `moto-*` (5 files). Four Vimeo spots: Ready For Takeoff 822311778, Weekend Warrior 822311813, Phone Feast 822311788, Game Time 822311800 (unlisted, hashes in the page). |
| `/never-through` | `never-through.html` | built (PAGES). Rebuilt 2026-10-22 as the dark editorial page (family row above). Assets `nt-*`. Loader Block `loaders/never-through.loader.html` still to be pasted into the Squarespace page. |
| not assigned | `never-through-v1.html` | Backup copy of `never-through.html` as approved the morning of 2026-10-23 (top row, dek, Frames From The Cut and the four-column rollout all still present). Loader `never-through-v1.loader.html`. Do not edit; it is the snapshot. |
| not assigned | `never-through-detailed.html` | Detailed edition of Never Through, same `.nt` family. Frames: 01 Manifesto, 02 Hero Film, 03 Brief, 04 Strategy, 05 Rollout (beat by beat with deck stills, see family row), 06 The Line, 07 Next. Partners named in the beats: Overtime Elite, IMG Academy, Medela, The Queer Gym with Steph Curry, Athlete Ally, ESPN 30 for 30, TikTok Live with The Rock, DK Metcalf. Source: the SS22 Brand Actions deck (marked Do Not Share, kept out of the repo). Loader `never-through-detailed.loader.html`. Not in PAGES. |
| `/plan-for-the-best`, `/for-your-lifes-work`, `/curls-just-wanna-have-fun`, `/tiny-wins`, `/wtyw` | none (Squarespace native) | redirect to Squarespace |

Navigation: landing tabs link Commercials, Content, Experiential. Project pages link back to their landing (`/content`, `/experiential` or `/commercials`). Sitewide MENU links: Home, Commercials, Content, Experiential, Methodology, About Me, Contact (mailto).

## 6. Brunch With The Best and Restaurant Royalty (current state)

- `brunch-with-the-best.html` (main) and `brunch-with-the-best-menu.html` (menu feel) are separate pages with separate loaders. The menu page has Signature Plates, Table Setting, the sweepstakes review rail with filter, and the receipt. The main page still has the photo mosaic "Takeover" section.
- `restaurant-royalty.html` is a standalone copy of `pepsi-dig-in.html` plus the `hdrfix` fix and the title "Pepsi: Restaurant Royalty". Back goes to `/content`. `pepsi-dig-in.html` is unchanged.
- Brunch assets use the `bwb-` prefix (66 files). Restaurant Royalty uses `rr-` (21 files). Both families share `rr-doodle*.webp` and `rr-logo.webp`.

## 7. Assets

Flat folder. Prefix is the campaign: `bwb` Brunch, `bc` Beautycon, `am` Air Max Day, `bfn` Butterfinger, `bf100` Butterfinger 100, `th` Tommy Hilfiger Monogram, `sts` Seize The Summer, `nk` Nike Come Thru, `okv` OK V-Day, `rr` Restaurant Royalty, `shea` Shea Us What You Got (heaviest at about 69 MB), `ds` Streamathon, `ph` Pizza Hut, `amdww` Walmart Beautycon, `wtyw` Welcome To Your Walmart, `dd` Dear Dad, `suave`, `silk`, `sw` Selected Works (8 article covers plus `sw-headshot.webp`), `ripe` ripe spec microsite, `wts` What the Spec, `moto` How You Moto, `el` shared hand drawn and tactile elements (scribbles, strikethroughs, chalk arrows, spray and marker strokes, duct tape, pushpin, zipper; several carry stock watermarks and are references, not production art). Landing cards use a `-poster.webp` plus `.gif` pair per project in `home-gallery/assets/`.

Rules: WebP for stills, real animated GIF kept as GIF (optimized with ffmpeg palettegen and gifsicle lossy), no deck-only or non-live assets, cache bust with `?v=N` after replacing a file. Assets can not be uploaded to Notion from the shell, so Nina adds new assets to the Notion Assets property by hand.

## 8. Build, Test and Release Workflow

1. Edit or generate the page into `pages/<slug>.html`.
2. Run `python3 make_loaders.py manicpixiedigifairy nina-site`, then `git checkout loaders/creative-dna-emboss.loader.html loaders/ok-v-day.loader.html` (those loaders are hand-kept).
3. Test through the loader in headless Chromium at 1440, 1000, 390 and 280 wide (no overflow, no console errors). Pages are tested through the shadow DOM loader, never as a bare file.
4. Run the dash check (grep for em and en dashes) and confirm the count is 0.
5. Commit with the Co-Authored-By and Claude-Session trailers, push to main (`git pull --rebase origin main` first if rejected), verify with `git ls-remote origin main`.
6. Build a base64-inlined preview (replace raw asset URLs with data URIs) and send it for review.
7. Update only the Notion tracker rows of pages changed.
8. Tell Nina when a new Loader Block must be pasted. Existing pages never need a re-paste.

Notion tracker: "Portfolio Pages: Edits and Assets" under her hub "Portfolio Web Design". Data source `collection://24c56467-cdad-4b70-abdc-c395956ea387`. Properties: Page, Section, Status, Loader Block Added, Live URL, Page #, Last updated, Latest update notes, Assets, Current HTML.

## 9. Known Gaps and Open Items

- Pasting required: Loader Blocks for `never-through`, `brunch-with-the-best`, `brunch-with-the-best-menu`, `restaurant-royalty`, `selected-works`, `butterfinger-100` and `people-not-profit` (Squarespace slug `/butterfinger-100th`). Streamathon loader unconfirmed.
- Butterfinger 100: Nina's role line not on the page yet (to add once she confirms). The $15,000 sweepstakes square was left out because the videos and banner say $10K.
- Selected Works: needs a Squarespace slug; six Substack article cards need their per-article URLs; covers came from screenshots and uploads, so higher-resolution originals would sharpen them.
- People Not Profit: the CTCP impact line carries the source phrasing "$150,000 person-years of treatment averted", which may need checking. The three booth pieces (Kito, Yazmin, Cram) are labeled only by name since the sources give no further description.
- Netlify mapping gaps: `people-not-profit`, `air-max-day`, `walmart-beautycon`, Restaurant Royalty, `brunch-with-the-best`, `ok-v-day`, and `selected-works` repo pages are not served by `site/build.py`. Rebuilding every `SQUARESPACE_ONLY` page is required before the domain switch.
- Content landing has no Restaurant Royalty card. Experiential landing Brunch row copy still says Super Bowl weekend and 13M organic views while the page itself now says 4.7 Billion earned media impressions.
- Experiential landing accordion "+" icon sits on its own line under each title (pre-existing). Landing copy still uses the phrase "case study" in the section heading and link text.
- Brunch: confirm header overlap fix on the live Squarespace header, Super Bowl Weekend year ('23 or '24), "Battalion" spelling on the menu page, Nomad tags, MGM activation content, Vimeo link `https://vimeo.com/1234630272` placement, restaurant detail accuracy on the review rail (eat. may have closed, Blondie's location least certain).
- Main Brunch page has no Hybrid Rollout section yet (only the menu page does).
- `the-footprint` files embed assets and are about 4 MB each.
- Several near-duplicate variants (`-v2`, `-pop`, `-pink`, `-magazine`, `-carousel`) remain in `pages/` as history.
