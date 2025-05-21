
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
