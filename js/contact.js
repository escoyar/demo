// İletişim formu demo
const form = document.getElementById('contact-form');
const result = document.getElementById('contact-result');
if(form){
  form.onsubmit = function(e){
    e.preventDefault();
    result.textContent = 'Mesajınız başarıyla iletildi! (Demo)';
    form.reset();
  }
}
