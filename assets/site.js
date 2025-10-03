window.addEventListener('DOMContentLoaded',()=>{if(window.feather&&window.feather.replace){window.feather.replace();}});
window.addEventListener('DOMContentLoaded',function(){try{document.querySelectorAll('.js-year').forEach(function(el){el.textContent=(new Date()).getFullYear();});}catch(e){}});
