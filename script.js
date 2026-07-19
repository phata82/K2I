/**
 * K2I (Khayrun Immo Impact) - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Navbar
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking a link
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // 3. Scroll to Top Button
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 4. Scroll Animations (Intersection Observer)
    const animateElements = document.querySelectorAll('.fade-up, .slide-in-left, .slide-in-right');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, observerOptions);

    animateElements.forEach(el => {
        scrollObserver.observe(el);
    });

    // 5. Active Nav Link on Scroll
    const sections = document.querySelectorAll('section, header');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // 6. Form Submission to contact@khayrun-immo.com via FormSubmit
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = "Envoi en cours...";
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            fetch("https://formsubmit.co/ajax/contact@khayrun-immo.com", {
                method: "POST",
                headers: { 
                    'Accept': 'application/json'
                },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                alert('Merci pour votre message ! Notre équipe vous contactera très prochainement.');
                contactForm.reset();
            })
            .catch(error => {
                console.error(error);
                alert("Une erreur s'est produite lors de l'envoi. Veuillez nous contacter directement par téléphone ou email.");
            })
            .finally(() => {
                submitBtn.innerText = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }

    // 7. Lightbox for Projects Gallery
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const captionText = document.getElementById('modalCaption');
    const closeModal = document.querySelector('.close-modal');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (modal && galleryItems.length > 0) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const img = item.querySelector('img');
                const title = item.querySelector('h4').innerText;
                
                modal.classList.add('show');
                modalImg.src = img.src;
                captionText.innerHTML = title;
            });
        });

        closeModal.addEventListener('click', () => {
            modal.classList.remove('show');
        });

        // Close modal when clicking outside the image
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }
});
