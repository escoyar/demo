# LuxuryFashion-lite

Bu proje, `beymen.com` ve `vakko.com` gibi yüksek uç moda sitelerinden ilham alarak hazırlanmış, tamamen statik ve çalışır bir e-ticaret örneğidir.

Özellikler:
- Anasayfa, kategori listesi, ürün detay sayfas, sepet ve basit checkout.
- Ürün verileri `products.json` içinde. Resimler SVG data URI ile oluşturuluyor, harici ağ çağrısı gerekmiyor.
- Sepet localStorage üzerinde tutulur.

Nasıl çalıştırılır (PowerShell):

1) Basit bir HTTP sunucusu ile (ör. Python):

```powershell
cd "c:\Users\micky\OneDrive\Masaüstü\website1"
python -m http.server 5173
# Tarayıcıda: http://localhost:5173
```

2) GitHub'a yüklemek ve GitHub Pages ile yayınlamak için:

```powershell
cd "c:\Users\micky\OneDrive\Masaüstü\website1"
git init
git add .
git commit -m "Initial site"
# create a repo on GitHub, then:
git remote add origin https://github.com/<kullanici>/<repo>.git
git branch -M main
git push -u origin main
```

README içinde daha fazla deploy notu ve test talimatı var.

Telif: Bu proje tamamen orijinal içerik ve tasarım öğeleri kullanır; başka sitelerin özgün tasarım veya kaynak kodunun kopyalanmasından kaçınıldı.
