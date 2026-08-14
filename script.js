// Sample Market Products Data
const PRODUCTS = [
    { id: 1, name: "Manzana Orgánica", category: "frutas", price: 4.50, unit: "kg", icon: "🍎" },
    { id: 2, name: "Plátanos Seda", category: "frutas", price: 3.20, unit: "kg", icon: "🍌" },
    { id: 3, name: "Palta / Aguacate Hass", category: "verduras", price: 8.90, unit: "kg", icon: "🥑" },
    { id: 4, name: "Zanahoria Fresca", category: "verduras", price: 2.50, unit: "kg", icon: "🥕" },
    { id: 5, name: "Pan de Masa Madre", category: "panaderia", price: 6.00, unit: "unid", icon: "🥖" },
    { id: 6, name: "Queso Artesanal", category: "lacteos", price: 12.50, unit: "unid", icon: "🧀" },
    { id: 7, name: "Leche Fresca Entera", category: "lacteos", price: 4.80, unit: "litro", icon: "🥛" },
    { id: 8, name: "Huevos de Corral (12 un)", category: "lacteos", price: 9.50, unit: "paq", icon: "🥚" },
    { id: 9, name: "Aceite de Oliva Extra Virgen", category: "despensa", price: 24.00, unit: "botella", icon: "🏺" },
    { id: 10, name: "Miel Orgánica Natural", category: "despensa", price: 18.00, unit: "frasco", icon: "🍯" },
    { id: 11, name: "Tomate Italiano", category: "verduras", price: 3.80, unit: "kg", icon: "🍅" },
    { id: 12, name: "Croissant de Mantequilla", category: "panaderia", price: 3.50, unit: "unid", icon: "🥐" }
];

// App State
let cart = [];
let currentCategory = "all";
let searchQuery = "";

// DOM Elements
const productGrid = document.getElementById("product-grid");
const noResults = document.getElementById("no-results");
const searchInput = document.getElementById("search-input");
const categoriesContainer = document.getElementById("categories-container");

const cartBtn = document.getElementById("cart-btn");
const closeCart = document.getElementById("close-cart");
const cartDrawer = document.getElementById("cart-drawer");
const cartOverlay = document.getElementById("cart-overlay");
const cartItemsContainer = document.getElementById("cart-items");

const cartCountBadge = document.getElementById("cart-count");
const drawerCount = document.getElementById("drawer-count");
const subtotalAmount = document.getElementById("subtotal-amount");
const totalAmount = document.getElementById("total-amount");
const checkoutBtn = document.getElementById("checkout-btn");
const toastContainer = document.getElementById("toast-container");

// Initialize Application
document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    setupEventListeners();
});

// Event Listeners Setup
function setupEventListeners() {
    // Search Filter
    searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderProducts();
    });

    // Category Filter Buttons
    categoriesContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("filter-btn")) {
            document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
            e.target.classList.add("active");
            currentCategory = e.target.dataset.category;
            renderProducts();
        }
    });

    // Cart Open/Close
    cartBtn.addEventListener("click", toggleCart);
    closeCart.addEventListener("click", toggleCart);
    cartOverlay.addEventListener("click", toggleCart);

    // Checkout
    checkoutBtn.addEventListener("click", handleCheckout);
}

// Filter and Render Products
function renderProducts() {
    const filtered = PRODUCTS.filter(product => {
        const matchesCategory = currentCategory === "all" || product.category === currentCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        productGrid.innerHTML = "";
        noResults.classList.remove("hidden");
        return;
    }

    noResults.classList.add("hidden");
    productGrid.innerHTML = filtered.map(product => `
        <article class="product-card">
            <div class="product-icon">${product.icon}</div>
            <span class="product-category">${product.category}</span>
            <h3 class="product-title">${product.name}</h3>
            <div class="product-footer">
                <div class="price-box">
                    <span class="price-val">S/ ${product.price.toFixed(2)}</span>
                    <span class="price-unit">por ${product.unit}</span>
                </div>
                <button class="add-btn" onclick="addToCart(${product.id})" aria-label="Agregar">
                    +
                </button>
            </div>
        </article>
    `).join("");
}

// Cart Logic
function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    const existingIndex = cart.findIndex(item => item.id === productId);

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    showToast(`Agregado: ${product.name}`);
}

function updateQuantity(productId, change) {
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
    }
    updateCartUI();
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartCountBadge.textContent = totalItems;
    drawerCount.textContent = totalItems;
    subtotalAmount.textContent = `S/ ${subtotal.toFixed(2)}`;
    totalAmount.textContent = `S/ ${subtotal.toFixed(2)}`;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p style="text-align:center; color: var(--text-muted); margin-top: 40px;">Tu carrito está vacío 🛒</p>`;
        return;
    }

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-icon">${item.icon}</div>
            <div class="cart-item-details">
                <div class="cart-item-title">${item.name}</div>
                <div class="cart-item-price">S/ ${(item.price * item.quantity).toFixed(2)}</div>
                <div class="cart-item-qty">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
            </div>
        </div>
    `).join("");
}

function toggleCart() {
    cartDrawer.classList.toggle("active");
    cartOverlay.classList.toggle("active");
}

function handleCheckout() {
    if (cart.length === 0) {
        showToast("El carrito está vacío");
        return;
    }

    alert("🎉 ¡Gracias por tu compra en Mercado Fresco!");
    cart = [];
    updateCartUI();
    toggleCart();
}

// Toast Notifications
function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2500);
}