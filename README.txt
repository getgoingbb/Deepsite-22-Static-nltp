Never Leave The Playground — Full Site Bundle (v5)
Upload everything to your site root.

Key files
- site-v5.css  (primary stylesheet; pages link to this)
- site.css     (alias, in case an old page still references it)
- index.html, our-videos.html (+ folder route), science.html (+ folder route), activities.html (+ folder route), news.html (+ folder route)
- robots.txt, sitemap.xml, video-sitemap.xml

After upload
1) Visit /site-v5.css — confirm it loads (shows “Version: v5” comment).
2) Hard refresh your pages (Shift+Reload). If CSS still doesn’t load, ensure your HTML <head> includes: <link rel="stylesheet" href="site-v5.css" />
3) If your server requires absolute paths, change to href="/site-v5.css".
