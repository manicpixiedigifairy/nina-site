# OK SB vote API

Tiny Netlify Function that stores the four vote tallies for the Team Store poll.

1. Deploy this folder as its own Netlify site.
2. Copy the function URL, `https://<site>.netlify.app/api/ok-sb-vote`.
3. Paste it into `data-vote-api=""` on the root `<div class="ob" id="ob">` in `pages/ok-sb.html`.

Until that attribute is filled in, the voting buttons stay hidden on the page.
