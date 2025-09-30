// Basit yardımcı işlevler
export function formatCurrency(v){return v.toLocaleString('tr-TR',{style:'currency',currency:'TRY'})}
export function getCart(){return JSON.parse(localStorage.getItem('luxcart-v1')||'[]')}
export function setCart(c){localStorage.setItem('luxcart-v1',JSON.stringify(c))}