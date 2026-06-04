// ==================== محصولات ====================
var products = [
    {
        id: 1,
        name: '______',
        desc: '______',
        price: ______,
        oldPrice: ______,
        image: 'images/______.jpg',
        cat: '______',
        rating: 5,
        reviews: 0,
        stock: true,
        featured: true
    }
];

// ==================== وضعیت ====================
var cart = JSON.parse(localStorage.getItem('farhanCart') || '[]');
var favorites = JSON.parse(localStorage.getItem('farhanFav') || '[]');
var currentCat = 'all';
var visitorCount = localStorage.getItem('farhanVisitors') || 0;
visitorCount++;
localStorage.setItem('farhanVisitors', visitorCount);

// ==================== اجرای اولیه ====================
buildHeader();
buildSlider();
buildCategories();
buildFilters();
buildFooter();
renderProducts();
updateCartUI();
showNotification('👋 ______');

// ==================== نوتیفیکیشن ====================
function showNotification(msg) {
    var notif = document.getElementById('notification');
    notif.textContent = msg;
    notif.classList.add('show');
    setTimeout(function() { notif.classList.remove('show'); }, 3000);
}

// ==================== ساخت هدر ====================
function buildHeader() {
    document.getElementById('header').innerHTML = 
        '<a href="#" class="logo">🛒 ______</a>' +
        '<div class="search-box">' +
            '<input type="text" id="searchInput" placeholder="🔍 ______" onkeypress="if(event.key===\'Enter\') searchProducts()">' +
            '<button onclick="searchProducts()">🔍</button>' +
        '</div>' +
        '<div class="header-icons">' +
            '<button class="icon-btn" title="______">❤️<span class="badge" id="favCount">0</span></button>' +
            '<button class="icon-btn" onclick="openCart()" title="______">🛒<span class="badge" id="cartCount">0</span></button>' +
            '<span class="visitor-count">👁️ ' + visitorCount + '</span>' +
        '</div>';
}

// ==================== ساخت اسلایدر ====================
function buildSlider() {
    var featured = products.filter(function(p) { return p.featured; });
    if (featured.length === 0) featured = products.slice(0, 3);
    
    document.getElementById('mainSlider').innerHTML = 
        '<div class="slider-container">' +
            '<h2>🎉 ______</h2>' +
            '<p>______</p>' +
            '<div class="slider-items">' + featured.map(function(p) {
                return '<div class="slider-item"><img src="' + p.image + '" alt="' + p.name + '"><div class="slider-info"><h3>' + p.name + '</h3><p>' + p.price.toLocaleString('fa-IR') + ' تومان</p></div></div>';
            }).join('') + '</div>' +
        '</div>';
}

// ==================== ساخت دسته‌بندی ====================
function buildCategories() {
    var cats = [
        { id: 'all', name: 'همه', icon: '🏠' },
        { id: 'cake', name: '______', icon: '🎂' },
        { id: 'food', name: '______', icon: '🍔' },
        { id: 'handmade', name: '______', icon: '🧵' },
        { id: 'jam', name: '______', icon: '🍯' }
    ];
    
    document.getElementById('catNav').innerHTML = cats.map(function(c) {
        return '<div class="cat-item ' + (c.id === 'all' ? 'active' : '') + '" onclick="filterCategory(\'' + c.id + '\')">' +
            '<span class="cat-icon">' + c.icon + '</span>' + c.name + '</div>';
    }).join('');
}

// ==================== ساخت فیلترها ====================
function buildFilters() {
    document.getElementById('filters').innerHTML =
        '<h3>⚙️ ______</h3>' +
        '<div class="filter-group"><h4>______</h4>' +
            '<label><input type="checkbox" checked> همه</label>' +
            '<label><input type="checkbox"> ______</label>' +
            '<label><input type="checkbox"> ______</label>' +
            '<label><input type="checkbox"> ______</label>' +
            '<label><input type="checkbox"> ______</label></div>' +
        '<div class="filter-group"><h4>______</h4><div class="price-range"><input type="number" id="priceFrom" placeholder="از"><span>-</span><input type="number" id="priceTo" placeholder="تا"></div></div>' +
        '<button class="filter-btn" onclick="applyFilters()">🔍 ______</button>';
    
    document.getElementById('productsHeader').innerHTML =
        '<span>📦 <strong id="productCount">0</strong> ______</span>' +
        '<select class="sort-select" onchange="sortProducts(this.value)">' +
            '<option value="default">______</option>' +
            '<option value="cheapest">______</option>' +
            '<option value="expensive">______</option>' +
            '<option value="popular">______</option></select>';
}

