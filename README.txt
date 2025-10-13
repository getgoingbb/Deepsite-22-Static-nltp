
Never Leave The Playground — Option 2 (no Tailwind CDN) — v4
Updated: 2025-10-13T18:57:29

What's in this ZIP:
- site.css            (Tailwind-lite utilities + component polish; includes "Version: v4" banner)
- index.html          (links /site.css?v=4)
- our-videos.html     (links /site.css?v=4)
- science.html        (links /site.css?v=4)
- video-sitemap.xml   (convenience copy)
- robots.txt          (convenience copy)

Deploy steps:
1) Upload/replace these files at your site root.
2) Visit https://neverleavetheplayground.com/site.css?v=4 and confirm it shows the v4 banner and utility classes (.px-4, .grid, .md\:grid-cols-2).
3) Hard refresh each page (Shift+Reload).

Suggested commit message:
"v4: Remove Tailwind CDN; use Tailwind-lite site.css; update HTML to /site.css?v=4; add video sitemap + robots"
