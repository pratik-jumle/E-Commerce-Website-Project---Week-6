
const PRODUCTS = [{"id": "e1", "category": "electronics", "name": "Wireless Headphones", "price": 4599, "img": "images/products/electronics/e1.jpg"}, {"id": "e2", "category": "electronics", "name": "Smartwatch Pro", "price": 8999, "img": "images/products/electronics/e2.jpg"}, {"id": "e3", "category": "electronics", "name": "Bluetooth Speaker", "price": 3499, "img": "images/products/electronics/e3.jpg"}, {"id": "e4", "category": "electronics", "name": "4K Action Camera", "price": 12499, "img": "images/products/electronics/e4.jpg"}, {"id": "f1", "category": "fashion", "name": "Men's Casual Shirt", "price": 799, "img": "images/products/fashion/f1.jpg"}, {"id": "f2", "category": "fashion", "name": "Women's Kurta Set", "price": 1299, "img": "images/products/fashion/f2.jpg"}, {"id": "f3", "category": "fashion", "name": "Running Shoes", "price": 2599, "img": "images/products/fashion/f3.jpg"}, {"id": "h1", "category": "home", "name": "Non-stick Cookware Set", "price": 3999, "img": "images/products/home/h1.jpg"}, {"id": "h2", "category": "home", "name": "LED Desk Lamp", "price": 899, "img": "images/products/home/h2.jpg"}, {"id": "h3", "category": "home", "name": "Memory Foam Pillow", "price": 1499, "img": "images/products/home/h3.jpg"}, {"id": "s1", "category": "services", "name": "Home Cleaning (2BHK)", "price": 1999, "img": "images/products/services/s1.jpg"}, {"id": "s2", "category": "services", "name": "AC Service & Repair", "price": 899, "img": "images/products/services/s2.jpg"}, {"id": "s3", "category": "services", "name": "Plumbing Fix (Per Visit)", "price": 799, "img": "images/products/services/s3.jpg"}];

// Helper - render a product card
function makeCard(p){
  return `<div class="card">
    <img src="${p.img}" alt="${p.name}">
    <div class="card-body">
      <div class="title">${p.name}</div>
      <div class="desc">Category: ${p.category}</div>
      <div class="price">₹${p.price}</div>
      <div class="actions">
        <button class="btn" onclick='addToCart("${p.id}")'>Add to Cart</button>
        <button class="btn secondary" onclick='viewDetails("${p.id}")'>Details</button>
      </div>
    </div>
  </div>`;
}

function populate(){
  const groups = {
    electronics: document.getElementById('electronics-grid'),
    fashion: document.getElementById('fashion-grid'),
    home: document.getElementById('home-grid'),
    services: document.getElementById('services-grid')
  };
  PRODUCTS.forEach(p=>{
    const el = document.createElement('div');
    el.innerHTML = makeCard(p);
    groups[p.category].appendChild(el.firstElementChild);
  });
  updateCartCount();
}

function addToCart(id){
  const p = PRODUCTS.find(x=>x.id===id);
  const cart = JSON.parse(localStorage.getItem('cart')||'[]');
  cart.push(p);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert(p.name + ' added to cart');
}

function viewDetails(id){
  const p = PRODUCTS.find(x=>x.id===id);
  alert(p.name + "\n\nPrice: ₹" + p.price + "\nCategory: " + p.category);
}

function updateCartCount(){
  const cart = JSON.parse(localStorage.getItem('cart')||'[]');
  document.querySelectorAll('#cart-count').forEach(el=>el.textContent = cart.length);
}

document.addEventListener('DOMContentLoaded', ()=>{
  populate();
  // hero slider
  let i=0; const slides = document.querySelectorAll('.hero-slider img');
  setInterval(()=>{
    slides.forEach(s=>s.classList.remove('active'));
    i = (i+1)%slides.length;
    slides[i].classList.add('active');
  },3500);

  // category click filter
  document.querySelectorAll('.category-row a').forEach(a=>a.addEventListener('click', (e)=>{
    e.preventDefault();
    const cat = a.dataset.cat;
    if(cat==='all'){ document.querySelectorAll('.products-section').forEach(s=>s.style.display='block'); return; }
    document.querySelectorAll('.products-section').forEach(s=>s.style.display='none');
    document.getElementById(cat+'-section').style.display='block';
  }));

  // search
  document.getElementById('search-btn').addEventListener('click', ()=>{
    const q = document.getElementById('search-input').value.toLowerCase();
    if(!q) return populate();
    document.querySelectorAll('.product-grid').forEach(g=>g.innerHTML='');
    const filtered = PRODUCTS.filter(p=>p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
    filtered.forEach(p=>{
      const wrap = document.getElementById(p.category+'-grid');
      const el = document.createElement('div'); el.innerHTML = makeCard(p);
      wrap.appendChild(el.firstElementChild);
    });
  });

});
