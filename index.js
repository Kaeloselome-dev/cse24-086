// cart.js

document.addEventListener("DOMContentLoaded", () => {
    const cartItemsContainer = document.getElementById("cart-items");
    const subtotalEl = document.getElementById("subtotal");
    const totalEl = document.getElementById("total");
    const emptyCartEl = document.getElementById("empty-cart");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    function formatPrice(price) {
        return "$" + price.toFixed(2);
    }

    function renderCart() {
        cartItemsContainer.innerHTML = "";

        if (cart.length === 0) {
            emptyCartEl.style.display = "block";
            subtotalEl.textContent = "$0.00";
            totalEl.textContent = "$0.00";
            return;
        }

        emptyCartEl.style.display = "none";

        let subtotal = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>
                    <div style="display: flex; align-items: center;">
                        <img src="${item.image}" alt="${item.title}" style="width: 60px; height: auto; margin-right: 10px;">
                        <span>${item.title}</span>
                    </div>
                </td>
                <td>${formatPrice(item.price)}</td>
                <td>
                    <input type="number" min="1" value="${item.quantity}" class="quantity-input" data-index="${index}" style="width: 60px;">
                </td>
                <td>${formatPrice(itemTotal)}</td>
                <td>
                    <button class="remove-btn" data-index="${index}" style="color: red; border: none; background: none;">&times;</button>
                </td>
            `;
            cartItemsContainer.appendChild(row);
        });

        subtotalEl.textContent = formatPrice(subtotal);
        totalEl.textContent = formatPrice(subtotal); // Assuming no tax/shipping yet
    }

    // Event delegation for quantity change
    cartItemsContainer.addEventListener("change", (e) => {
        if (e.target.classList.contains("quantity-input")) {
            const index = e.target.dataset.index;
            const newQuantity = parseInt(e.target.value);
            if (newQuantity >= 1) {
                cart[index].quantity = newQuantity;
                localStorage.setItem("cart", JSON.stringify(cart));
                renderCart();
            }
        }
    });

    // Event delegation for remove
    cartItemsContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-btn")) {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        }
    });

    document.getElementById("update-cart").addEventListener("click", () => {
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    });

    renderCart();
});


         // Enhanced filtering with smooth transitions
         document.addEventListener('DOMContentLoaded', function() {
            const filterLinks = document.querySelectorAll('.filter-nav .nav-link');
            const galleryItems = document.querySelectorAll('.gallery-item');
            
            filterLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Update active state
                    filterLinks.forEach(item => item.classList.remove('active'));
                    this.classList.add('active');
                    
                    const filter = this.getAttribute('data-filter');
                    
                    // Filter items with fade effect
                    galleryItems.forEach(item => {
                        item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        if (filter === 'all' || item.getAttribute('data-category') === filter) {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        } else {
                            item.style.opacity = '0';
                            item.style.transform = 'scale(0.95)';
                            setTimeout(() => {
                                item.style.display = 'none';
                            }, 300);
                        }
                    });
                    
                    // Show matching items after hiding others
                    setTimeout(() => {
                        galleryItems.forEach(item => {
                            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                                item.style.display = 'block';
                            }
                        });
                    }, 300);
                });
            });
        });
