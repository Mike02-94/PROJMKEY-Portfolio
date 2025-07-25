// Portfolio JavaScript - Complete Implementation
document.addEventListener('DOMContentLoaded', function() {
    
    // ========================================
    // NAVIGATION FUNCTIONALITY
    // ========================================
    
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Update active navigation link based on scroll position
        updateActiveNavLink();
    });
    
    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Update active navigation link
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
    
    // ========================================
    // TYPING ANIMATION FOR HERO SECTION
    // ========================================
    
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const titles = [
            'Front-end Developer',
            'Technical Support',
            'Fraud Analyst',
            'Digital Artist'
        ];
        
        let currentIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        
        function typeEffect() {
            const currentTitle = titles[currentIndex];
            
            if (!isDeleting) {
                heroSubtitle.textContent = currentTitle.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                
                if (currentCharIndex === currentTitle.length) {
                    setTimeout(() => {
                        isDeleting = true;
                    }, 2000);
                }
            } else {
                heroSubtitle.textContent = currentTitle.substring(0, currentCharIndex);
                currentCharIndex--;
                
                if (currentCharIndex < 0) {
                    isDeleting = false;
                    currentIndex = (currentIndex + 1) % titles.length;
                }
            }
            
            const typingSpeed = isDeleting ? 50 : 100;
            setTimeout(typeEffect, typingSpeed);
        }
        
        // Start typing effect after page load
        setTimeout(typeEffect, 1000);
    }
    
    // ========================================
    // ANIMATED COUNTERS FOR STATS
    // ========================================
    
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-count') || counter.textContent);
            const increment = target / 100;
            let current = 0;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    counter.textContent = Math.floor(current) + (counter.textContent.includes('+') ? '+' : '');
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
                }
            };
            
            updateCounter();
        });
    }
    
    // ========================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // ========================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Trigger counter animation for stats section
                if (entry.target.classList.contains('about')) {
                    animateCounters();
                }
                
                // Stagger animations for project cards
                if (entry.target.classList.contains('projects')) {
                    const projectCards = entry.target.querySelectorAll('.project-card');
                    projectCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate');
                        }, index * 200);
                    });
                }
                
                // Animate skill bars
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // ========================================
    // SKILL BARS ANIMATION
    // ========================================
    
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        skillBars.forEach(bar => {
            const percentage = bar.getAttribute('data-percentage') || '0';
            bar.style.width = '0%';
            
            setTimeout(() => {
                bar.style.transition = 'width 2s ease-in-out';
                bar.style.width = percentage + '%';
            }, 300);
        });
    }
    
    // ========================================
    // PROJECT MODAL FUNCTIONALITY
    // ========================================
    
    const projectCards = document.querySelectorAll('.project-card');
    const modal = document.getElementById('project-modal');
    const modalClose = document.querySelector('.modal-close');
    const modalOverlay = document.querySelector('.modal-overlay');
    
    // Open project modal
    projectCards.forEach(card => {
        const viewBtn = card.querySelector('.btn-secondary');
        if (viewBtn) {
            viewBtn.addEventListener('click', (e) => {
                e.preventDefault();
                openProjectModal(card);
            });
        }
    });
    
    // Close modal events
    if (modalClose) {
        modalClose.addEventListener('click', closeProjectModal);
    }
    if (modalOverlay) {
        modalOverlay.addEventListener('click', closeProjectModal);
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
            closeProjectModal();
        }
    });
    
    function openProjectModal(card) {
        const title = card.querySelector('.project-title').textContent;
        const description = card.querySelector('.project-description').textContent;
        const image = card.querySelector('.project-image').src;
        const technologies = Array.from(card.querySelectorAll('.tech-tag')).map(tag => tag.textContent);
        
        // Update modal content
        if (modal) {
            modal.querySelector('.modal-title').textContent = title;
            modal.querySelector('.modal-description').textContent = description;
            modal.querySelector('.modal-image').src = image;
            
            const techContainer = modal.querySelector('.modal-technologies');
            techContainer.innerHTML = '';
            technologies.forEach(tech => {
                const techTag = document.createElement('span');
                techTag.className = 'tech-tag';
                techTag.textContent = tech;
                techContainer.appendChild(techTag);
            });
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeProjectModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    // ========================================
    // GAME INTEGRATION FUNCTIONALITY
    // ========================================
    
    // Game paths - your existing URLs are correct
    const gamePaths = {
        'game1': 'https://mike02-94.github.io/NEUROSNAKE/',
        'game2': 'https://mike02-94.github.io/SHIFTGRID/',
        'game3': 'https://mike02-94.github.io/NEONBREAKER/'
    };

    // Get all necessary elements
    const gameCards = document.querySelectorAll('.game-card');
    const gameModal = document.getElementById('game-modal');
    const gameFrame = document.getElementById('game-frame');
    const gameModalClose = document.getElementById('close-game-modal');
    
    console.log('Found game cards:', gameCards.length);
    console.log('Game modal:', gameModal);
    console.log('Game frame:', gameFrame);
    console.log('Close button:', gameModalClose);
    
    // Function to open game modal
    function openGameModal(gameId) {
        if (gameModal && gameFrame && gamePaths[gameId]) {
            console.log('Opening game:', gameId, 'URL:', gamePaths[gameId]);
            
            // Add loading indicator
            gameModal.classList.add('loading');
            
            // Set iframe source
            gameFrame.src = gamePaths[gameId];
            
            // Show modal
            gameModal.style.display = 'flex';
            gameModal.style.visibility = 'visible';
            gameModal.style.opacity = '1';
            
            // Trigger animation after a small delay
            setTimeout(() => {
                gameModal.classList.add('active');
            }, 10);
            
            // Remove loading indicator after iframe loads
            gameFrame.onload = function() {
                gameModal.classList.remove('loading');
                console.log('Game loaded successfully');
            };
            
            // Handle iframe load errors
            gameFrame.onerror = function() {
                gameModal.classList.remove('loading');
                console.error('Failed to load game:', gameId);
                showNotification('Failed to load game. Please try again.', 'error');
            };
            
            // Prevent background scrolling
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
            
        } else {
            console.error('Game modal elements not found or invalid game ID:', gameId);
            console.log('Available games:', Object.keys(gamePaths));
            showNotification('Game could not be loaded. Please try again.', 'error');
        }
    }

    // Function to close game modal
    function closeGameModal() {
        if (gameModal && gameFrame) {
            console.log('Closing game modal');
            
            // Remove active class for animation
            gameModal.classList.remove('active');
            
            // Hide modal after animation completes
            setTimeout(() => {
                gameModal.style.display = 'none';
                gameModal.style.visibility = 'hidden';
                gameModal.style.opacity = '0';
                gameFrame.src = ''; // Stop the game
                gameModal.classList.remove('loading');
            }, 300);
            
            // Restore background scrolling
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }
    }

    // Add click event listeners to game cards
    gameCards.forEach((card, index) => {
        console.log('Setting up game card:', index, card);
        
        // Find the play button or make the entire card clickable
        const playButton = card.querySelector('.play-btn, .btn-primary, .game-play-btn');
        const clickableElement = playButton || card;
        
        console.log('Clickable element for card', index, ':', clickableElement);
        
        clickableElement.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Game card/button clicked!', card);
            const gameId = card.getAttribute('data-game') || card.getAttribute('data-game-id');
            console.log('Game ID:', gameId);
            
            if (gameId && gamePaths[gameId]) {
                openGameModal(gameId);
            } else {
                console.error('No valid game ID found on card:', card);
                console.log('Card attributes:', card.attributes);
                // Try to determine game ID based on card position
                const fallbackGameId = 'game' + (index + 1);
                if (gamePaths[fallbackGameId]) {
                    console.log('Using fallback game ID:', fallbackGameId);
                    openGameModal(fallbackGameId);
                } else {
                    showNotification('Game ID not found. Please check the data-game attribute.', 'error');
                }
            }
        });
        
        // Add hover effects
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
            card.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Close modal when clicking the X button
    if (gameModalClose) {
        gameModalClose.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Close button clicked');
            closeGameModal();
        });
    } else {
        console.error('Close button not found - looking for #close-game-modal');
    }

    // Close when clicking outside the modal content (on the overlay)
    if (gameModal) {
        gameModal.addEventListener('click', (e) => {
            // Only close if clicking the modal background, not the content
            if (e.target === gameModal) {
                console.log('Modal overlay clicked');
                closeGameModal();
            }
        });
    }

    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (gameModal && gameModal.classList.contains('active')) {
                console.log('Escape key pressed, closing modal');
                closeGameModal();
            }
        }
    });

    // Add fullscreen functionality
    function toggleGameFullscreen() {
        if (gameFrame) {
            if (gameFrame.requestFullscreen) {
                gameFrame.requestFullscreen();
            } else if (gameFrame.webkitRequestFullscreen) {
                gameFrame.webkitRequestFullscreen();
            } else if (gameFrame.msRequestFullscreen) {
                gameFrame.msRequestFullscreen();
            }
        }
    }

    // Add fullscreen button to modal if it exists
    if (gameModal) {
        const modalContent = gameModal.querySelector('.modal-content, .game-modal-content');
        
        if (modalContent && !modalContent.querySelector('.fullscreen-btn')) {
            const fullscreenBtn = document.createElement('button');
            fullscreenBtn.className = 'fullscreen-btn';
            fullscreenBtn.innerHTML = '⛶';
            fullscreenBtn.title = 'Fullscreen';
            fullscreenBtn.style.cssText = `
                position: absolute;
                top: 10px;
                right: 60px;
                background: rgba(0, 0, 0, 0.7);
                color: white;
                border: 2px solid rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                width: 40px;
                height: 40px;
                cursor: pointer;
                font-size: 16px;
                z-index: 2001;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
            `;
            
            fullscreenBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleGameFullscreen();
            });
            
            fullscreenBtn.addEventListener('mouseenter', () => {
                fullscreenBtn.style.background = 'rgba(74, 144, 226, 0.8)';
                fullscreenBtn.style.transform = 'scale(1.1)';
            });
            
            fullscreenBtn.addEventListener('mouseleave', () => {
                fullscreenBtn.style.background = 'rgba(0, 0, 0, 0.7)';
                fullscreenBtn.style.transform = 'scale(1)';
            });
            
            modalContent.appendChild(fullscreenBtn);
        }
    }

    // Handle window resize to maintain modal responsiveness
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            if (gameModal && gameModal.classList.contains('active')) {
                console.log('Window resized, adjusting modal');
            }
        }, 250);
    });

    // Debug: Log when everything is set up
    console.log('Game modal system initialized');
    console.log('Available games:', Object.keys(gamePaths));
    console.log('Game cards found:', gameCards.length);
    
    // ========================================
    // CONTACT FORM FUNCTIONALITY
    // ========================================
    
    const contactForm = document.getElementById('contactForm');
    const formInputs = contactForm ? contactForm.querySelectorAll('input, textarea') : [];
    const submitBtn = contactForm ? contactForm.querySelector('.submit-btn') : null;
    
    // Form validation
    function validateForm() {
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        formInputs.forEach(input => {
            const errorElement = input.parentNode.querySelector('.error-message');
            
            // Remove existing error
            if (errorElement) {
                errorElement.remove();
            }
            input.classList.remove('error');
            
            // Validate required fields
            if (input.hasAttribute('required') && !input.value.trim()) {
                showFieldError(input, 'This field is required');
                isValid = false;
            }
            
            // Validate email
            if (input.type === 'email' && input.value && !emailRegex.test(input.value)) {
                showFieldError(input, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate minimum length
            if (input.hasAttribute('minlength')) {
                const minLength = parseInt(input.getAttribute('minlength'));
                if (input.value.length < minLength) {
                    showFieldError(input, `Minimum ${minLength} characters required`);
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }
    
    function showFieldError(input, message) {
        input.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        input.parentNode.appendChild(errorDiv);
    }
    
    // Real-time validation
    formInputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateForm();
        });
        
        input.addEventListener('input', () => {
            // Remove error styling as user types
            const errorElement = input.parentNode.querySelector('.error-message');
            if (errorElement) {
                errorElement.remove();
            }
            input.classList.remove('error');
        });
    });
    
    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!validateForm()) {
                return;
            }
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };
            
            // Show loading state
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                submitBtn.classList.add('loading');
            }
            
            try {
                // Send email using EmailJS or your preferred service
                await sendEmail(data);
                showNotification('Message sent successfully!', 'success');
                contactForm.reset();
            } catch (error) {
                console.error('Error sending email:', error);
                showNotification('Failed to send message. Please try again.', 'error');
            } finally {
                // Reset button state
                if (submitBtn) {
                    submitBtn.textContent = 'Send Message';
                    submitBtn.disabled = false;
                    submitBtn.classList.remove('loading');
                }
            }
        });
    }
    
    // ========================================
    // EMAIL SENDING FUNCTIONALITY
    // ========================================
    
    async function sendEmail(data) {
        if (typeof emailjs !== 'undefined') {
            emailjs.init('3rxUgHuLCFFrujxey'); //public key
            
            return emailjs.send(
                'service_3n33cmq',    // service ID
                'template_5lrpwmg',   // template ID
                {
                    from_name: data.name,
                    from_email: data.email,
                    subject: data.subject,
                    message: data.message,
                    to_email: 'michaeleimeren@gmail.com'
                }
            );
        } else {
            throw new Error('EmailJS not loaded');
        }
    }
    
    // ========================================
    // NOTIFICATION SYSTEM
    // ========================================
    
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Show with animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            removeNotification(notification);
        }, 5000);
        
        // Close button event
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            removeNotification(notification);
        });
    }
    
    function removeNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }
    
    // ========================================
    // SCROLL TO TOP FUNCTIONALITY
    // ========================================
    
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ========================================
    // PARALLAX SCROLLING EFFECT
    // ========================================
    
    const parallaxElements = document.querySelectorAll('.parallax');
    
    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            
            parallaxElements.forEach(element => {
                const speed = element.getAttribute('data-speed') || 0.5;
                const yPos = -(scrollTop * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
    
    // ========================================
    // LAZY LOADING FOR IMAGES
    // ========================================
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ========================================
    // TESTIMONIALS SLIDER (IF INCLUDED)
    // ========================================
    
    const testimonialSlider = document.querySelector('.testimonials-slider');
    if (testimonialSlider) {
        const testimonials = testimonialSlider.querySelectorAll('.testimonial');
        const prevBtn = document.querySelector('.testimonial-prev');
        const nextBtn = document.querySelector('.testimonial-next');
        let currentTestimonial = 0;
        
        function showTestimonial(index) {
            testimonials.forEach((testimonial, i) => {
                testimonial.classList.toggle('active', i === index);
            });
        }
        
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
                showTestimonial(currentTestimonial);
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                showTestimonial(currentTestimonial);
            });
        }
        
        // Auto-rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
        
        // Initialize first testimonial
        if (testimonials.length > 0) {
            showTestimonial(0);
        }
    }
    
    // ========================================
    // PERFORMANCE OPTIMIZATIONS
    // ========================================
    
    // Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Scroll-dependent functions here
        }, 16); // ~60fps
    });
    
    // Preload critical images - wrapped in try-catch to avoid 404 errors
    const criticalImages = [
        './images/profile.jpg',
        './images/hero-bg.jpg'
    ];
    
    criticalImages.forEach(src => {
        try {
            const img = new Image();
            img.onerror = () => {
                console.log(`Image not found: ${src} - this is normal if you haven't added these images yet.`);
            };
            img.src = src;
        } catch (error) {
            console.log(`Could not preload image: ${src}`);
        }
    });
    
    // ========================================
    // CONSOLE EASTER EGG
    // ========================================
    
    console.log(`
    🎮 Welcome to my portfolio! 
    
    Looking for hidden features? Try:
    - Press 'K' for Konami code
    - Check out the source code
    - Play the embedded games!
    
    Built with ❤️ and lots of ☕
    `);
    
    // Konami Code Easter Egg
    const konamiCode = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.code === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Easter egg activated!
                document.body.classList.add('konami-activated');
                showNotification('🎉 Konami Code activated! You found the secret!', 'success');
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
}); // End of DOMContentLoaded