// Responsive hamburger menü
const menuBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if(menuBtn && nav){
  menuBtn.onclick = ()=>{
    nav.classList.toggle('open');
  };
  window.addEventListener('click',e=>{
    if(!nav.contains(e.target) && e.target!==menuBtn) nav.classList.remove('open');
  });
}
