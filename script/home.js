// ─── DATA ───────────────────────────────────────────────────────────────────
const API_URL = '../api/product.json'; // local JSON file

const categories = [
  { id: 'all',      label: 'Semua',    emoji: '🍽' },
  { id: 'makanan',  label: 'Makanan',  emoji: '🍳' },
  { id: 'minuman',  label: 'Minuman',  emoji: '🥤' },
  { id: 'cemilan',  label: 'Cemilan',  emoji: '🍿' },
];

let allProducts = [];
let cart = [];
let activeCategory = 'all';

// ─── FETCH PRODUCTS ──────────────────────────────────────────────────────────
async function fetchProducts() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('HTTP error ' + res.status);
    allProducts = await res.json();
  } catch (e) {
    // Fallback hardcoded data if fetch fails (for demo)
    allProducts = [
      { id:1, title:'Mie Goreng',    price:5000,  category:'makanan', image:'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300&q=80' },
      { id:2, title:'Bakso',         price:10000, category:'makanan', image:'https://images.unsplash.com/photo-1562802378-063ec186a863?w=300&q=80' },
      { id:3, title:'Nasi Goreng',   price:10000, category:'makanan', image:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&q=80' },
      { id:4, title:'Es Teh Manis',  price:5000,  category:'minuman', image:'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&q=80' },
      { id:5, title:'Jus Alpukat',   price:15000, category:'minuman', image:'https://images.unsplash.com/photo-1623065422902-30a2d299bbe4?w=300&q=80' },
      { id:6, title:'Keripik Pedas', price:8000,  category:'cemilan', image:'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=300&q=80' },
      { id:7, title:'Sate Ayam',     price:18000, category:'makanan', image:'https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=300&q=80' },
      { id:8, title:'Pisang Goreng', price:7000,  category:'cemilan', image:'https://images.unsplash.com/photo-1571680322279-a226e6a4cc2a?w=300&q=80' },
      { id:9, title:'Kopi Susu',     price:12000, category:'minuman', image:'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&q=80' },
      { id:10,title:'Gado-gado',     price:13000, category:'makanan', image:'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&q=80' },
    ];
  }
  renderProducts(allProducts);
}

// ─── RENDER CATEGORIES ───────────────────────────────────────────────────────
function renderCategories() {
  const list = document.getElementById('categoryList');
  list.innerHTML = categories.map(c => `
    <button onclick="setCategory('${c.id}')" id="cat-${c.id}"
      class="category-card shrink-0 flex flex-col items-center gap-1.5 px-5 py-3 rounded-2xl border-2 cursor-pointer ${c.id==='all'?'border-primary bg-orange-50':'border-gray-100 bg-white'} text-sm font-semibold text-dark">
      <span class="text-2xl">${c.emoji}</span>
      <span class="${c.id==='all'?'text-primary':''}">${c.label}</span>
    </button>
  `).join('');
}

function setCategory(id) {
  activeCategory = id;
  // Update button styles
  categories.forEach(c => {
    const btn = document.getElementById('cat-'+c.id);
    if(c.id===id) { btn.classList.add('border-primary','bg-orange-50'); btn.querySelector('span:last-child').classList.add('text-primary'); }
    else { btn.classList.remove('border-primary','bg-orange-50'); btn.querySelector('span:last-child').classList.remove('text-primary'); }
  });
  filterProducts();
}

