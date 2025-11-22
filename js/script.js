/**
 * WEBSITE: https://themefisher.com
 * TWITTER: https://twitter.com/themefisher
 * FACEBOOK: https://www.facebook.com/themefisher
 * GITHUB: https://github.com/themefisher/
 */

(function ($) {
    'use strict';

    // Sticky Menu
    $(window).scroll(function () {
        if ($('.navigation').offset().top > 100) {
            $('.navigation').addClass('nav-bg');
        } else {
            $('.navigation').removeClass('nav-bg');
        }
    });

    // Background-images
    $('[data-background]').each(function () {
        $(this).css({
            'background-image': 'url(' + $(this).data('background') + ')'
        });
    });

    // background color
    $('[data-color]').each(function () {
        $(this).css({
            'background-color': $(this).data('color')
        });
    });

    // progress bar
    $('[data-progress]').each(function () {
        $(this).css({
            'bottom': $(this).data('progress')
        });
    });

    // testimonial-slider
    $('.testimonial-slider').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        arrows: false,
        adaptiveHeight: true
    });

    // clients logo slider
    $('.client-logo-slider').slick({
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        dots: false,
        arrows: false,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

    // Shuffle js filter and masonry
    var Shuffle = window.Shuffle;
    var jQuery = window.jQuery;

    var myShuffle = new Shuffle(document.querySelector('.shuffle-wrapper'), {
        itemSelector: '.shuffle-item',
        buffer: 1
    });

    jQuery('input[name="shuffle-filter"]').on('change', function (evt) {
        var input = evt.currentTarget;
        if (input.checked) {
            myShuffle.filter(input.value);
        }
    });

    /* Swiss Style Animations */

    // Staggered Text Reveal
    const revealElements = document.querySelectorAll('.reveal-text');
    const revealOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, index * 150); // Stagger effect
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Parallax Effect for Project Images
    window.addEventListener('scroll', function() {
        const parallaxImages = document.querySelectorAll('.parallax-img');
        parallaxImages.forEach(img => {
            const speed = 0.1; // Subtle parallax speed
            const rect = img.getBoundingClientRect();
            // Only animate if in viewport
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const yPos = -(rect.top * speed);
                img.style.transform = `translateY(${yPos}px)`;
            }
        });
    });


})(jQuery);

    /* Services Accordion Interaction */
    window.toggleService = function(element) {
        // Only active on desktop where layout is flex
        if (window.innerWidth >= 992) {
            // Remove active class from all siblings
            const siblings = element.parentNode.children;
            for (let i = 0; i < siblings.length; i++) {
                siblings[i].classList.remove('active');
            }
            // Add active class to clicked element
            element.classList.add('active');
        }
    };

    // Hero Title Animation
    const titles = [
        { t1: "PRODUCT", t2: "MANAGER" },
        { t1: "AI AUTOMATION", t2: "CONSULTANT" }
    ];
    
    let currentTitleIndex = 0;
    const titleElement1 = document.getElementById('hero-title-1');
    const titleElement2 = document.getElementById('hero-title-2');

    if (titleElement1 && titleElement2) {
        setInterval(() => {
            currentTitleIndex = (currentTitleIndex + 1) % titles.length;
            const nextTitle = titles[currentTitleIndex];
            
            // Simple fade/slide transition
            titleElement1.style.opacity = 0;
            titleElement2.style.opacity = 0;
            titleElement1.style.transform = 'translateY(20px)';
            titleElement2.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                titleElement1.textContent = nextTitle.t1;
                titleElement2.textContent = nextTitle.t2;
                
                titleElement1.style.opacity = 1;
                titleElement2.style.opacity = 1;
                titleElement1.style.transform = 'translateY(0)';
                titleElement2.style.transform = 'translateY(0)';
            }, 500);
            
        }, 3000);
    }

    // Typewriter Effect for Hero Intro
    document.addEventListener('DOMContentLoaded', () => {
        const textElement = document.getElementById('hero-intro-text');
        if (textElement) {
            const fullText = textElement.textContent.trim(); // Get text from the absolute element
            textElement.textContent = ''; // Clear it for typing
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        let i = 0;
                        // Speed calculation: 2-3 seconds total. 
                        // Text is approx 200-250 chars. 
                        // 2500ms / 200chars = ~12ms per char
                        const speed = 12; 
                        
                        function typeWriter() {
                            if (i < fullText.length) {
                                textElement.textContent += fullText.charAt(i);
                                i++;
                                setTimeout(typeWriter, speed);
                            }
                        }
                        typeWriter();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(textElement);
        }
    });

    // Services Animation Trigger with Intersection Observer
    document.addEventListener('DOMContentLoaded', () => {
        const servicesGrid = document.querySelector('.services-grid');
        if (servicesGrid) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        servicesGrid.classList.add('animate-border');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 }); // Trigger when 20% visible
            
            observer.observe(servicesGrid);
        }
    });

    // Clear existing typewriter logic to prevent double initialization if needed, 
    // though currently we are appending. The previous one will run but we are updating 
    // the DOM structure which might need the JS to be aware if it selects by ID.
    // The ID is preserved so the existing JS block for typewriter will still work,
    // but we need to make sure it doesn't clear the text before the ghost element strategy is ready?
    // Actually, the existing JS clears 'hero-intro-text' textContent. 
    // This is fine because the ghost element is a SIBLING (or parent wrapper context) and has no ID.
    // The element with ID 'hero-intro-text' is the absolute positioned one.
    // So the existing JS logic is actually compatible with this HTML change!
    // No JS update needed for Typewriter unless we want to change speed/logic.

    // Formspree Form Submission
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success-message');
    const errorMessage = document.getElementById('form-error-message');
    const submitButton = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());
            
            // Loading State
            const originalBtnText = submitButton.innerHTML;
            submitButton.innerHTML = 'SENDING...';
            submitButton.disabled = true;
            submitButton.style.opacity = '0.5';
            errorMessage.style.display = 'none';

            fetch(contactForm.action, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Success
                    contactForm.style.display = 'none';
                    successMessage.style.display = 'block';
                    contactForm.reset();
                } else {
                    // Error
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                errorMessage.style.display = 'block';
                submitButton.innerHTML = originalBtnText;
                submitButton.disabled = false;
                submitButton.style.opacity = '1';
            });
        });
    }
