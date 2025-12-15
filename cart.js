/**
 * Earthy Munchy - WhatsApp Cart & Navigation Logic
 * 
 * Features:
 * - LocalStorage persistence
 * - GSAP Animated Drawer
 * - WhatsApp Checkout Redirect
 */

const CONFIG = {
    WHATSAPP_NUMBER: "919876543210", // REPLACE WITH REAL NUMBER
    CURRENCY: "₹"
};

class Cart {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('em_cart')) || [];
        this.isOpen = false;
        this.init();
    }

    init() {
        // Inject Cart UI if not present
        if (!document.getElementById('cart-drawer')) {
            this.injectCartUI();
        }
        
        // Bind Nav Cart Button
        this.bindNavIcon();

        // Initial Render
        this.updateBadge();
        this.renderCartItems();

        // Listen for global custom events if needed
        window.addEventListener('cart-add', (e) => this.addItem(e.detail));
        window.addEventListener('cart-toggle', () => this.toggleCart());
    }

    injectCartUI() {
        const cartHTML = `
            <div id="cart-drawer-backdrop" class="fixed inset-0 bg-black/50 z-[90] hidden opacity-0 transition-opacity duration-300"></div>
            <div id="cart-drawer" class="fixed top-0 right-0 h-full w-full sm:w-[400px] bg-earth-cream shadow-2xl z-[100] transform translate-x-full border-l border-earth-warmBrown/20 flex flex-col">
                
                <!-- Header -->
                <div class="p-6 border-b border-earth-warmBrown/10 flex items-center justify-between bg-white/50 backdrop-blur-sm">
                    <h2 class="font-serif text-2xl text-earth-darkText">Your Selection</h2>
                    <button id="cart-close-btn" class="p-2 hover:bg-black/5 rounded-full transition-colors">
                        <i data-lucide="x" class="w-6 h-6 text-earth-warmBrown"></i>
                    </button>
                </div>

                <!-- Items Container -->
                <div id="cart-items-container" class="flex-1 overflow-y-auto p-6 space-y-6">
                    <!-- Items injected here -->
                    <div id="cart-empty-state" class="h-full flex flex-col items-center justify-center text-center opacity-40">
                        <i data-lucide="shopping-bag" class="w-12 h-12 mb-4 text-earth-terracotta"></i>
                        <p class="font-serif text-xl">Your cart is empty.</p>
                        <p class="text-sm">Explore our collection to add items.</p>
                    </div>
                </div>

                <!-- Footer -->
                <div class="p-6 bg-earth-darkText text-earth-cream border-t border-white/5">
                    <div class="flex justify-between items-end mb-6">
                        <span class="text-sm uppercase tracking-widest opacity-60">Total Estimation</span>
                        <span id="cart-total-price" class="font-serif text-3xl">₹0</span>
                    </div>
                    <button id="cart-checkout-btn" class="w-full py-4 bg-earth-terracotta hover:bg-earth-clay text-white font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 rounded-lg">
                        <span>Send Order on WhatsApp</span>
                        <i data-lucide="message-circle" class="w-5 h-5"></i>
                    </button>
                    <p class="text-[10px] text-center mt-3 opacity-40">Orders are processed manually via WhatsApp.</p>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', cartHTML);

        // Bind Drawer Events
        document.getElementById('cart-close-btn').addEventListener('click', () => this.toggleCart(false));
        document.getElementById('cart-drawer-backdrop').addEventListener('click', () => this.toggleCart(false));
        document.getElementById('cart-checkout-btn').addEventListener('click', () => this.checkout());

        // Refresh icons if Lucide is present
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    bindNavIcon() {
        // Look for the cart trigger in the DOM (assuming distinct ID or class structure)
        // From index.html analysis: The cart button is inside nav. We will add a specific ID to it during standardisation.
        const triggers = document.querySelectorAll('.cart-trigger');
        triggers.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleCart(true);
            });
        });
    }

    addItem(product) {
        // Product object: { id, title, variant, price, image }
        const existingItem = this.cart.find(item => item.id === product.id && item.variant === product.variant);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }

        this.save();
        this.updateBadge();
        this.renderCartItems();
        this.toggleCart(true); // Open cart on add
    }

    updateQuantity(index, change) {
        if (this.cart[index]) {
            this.cart[index].quantity += change;
            if (this.cart[index].quantity <= 0) {
                this.cart.splice(index, 1);
            }
            this.save();
            this.renderCartItems();
            this.updateBadge();
        }
    }

    removeItem(index) {
        this.cart.splice(index, 1);
        this.save();
        this.renderCartItems();
        this.updateBadge();
    }

    save() {
        localStorage.setItem('em_cart', JSON.stringify(this.cart));
    }

    updateBadge() {
        const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
        const badges = document.querySelectorAll('.cart-badge'); // The red dot spanning
        
        badges.forEach(badge => {
            if (totalItems > 0) {
                badge.classList.remove('opacity-0', 'scale-0');
                badge.innerText = totalItems > 9 ? '9+' : totalItems; // Optional: Add number text
            } else {
                badge.classList.add('opacity-0', 'scale-0');
            }
        });
    }

    renderCartItems() {
        const container = document.getElementById('cart-items-container');
        const emptyState = document.getElementById('cart-empty-state');
        const totalEl = document.getElementById('cart-total-price');

        if (this.cart.length === 0) {
            container.innerHTML = '';
            container.appendChild(emptyState);
            emptyState.style.display = 'flex';
            totalEl.innerText = CONFIG.CURRENCY + "0";
            return;
        }

        emptyState.style.display = 'none';
        container.innerHTML = '';

        let total = 0;

        this.cart.forEach((item, index) => {
            total += item.price * item.quantity;

            const itemEl = document.createElement('div');
            itemEl.className = "flex gap-4 items-start animate-fade-in";
            itemEl.innerHTML = `
                <div class="w-20 h-20 bg-white rounded-lg overflow-hidden border border-earth-warmBrown/10 flex-shrink-0">
                    <img src="${item.image || 'img/placeholder.png'}" class="w-full h-full object-cover">
                </div>
                <div class="flex-1">
                    <div class="flex justify-between items-start mb-1">
                        <h4 class="font-serif font-bold text-earth-darkText text-lg leading-tight">${item.title}</h4>
                        <button onclick="window.cart.removeItem(${index})" class="text-earth-terracotta hover:text-red-600">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                        </button>
                    </div>
                    <p class="text-xs uppercase tracking-wider text-earth-warmBrown mb-3">${item.variant}</p>
                    <div class="flex justify-between items-center">
                        <p class="font-bold text-earth-darkText">${CONFIG.CURRENCY}${item.price}</p>
                        <div class="flex items-center gap-3 bg-white/60 rounded-full px-2 py-1 border border-earth-warmBrown/10">
                            <button onclick="window.cart.updateQuantity(${index}, -1)" class="w-6 h-6 flex items-center justify-center hover:bg-black/5 rounded-full">-</button>
                            <span class="text-sm font-bold w-4 text-center">${item.quantity}</span>
                            <button onclick="window.cart.updateQuantity(${index}, 1)" class="w-6 h-6 flex items-center justify-center hover:bg-black/5 rounded-full">+</button>
                        </div>
                    </div>
                </div>
            `;
            container.appendChild(itemEl);
        });

        totalEl.innerText = CONFIG.CURRENCY + total.toLocaleString();
        
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    toggleCart(forceOpen = null) {
        const drawer = document.getElementById('cart-drawer');
        const backdrop = document.getElementById('cart-drawer-backdrop');
        
        const shouldOpen = forceOpen !== null ? forceOpen : !this.isOpen;
        this.isOpen = shouldOpen;

        if (this.isOpen) {
            backdrop.classList.remove('hidden');
            // Small delay to allow display:block to apply before opacity transition
            setTimeout(() => {
                backdrop.classList.remove('opacity-0');
                // Use GSAP if available, else fallback to CSS classes
                if (typeof gsap !== 'undefined') {
                    gsap.to(drawer, { x: 0, duration: 0.5, ease: "power3.out" });
                } else {
                    drawer.style.transform = 'translateX(0)';
                }
            }, 10);
        } else {
            backdrop.classList.add('opacity-0');
            if (typeof gsap !== 'undefined') {
                gsap.to(drawer, { x: "100%", duration: 0.4, ease: "power3.in" });
            } else {
                drawer.style.transform = 'translateX(100%)';
            }
            setTimeout(() => {
                backdrop.classList.add('hidden');
            }, 400);
        }
    }

    checkout() {
        if (this.cart.length === 0) return;

        let message = "Hello Earthy Munchy! I'd like to place an order:%0A%0A";
        let total = 0;

        this.cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            message += `▪ ${item.quantity}x ${item.title} (${item.variant}) - ${CONFIG.CURRENCY}${itemTotal}%0A`;
        });

        message += `%0A*Total Order Value: ${CONFIG.CURRENCY}${total}*`;
        message += `%0A%0AShipping Address:%0A[Please enter your address here]`;

        window.open(`https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${message}`, '_blank');
    }
}

// Global accessor
window.initCart = () => {
    window.cart = new Cart();
};

document.addEventListener('DOMContentLoaded', window.initCart);