// ==================== ساخت فوتر ====================
function buildFooter() {
    document.getElementById('footer').innerHTML =
        '<div class="footer-grid">' +
            '<div class="footer-col"><h4>🛒 ______</h4><p>______</p><p>______</p></div>' +
            '<div class="footer-col"><h4>📞 ______</h4><p>______</p><p>______</p></div>' +
            '<div class="footer-col"><h4>🔗 ______</h4><a href="#">______</a><a href="#">______</a><a href="#">______</a></div>' +
        '</div>' +
        '<div class="footer-bottom"><p id="bankInfoFooter"></p><p>© ______</p></div>';
    
    if (typeof showBankInfo === 'function') {
        document.getElementById('bankInfoFooter').textContent = showBankInfo();
    }
}

// ==================== نمایش محصولات ====================
function renderProducts(list) {
    var data = list || products;
    document.getElementById('productCount').textContent = data.length;
    var grid = document.getElementById('productsGrid');
    
    if (data.length === 0) {
        grid.innerHTML = '<div style="grid-column:1/-1;text-align:center;padding:40px;color:#999;">😔 ______</div>';
        return;
    }

    grid.innerHTML = data.map(function(p) {
        var starsHtml = '';
        for (var i = 1; i <= 5; i++) starsHtml += i <= Math.round(p.rating) ? '⭐' : '☆';
        var discountBadge = p.oldPrice > 0 ? '<span class="stock-badge in-stock" style="top:50px;">🔥 ' + Math.round((1-p.price/p.oldPrice)*100) + '%</span>' : '';
        
        return '<div class="product-card">' +
            '<img src="' + p.image + '" class="product-img" alt="' + p.name + '" onerror="this.src=\'https://via.placeholder.com/300x230/f9f9f9/999?text=' + encodeURIComponent(p.name) + '\'">' +
            '<span class="stock-badge ' + (p.stock ? 'in-stock' : 'out-stock') + '">' + (p.stock ? '✅ ______' : '❌ ______') + '</span>' + discountBadge +
            '<div class="product-actions"><button class="action-btn ' + (favorites.includes(p.id) ? 'liked' : '') + '" onclick="toggleFav(' + p.id + ')">❤️</button></div>' +
            '<div class="product-info">' +
                '<div class="product-category">' + getCatName(p.cat) + '</div>' +
                '<div class="product-name">' + p.name + '</div>' +
                '<div class="stars">' + starsHtml + ' ' + p.rating + ' (' + p.reviews + ')</div>' +
                '<div class="price-row"><span class="price">' + p.price.toLocaleString('fa-IR') + ' ______</span>' + (p.oldPrice > 0 ? '<span class="old-price">' + p.oldPrice.toLocaleString('fa-IR') + '</span>' : '') + '</div>' +
                '<button class="add-cart-btn" onclick="addToCart(' + p.id + ')" ' + (!p.stock ? 'disabled style="background:#ccc;"' : '') + '>' + (p.stock ? '🛒 ______' : '______') + '</button>' +
            '</div></div>';
    }).join('');
}

// ==================== توابع فروشگاه ====================
function getCatName(cat) {
    var names = { cake: '🎂 ______', food: '🍔 ______', handmade: '🧵 ______', jam: '🍯 ______' };
    return names[cat] || cat;
}

function addToCart(id) {
    var p = products.find(function(x) { return x.id === id; });
    var c = cart.find(function(x) { return x.id === id; });
    if (c) { c.qty++; } else { cart.push({ id: p.id, name: p.name, price: p.price, image: p.image, qty: 1 }); }
    saveCart(); updateCartUI(); openCart();
    showNotification('✅ ______');
}

function toggleFav(id) {
    var idx = favorites.indexOf(id);
    if (idx > -1) { favorites.splice(idx, 1); } else { favorites.push(id); showNotification('❤️ ______'); }
    localStorage.setItem('farhanFav', JSON.stringify(favorites));
    document.getElementById('favCount').textContent = favorites.length;
    renderProducts();
}

