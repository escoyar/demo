// Basit slider scripti
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');
let current = 0;

function showSlide(idx) {
  slides.forEach((s, i) => s.classList.toggle('active', i === idx));
}
function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}
function prevSlide() {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
}
if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', prevSlide);
  nextBtn.addEventListener('click', nextSlide);
  setInterval(nextSlide, 6000);
}
showSlide(current);
