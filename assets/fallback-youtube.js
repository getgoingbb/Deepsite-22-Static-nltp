
(function(){
  const makeIframe = (id, params="") => {
    const iframe = document.createElement('iframe');
    iframe.src = "https://www.youtube-nocookie.com/embed/" + id + (params?("?" + params):"");
    iframe.title = "YouTube video";
    iframe.loading = "lazy";
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    iframe.allowFullscreen = true;
    return iframe;
  };
  document.querySelectorAll('[data-youtube-id]').forEach(el => {
    const id = el.getAttribute('data-youtube-id');
    if(!id) return;
    if(el.querySelector('iframe')) return;
    el.classList.add('video-frame','aspect-video');
    const img = new Image();
    img.src = "https://img.youtube.com/vi/" + id + "/hqdefault.jpg";
    img.alt = "Video thumbnail";
    img.style.width = "100%"; img.style.height = "100%"; img.style.objectFit = "cover";
    const btn = document.createElement('button');
    btn.textContent = "▶ Play";
    btn.className = "btn";
    btn.style.position = "absolute";
    btn.style.inset = "auto auto 1rem 1rem";
    el.style.position = "relative";
    el.appendChild(img); el.appendChild(btn);
    el.addEventListener('click', ()=>{ el.innerHTML=""; el.appendChild(makeIframe(id)); }, {once:true});
  });
})();
