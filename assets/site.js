window.addEventListener('DOMContentLoaded',()=>{if(window.feather&&window.feather.replace){window.feather.replace();}});
window.addEventListener('DOMContentLoaded',function(){try{document.querySelectorAll('.js-year').forEach(function(el){el.textContent=(new Date()).getFullYear();});}catch(e){}});


// Simple video lightbox
(function(){
  function openLightbox(id){
    var lb=document.getElementById('video-lightbox'); 
    var frame=document.getElementById('video-lightbox-frame');
    if(!lb||!frame) return;
    frame.src='https://www.youtube.com/embed/'+id+'?autoplay=1&rel=0';
    lb.classList.remove('hidden');
  }
  function closeLightbox(){
    var lb=document.getElementById('video-lightbox'); 
    var frame=document.getElementById('video-lightbox-frame');
    if(lb) lb.classList.add('hidden');
    if(frame) frame.src='';
  }
  window.NLTP=openLightbox;
  window.NLTP_close=closeLightbox;
  document.addEventListener('keydown',function(e){ if(e.key==='Escape') NLTP_close(); });
})();
