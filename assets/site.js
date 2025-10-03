window.addEventListener('DOMContentLoaded',()=>{if(window.feather&&window.feather.replace){window.feather.replace();}});
window.addEventListener('DOMContentLoaded',function(){try{document.querySelectorAll('.js-year').forEach(function(el){el.textContent=(new Date()).getFullYear();});}catch(e){}});

window.NLTP=function(id,start){try{var lb=document.getElementById('video-lightbox');var frame=document.getElementById('video-lightbox-frame');if(!lb||!frame)return;var qs='?autoplay=1&rel=0&modestbranding=1';if(typeof start==='number'&&start>0){qs+='&start='+Math.floor(start);}frame.src='https://www.youtube.com/embed/'+id+qs;lb.classList.remove('hidden');}catch(e){}}
window.NLTP_close=function(){try{var lb=document.getElementById('video-lightbox');var frame=document.getElementById('video-lightbox-frame');if(lb)lb.classList.add('hidden');if(frame)frame.src='';}catch(e){}}
document.addEventListener('keydown',function(e){ if(e.key==='Escape') NLTP_close(); });
window.addEventListener('DOMContentLoaded',function(){ if(window.feather&&feather.replace)feather.replace(); document.querySelectorAll('.js-year').forEach(function(el){el.textContent=(new Date()).getFullYear();}); });
