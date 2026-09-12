# hankhay.es

Hank's personal site: a hand-written static portfolio. Hosted on Azure Static Web Apps
at https://hankhay.es, sources on GitHub at `hankhayes/hankhay.es`.

## The one thing to know

There is no build step, no package manager, no framework, and no dependencies. The
repo *is* the deployed site — the files you edit are the files that get served. Keep it
that way. Don't introduce npm, a bundler, a static-site generator, or a CSS
preprocessor unless Hank explicitly asks; "lightweight" is the point of this project,
not an accident of it.

To preview, open the HTML file in a browser. That's the whole dev loop.

    open index.html

## Layout

    index.html            Single-page hub: work, education, projects, reading, links
    pages/                Standalone content pages (now, reading, about, oldindex)
    projects/             One page per project + projects.html as the index
    images/               Photos, screencaps, logos; images/titles/ holds OG preview cards
    scripts/isMobile.js   The site's only JavaScript
    .github/workflows/    Azure deploy

`pages/oldindex.html` is a retired version of the homepage, kept for reference and
linked from nowhere. `pages/about.html` is finished but unlinked — the entry in
`index.html` is commented out. `projects/hankhayesdotcom.html` is similarly orphaned
(only `oldindex.html` links to it). Leave them be unless asked; they're archives.

## Styling

Tailwind comes from `cdn.tailwindcss.com` and Inter from `rsms.me/inter` — both loaded
per-page in `<head>`. Every page also links a `style.css` that **does not exist** and
never has; the 404 is harmless and all real styling is Tailwind utility classes. Either
leave the tag alone or delete it from all 13 pages at once, but don't create a
`style.css` just to satisfy it.

Dark mode uses Tailwind's default `media` strategy — `dark:` variants follow the OS
setting. There is no toggle and no persistence. The palette is deliberately minimal:
`bg-white dark:bg-black`, `text-black dark:text-white`, `border-neutral-100
dark:border-neutral-800`, and opacity (`opacity-40`, `opacity-60`) for hierarchy rather
than extra colors. Match that when adding anything.

## The page template

Every page under `pages/` and `projects/` follows the same skeleton, and new ones
should be copied from an existing sibling rather than written from scratch:

    #hero          Name + tagline, links back to ../index.html
    #info          Wrapper around div#titleContainer.resizable — page title + <hr>
    #body          Wrapper around div#bodyContainer.resizable — the content
    <script src="../scripts/isMobile.js"></script>   last line before </body>

Also per page: `<title>`, `<meta name="description">`, and the matching `og:`/`twitter:`
tags pointing at an image in `images/titles/`.

Note that `.resizable` is not defined anywhere — not in Tailwind, not in the missing
`style.css`. It's a leftover marker class. The actual width control is `isMobile.js`
assigning inline `maxWidth`.

### isMobile.js has a live bug — read before touching layout

The script sets `maxWidth` on four containers (50%/60% on desktop, 100% on mobile), but
it dereferences all four unconditionally:

    imageElement.style.maxWidth = '...';   // throws if #imageContainer is absent

Only `projects/orgsync.html` actually has all four containers. Everywhere else the
script throws a TypeError partway through. Title and body are assigned before the
throw, so the page looks right and the breakage is invisible — but on
`projects/colormeup.html` and `projects/vikingshipkayaks.html`, which have a
`#videoContainer` but no `#imageContainer`, the video sizing is silently never applied.

If you touch this file, null-check each element. Be aware that fixing it will make
those two videos change size, which is the correct behavior but is a visible change.

## Deploying

Push to `main`. `.github/workflows/azure-static-web-apps-gentle-wave-04c779210.yml`
picks it up and uploads the repo root as-is (`app_location: "/"`, no build). PRs against
main get preview deployments, torn down on close. That workflow is the only one in the
repo and the only thing that deploys — don't add a second deploy path.

## Adding a project

1. Copy the closest existing page in `projects/` and edit the content.
2. Add an entry to `projects/projects.html` (title + one-line description).
3. Optionally feature it in the `#projects` list in `index.html` — that list is a
   curated subset, not the full set.
4. Update the "See all (N)" count in `index.html` to match `projects.html`.
5. Add an OG card to `images/titles/` and point the meta tags at it.

## History and gotchas

**index.html is machine-reformatted.** A retired Goodreads scraper round-tripped it
through BeautifulSoup on every run, which alphabetized every attribute
(`<meta content="..." name="...">`) and flattened the indentation. That's why it reads
differently from the hand-written pages under `pages/` and `projects/`. Reformatting it
back is a ~200-line diff that would bury any real change, so make targeted edits and
leave the surrounding formatting alone.

**The "Currently reading" block in index.html is now static.** It used to be rewritten
nightly by that scraper (`goodreads_scraper.py` + an `update-reading.yml` workflow,
removed 2026-09-12 — the "Update currently reading books [automated]" commits are its
history). The markup under `ul#reading` is still there and still renders, but nothing
updates it now; edit it by hand, same as `pages/reading.html`, which was always manual
and does not share content with it.

**Two referenced images are missing:** `images/hankhayesdotcomtitle.png` and
`images/titles/og.png`. Both are OG preview cards, so the only symptom is a broken
social embed on those pages.
