
Never Leave The Playground — Option 2 (no Tailwind CDN)
Updated: 2025-10-13T00:50:59

Files changed:
- site.css            (Tailwind-lite utilities + component polish)
- index.html          (removed Tailwind CDN; linked /site.css?v=3)
- our-videos.html     (removed Tailwind CDN; linked /site.css?v=3)
- science.html        (removed Tailwind CDN; linked /site.css?v=3)
- video-sitemap.xml   (from earlier step; included for convenience)
- robots.txt          (from earlier step; included for convenience)

Deploy steps:
1) Upload/replace these files at your site root.
2) Hard refresh pages (Shift+Reload).
3) Verify https://neverleavetheplayground.com/site.css loads and includes utilities like .px-4, .grid.

Suggested commit message:
"Remove Tailwind CDN; add Tailwind-lite site.css; update HTML pages; include video sitemap + robots"
