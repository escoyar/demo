const params = new URLSearchParams(location.search);
const id = Number(params.get('id'));
fetch('products.json').then(r=>r.json()).then(list=>{
	const p = list.find(x=>x.id===id);
	const root=document.getElementById('product-root');
	if(!p){root.textContent='Ürün bulunamadı.';return}
	// Galeri
	const gallery = document.createElement('div');
	gallery.className = 'product-gallery';
	const mainImg = document.createElement('img');
	mainImg.src = p.image || '';
	mainImg.alt = p.name;
	mainImg.style.width = '100%';
	mainImg.style.maxHeight = '420px';
	mainImg.style.objectFit = 'cover';
	gallery.appendChild(mainImg);
	// Favori butonu
	const favBtn = document.createElement('button');
	favBtn.textContent = '❤ Favorilere Ekle';
	favBtn.className = 'btn';
	favBtn.style.marginLeft = '18px';
	favBtn.onclick = ()=>{
		let favs = JSON.parse(localStorage.getItem('luxfavs')||'[]');
		if(!favs.includes(p.id)) favs.push(p.id);
		localStorage.setItem('luxfavs',JSON.stringify(favs));
		favBtn.textContent = 'Favorilerde!';
		favBtn.disabled = true;
	};
	// Hızlı bakış
	const quickBtn = document.createElement('button');
	quickBtn.textContent = 'Hızlı Bakış';
	quickBtn.className = 'btn';
	quickBtn.style.marginLeft = '18px';
	quickBtn.onclick = ()=>{
		const modal = document.getElementById('quickview-modal');
		const content = document.getElementById('quickview-content');
		content.innerHTML = `<h2>${p.name}</h2><img src='${p.image}' style='width:100%;max-width:400px'><p>${p.description}</p><div class='price'>${p.price.toLocaleString('tr-TR',{style:'currency',currency:'TRY'})}</div>`;
		modal.style.display = 'block';
	};
	// Modal kapama
	document.querySelector('.close-modal').onclick = ()=>{
		document.getElementById('quickview-modal').style.display = 'none';
	};
	// Diğer detaylar
	const title = document.createElement('h1');title.textContent=p.name;
	const price = document.createElement('div');price.className='price';price.textContent = p.price.toLocaleString('tr-TR',{style:'currency',currency:'TRY'});
	const desc = document.createElement('p');desc.textContent=p.description;
	const btn = document.createElement('button');btn.textContent='Sepete Ekle';btn.className='btn';btn.style.marginTop='12px';
	btn.addEventListener('click',()=>{
		const cart = JSON.parse(localStorage.getItem('luxcart-v1')||'[]');
		const existing = cart.find(i=>i.id===p.id);
		if(existing){existing.qty+=1}else{cart.push({id:p.id,qty:1,price:p.price,name:p.name})}
		localStorage.setItem('luxcart-v1',JSON.stringify(cart));
		alert('Sepete eklendi');
		document.getElementById('cart-count').textContent = cart.reduce((s,i)=>s+i.qty,0)
	});
	root.appendChild(gallery);
	root.appendChild(title);
	root.appendChild(price);
	root.appendChild(desc);
	root.appendChild(btn);
	root.appendChild(favBtn);
	root.appendChild(quickBtn);
	document.getElementById('cart-count').textContent = JSON.parse(localStorage.getItem('luxcart-v1')||'[]').reduce((s,i)=>s+i.qty,0);
}).catch(e=>{document.getElementById('product-root').textContent='Ürün yüklenemedi.'})