// ─── RENDER PRODUCTS ─────────────────────────────────────────────────────────
function renderProducts(products) {
  const grid = document.getElementById('productGrid');
  if (!products.length) {
    grid.innerHTML = `<div class="col-span-5 text-center text-gray-400 py-12 text-sm">Produk tidak ditemukan 😢</div>`;
    return;
  }
  grid.innerHTML = products.map(p => `
    <div class="product-card bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer border border-gray-50" onclick="addToCart(${p.id})">
      <div class="relative h-28 overflow-hidden bg-orange-50">
        <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover transition duration-300 hover:scale-105" loading="lazy"
          onerror="this.src='https://via.placeholder.com/200x120/FFF7ED/F97316?text=🍽'"/>
        <div class="absolute top-2 right-2 bg-white/90 backdrop-blur text-primary text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
          ${p.category}
        </div>
      </div>
      <div class="p-3">
        <p class="font-semibold text-sm text-dark truncate">${p.title}</p>
        <p class="text-primary font-bold text-sm mt-0.5">${formatRp(p.price)}</p>
        <button class="mt-2 w-full bg-orange-50 hover:bg-primary hover:text-white text-primary text-xs font-bold py-1.5 rounded-xl transition duration-200">
          + Keranjang
        </button>
      </div>
    </div>
  `).join('');
}

function filterProducts() {
  const q = document.getElementById('searchInput').value.toLowerCase();
  let filtered = allProducts;
  if (activeCategory !== 'all') filtered = filtered.filter(p => p.category === activeCategory);
  if (q) filtered = filtered.filter(p => p.title.toLowerCase().includes(q));
  document.getElementById('productTitle').textContent =
    q ? `Hasil: "${q}"` : activeCategory === 'all' ? 'Menu Populer' : categories.find(c=>c.id===activeCategory)?.label ?? 'Menu';
  renderProducts(filtered);
}

// ─── CART ────────────────────────────────────────────────────────────────────
function addToCart(id) {
  const p = allProducts.find(x => x.id === id);
  if (!p) return;
  const exists = cart.find(x => x.id === id);
  if (exists) exists.qty++;
  else cart.push({ ...p, qty: 1 });
  updateCartUI();
  showToast(`${p.title} ditambahkan ✓`);
}

function updateCartUI() {
  const badge = document.getElementById('cartBadge');
  const total = cart.reduce((s,x)=>s+x.price*x.qty,0);
  const count = cart.reduce((s,x)=>s+x.qty,0);

  badge.textContent = count;
  badge.classList.toggle('hidden', count === 0);
  document.getElementById('cartTotal').textContent = formatRp(total);

  const items = document.getElementById('cartItems');
  if (!cart.length) {
    items.innerHTML = `<p class="text-center text-gray-400 text-sm mt-10">Keranjang masih kosong 🍽</p>`;
    return;
  }
  items.innerHTML = cart.map(x => `
    <div class="flex items-center gap-3 bg-gray-50 rounded-xl p-2">
      <img src="${x.image}" class="w-12 h-12 rounded-xl object-cover bg-orange-100" onerror="this.src='https://via.placeholder.com/48/FFF7ED/F97316?text=🍽'"/>
      <div class="flex-1 min-w-0">
        <p class="text-xs font-semibold truncate">${x.title}</p>
        <p class="text-primary text-xs font-bold">${formatRp(x.price)}</p>
      </div>
      <div class="flex items-center gap-1">
        <button onclick="changeQty(${x.id},-1)" class="w-6 h-6 rounded-lg bg-orange-100 text-primary font-bold text-sm flex items-center justify-center hover:bg-primary hover:text-white transition">−</button>
        <span class="text-xs font-bold w-5 text-center">${x.qty}</span>
        <button onclick="changeQty(${x.id},1)" class="w-6 h-6 rounded-lg bg-orange-100 text-primary font-bold text-sm flex items-center justify-center hover:bg-primary hover:text-white transition">+</button>
      </div>
    </div>
  `).join('');
}

function changeQty(id, delta) {
  const idx = cart.findIndex(x=>x.id===id);
  if (idx<0) return;
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx,1);
  updateCartUI();
}

function toggleCart() {
  const panel = document.getElementById('cartPanel');
  panel.classList.toggle('hidden');
}

// ─── UTILS ───────────────────────────────────────────────────────────────────
function formatRp(n) {
  return 'Rp ' + n.toLocaleString('id-ID');
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.opacity = '1';
  setTimeout(()=>{ t.style.opacity='0'; }, 2000);
}

// ─── INIT ────────────────────────────────────────────────────────────────────
renderCategories();
fetchProducts();