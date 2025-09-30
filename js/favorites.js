// Favoriler sayfası işlevi
fetch('products.json').then(r=>r.json()).then(list=>{
  const favs = JSON.parse(localStorage.getItem('luxfavs')||'[]');
  const root = document.getElementById('favorites-root');
  if(!favs.length){root.innerHTML='<p>Favori ürününüz yok.</p>';return;}
  const favProducts = list.filter(p=>favs.includes(p.id));
  favProducts.forEach(p=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.style.maxWidth = '340px';
    card.style.marginBottom = '18px';
    card.innerHTML = `<div class='media'><img src='${p.image}' alt='${p.name}'/></div><div class='card-body'><h3 class='title'>${p.name}</h3><div class='price'>${p.price.toLocaleString('tr-TR',{style:'currency',currency:'TRY'})}</div><a class='btn' href='product.html?id=${p.id}'>İncele</a></div>`;
    root.appendChild(card);
  });
});
