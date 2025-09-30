// Basit SPA-benzeri statik site scripti
const productsUrl = 'products.json';
let PRODUCTS = [];
const cartKey = 'luxcart-v1';

function loadJSON(url){return fetch(url).then(r=>r.json())}

function uidToColor(id){const colors=['#d6c6f5','#f5d6d6','#d6f5e1','#f5efd6','#d6e4f5'];return colors[id % colors.length]}

function svgDataURI(text,color){const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600'><rect width='100%' height='100%' fill='${color}'/><text x='50%' y='50%' font-size='36' text-anchor='middle' fill='#222' font-family='Arial' dy='.35em'>${text}</text></svg>`; return 'data:image/svg+xml;utf8,'+encodeURIComponent(svg)}

function renderProducts(list){
  const root = document.getElementById('products');
  root.innerHTML='';
  list.forEach(p=>{
    const card = document.createElement('article');card.className='card';
    const media = document.createElement('div');media.className='media';
    const img = document.createElement('img');img.alt = p.name;
    img.src = p.image ? p.image : svgDataURI(p.name, uidToColor(p.id));
    img.loading = 'lazy';
    media.appendChild(img);
    const body = document.createElement('div');body.className='card-body';
    const title = document.createElement('h3');title.className='title';title.textContent=p.name;
    const price = document.createElement('div');price.className='price';price.textContent = p.price.toLocaleString('tr-TR',{style:'currency',currency:'TRY'});
    const a = document.createElement('a');a.href = `product.html?id=${p.id}`;a.textContent='İncele';a.className='btn';a.style.marginTop='10px';
    body.appendChild(title); body.appendChild(price); body.appendChild(a);
    card.appendChild(media);card.appendChild(body);
    root.appendChild(card);
  })
}

function populateCategories(list){const sel = document.getElementById('category-filter');
 const cats = Array.from(new Set(list.map(p=>p.category)));
 cats.forEach(c=>{const opt=document.createElement('option');opt.value=c;opt.textContent=c;sel.appendChild(opt)});
}

function setupSearch(){const input = document.getElementById('search');const sel = document.getElementById('category-filter');
 function apply(){const q = input.value.trim().toLowerCase();const c = sel.value;const filtered = PRODUCTS.filter(p => (p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)) && (c? p.category===c:true));renderProducts(filtered)}
 input.addEventListener('input',apply);sel.addEventListener('change',apply);
}

function cartCount(){const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');const count = cart.reduce((s,i)=>s+i.qty,0);document.getElementById('cart-count').textContent=count}

function init(){loadJSON(productsUrl).then(data=>{PRODUCTS=data;renderProducts(data);populateCategories(data);setupSearch();cartCount()}).catch(err=>{console.error(err);document.getElementById('products').textContent='Ürün yüklenemedi.'})}

init();