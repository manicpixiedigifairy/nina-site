# Portfolio Giveaway

A free first portfolio site or portfolio makeover, offered as a creative exchange project.

## Pages
- `index.html`: the giveaway page (About The Project, The Process, About Me, Getting Started, the application form, FAQ)
- `work/index.html`: Selected Work, which loads the live Tommy Hilfiger, Froot Loops and Pizza Hut case study pages from the repos
- `assets/`: illustrations used as accents

## Where it runs
- **Netlify:** deploys this folder as its own site (published by `build.sh` at the repo root for the portfoliogiveaway project).
- **byninaaustin.com:** `loaders/portfolio-giveaway.loader.html` pulls the same files into a Squarespace Code Block.

## Applications
The form sends each application to a Make webhook, and the Make scenario "Portfolio Giveaway: applications to Notion" adds it as a row in the Notion database Portfolio Giveaway Submissions (Status: New, Consult Status: Requested).

## Consultation times
Set in `index.html` under `AVAILABILITY`: Fridays 4 to 6 pm and Saturdays 4 to 5 pm, Eastern time, 30-minute starts, 24 hours' notice, 60 days out.
