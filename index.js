

        //Checkout Page Toggle
        let cart = [
            {
                id: 1,
                image: 'Photos and Videos/dinner jacket.jpg',
                title: 'Navy Slim Fit Suit',
                details: 'Italian Wool | Size: 42R',
                price: 1295,
                quantity: 1
            },
            {
                id: 2,
                image: 'Photos and Videos/Reloj deportivo de cuarzo con correa de caucho_ elegante y versátil_ - Silver black orange.jpeg',
                title: 'White French Cuff Shirt',
                details: '100% Cotton | Size: 16',
                price: 195,
                quantity: 2
            },
            {
                id: 3,
                image: 'Photos and Videos/2024 outfit.jpeg',
                title: 'Silk Jacquard Tie',
                details: 'Handmade in England',
                price: 120,
                quantity: 1
            }
        ];

        // DOM Elements
        const cartItemsEl = document.getElementById('cart-items');
        const emptyCartEl = document.getElementById('empty-cart');
        const subtotalEl = document.getElementById('subtotal');
        const totalEl = document.getElementById('total');
        const updateCartBtn = document.getElementById('update-cart');
        const checkoutBtn = document.getElementById('checkout-btn');

        // Render cart items
        function renderCart() {
            // Clear the cart
            cartItemsEl.innerHTML = '';
            
            if (cart.length === 0) {
                emptyCartEl.style.display = 'block';
                document.querySelector('.cart-table').style.display = 'none';
                updateCartBtn.style.display = 'none';
            } else {
                emptyCartEl.style.display = 'none';
                document.querySelector('.cart-table').style.display = 'table';
                updateCartBtn.style.display = 'block';
                
                // Add each item to the cart
                cart.forEach(item => {
                    const itemTotal = (item.price * item.quantity).toFixed(2);
                    
                    const tr = document.createElement('tr');
                    tr.dataset.id = item.id;
                    tr.innerHTML = `
                        <td data-label="Product">
                            <div class="product-cell">
                                <img src="${item.image}" alt="${item.title}" class="product-img">
                                <div>
                                    <div class="product-title">${item.title}</div>
                                    <div class="product-details">${item.details}</div>
                                </div>
                            </div>
                        </td>
                        <td data-label="Price" class="price">$${item.price.toFixed(2)}</td>
                        <td data-label="Quantity">
                            <div class="quantity-control">
                                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                                <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
                                <button class="quantity-btn plus" data-id="${item.id}">+</button>
                            </div>
                        </td>
                        <td data-label="Total" class="price">$${itemTotal}</td>
                        <td>
                            <button class="remove-btn" data-id="${item.id}">
                                <i class="far fa-trash-alt"></i>
                            </button>
                        </td>
                    `;
                    cartItemsEl.appendChild(tr);
                });
            }
            
            updateTotals();
        }

        // Update cart totals
        function updateTotals() {
            let subtotal = 0;
            
            cart.forEach(item => {
                subtotal += item.price * item.quantity;
            });
            
            subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
            totalEl.textContent = `$${subtotal.toFixed(2)}`;
        }

        // Event delegation for quantity buttons
        document.addEventListener('click', function(e) {
            // Plus button
            if (e.target.classList.contains('plus')) {
                const id = parseInt(e.target.dataset.id);
                const item = cart.find(item => item.id === id);
                if (item) {
                    item.quantity++;
                    renderCart();
                }
            }
            
            // Minus button
            if (e.target.classList.contains('minus')) {
                const id = parseInt(e.target.dataset.id);
                const item = cart.find(item => item.id === id);
                if (item && item.quantity > 1) {
                    item.quantity--;
                    renderCart();
                }
            }
            
            // Remove button
            if (e.target.closest('.remove-btn')) {
                const id = parseInt(e.target.closest('.remove-btn').dataset.id);
                cart = cart.filter(item => item.id !== id);
                renderCart();
            }
        });

        // Handle quantity input changes
        cartItemsEl.addEventListener('change', function(e) {
            if (e.target.classList.contains('quantity-input')) {
                const id = parseInt(e.target.dataset.id);
                const quantity = parseInt(e.target.value);
                const item = cart.find(item => item.id === id);
                
                if (item && quantity >= 1) {
                    item.quantity = quantity;
                    updateTotals();
                } else if (item) {
                    e.target.value = item.quantity; // Reset to previous value
                }
            }
        });

        // Update cart button
        updateCartBtn.addEventListener('click', function() {
            // In a real app, you would send the updated quantities to your backend
            alert('Cart updated successfully');
        });

        // Checkout button
        checkoutBtn.addEventListener('click', function() {
            // In a real app, this would redirect to checkout
            alert('Proceeding to checkout');
        });

        // Initialize the cart
        renderCart();

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
