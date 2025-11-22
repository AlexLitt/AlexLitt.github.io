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