function filterCategory(cat) {
    currentCat = cat;
    document.querySelectorAll('.cat-item').forEach(function(el) { el.classList.remove('active'); });
    event.target.closest('.cat-item').classList.add('active');
    renderProducts(cat === 'all' ? products : products.filter(function(p) { return p.cat === cat; }));
}

function searchProducts() {
    var q = document.getElementById('searchInput').value.trim().toLowerCase();
    if (!q) { renderProducts(); return; }
    renderProducts(products.filter(function(p) { return p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q); }));
}

function sortProducts(type) {
    var sorted = products.slice();
    if (type === 'cheapest') sorted.sort(function(a, b) { return a.price - b.price; });
    if (type === 'expensive') sorted.sort(function(a, b) { return b.price - a.price; });
    if (type === 'popular') sorted.sort(function(a, b) { return b.rating - a.rating; });
    renderProducts(sorted);
}

function applyFilters() {
    var from = parseInt(document.getElementById('priceFrom').value) || 0;
    var to = parseInt(document.getElementById('priceTo').value) || 99999999;
    renderProducts(products.filter(function(p) { return p.price >= from && p.price <= to; }));
}

// ==================== سبد خرید ====================
function saveCart() { localStorage.setItem('farhanCart', JSON.stringify(cart)); }

function updateCartUI() {
    var total = cart.reduce(function(s, c) { return s + c.qty; }, 0);
    document.getElementById('cartCount').textContent = total;
    document.getElementById('favCount').textContent = favorites.length;
    
    var panel = document.getElementById('cartPanel');
    
    if (cart.length === 0) {
        panel.innerHTML = '<div class="cart-header"><span>🛒 ______</span><button class="close-cart" onclick="closeCart()">✕</button></div>' +
            '<div class="cart-items"><div style="text-align:center;color:#999;padding:40px;">😔 ______</div></div>' +
            '<div class="cart-footer"><div class="cart-total">______</div></div>';
        return;
    }
    
    var sum = cart.reduce(function(s, c) { return s + (c.price * c.qty); }, 0);
    
    panel.innerHTML = 
        '<div class="cart-header"><span>🛒 ______ (' + total + ')</span><button class="close-cart" onclick="closeCart()">✕</button></div>' +
        '<div class="cart-items">' + cart.map(function(c) {
            return '<div class="cart-item"><img src="' + c.image + '" class="cart-item-img"><div class="cart-item-info"><div class="cart-item-name">' + c.name + '</div><div class="cart-item-price">' + (c.price * c.qty).toLocaleString('fa-IR') + ' ______</div></div>' +
                '<div class="cart-item-qty"><button class="qty-btn" onclick="changeQty(' + c.id + ', -1)">➖</button><span>' + c.qty + '</span><button class="qty-btn" onclick="changeQty(' + c.id + ', 1)">➕</button></div>' +
                '<button class="remove-item" onclick="removeFromCart(' + c.id + ')">🗑️</button></div>';
        }).join('') + '</div>' +
        '<div class="cart-footer"><div class="cart-total">💰 ______: ' + sum.toLocaleString('fa-IR') + ' ______</div>' +
        '<button class="checkout-btn" onclick="checkout()">💳 ______</button></div>';
}

function changeQty(id, delta) {
    var c = cart.find(function(x) { return x.id === id; });
    c.qty += delta;
    if (c.qty <= 0) removeFromCart(id); else { saveCart(); updateCartUI(); }
}

function removeFromCart(id) { cart = cart.filter(function(c) { return c.id !== id; }); saveCart(); updateCartUI(); }
function openCart() { document.getElementById('cartPanel').classList.add('open'); document.getElementById('cartOverlay').classList.add('show'); }
function closeCart() { document.getElementById('cartPanel').classList.remove('open'); document.getElementById('cartOverlay').classList.remove('show'); }

// ==================== چت ====================
function toggleChat() { document.getElementById('chatBox').classList.toggle('open'); }
function sendChat() {
    var input = document.getElementById('chatInput');
    var msg = input.value.trim();
    if (!msg) return;
    var messages = document.getElementById('chatMessages');
    messages.innerHTML += '<div class="chat-msg sent">' + msg + '</div>';
    input.value = '';
    messages.scrollTop = messages.scrollHeight;
    setTimeout(function() {
        messages.innerHTML += '<div class="chat-msg received">👋 ______</div>';
        messages.scrollTop = messages.scrollHeight;
    }, 1000);
}

document.getElementById('cartOverlay').addEventListener('click', closeCart);