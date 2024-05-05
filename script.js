document.addEventListener("DOMContentLoaded", function() {
    // Social links animaition
    function addSocialLinksEventListeners(link, icon, basePath) {
        const hoverSrc = `assets/svgs/${basePath}.hover.svg`;
        const normalSrc = `assets/svgs/${basePath}.normal.svg`;

        link.addEventListener('mouseover', () => {
            icon.src = hoverSrc;
        });

        link.addEventListener('mouseout', () => {
            icon.src = normalSrc;
        });
    }

    // Function to initialize event listeners for a social link
    function initializeSocialLink(baseSelector, basePath) {
        const link = document.querySelector(`${baseSelector}.social-link`);
        const icon = document.querySelector(`${baseSelector} .icon-social`);
        const linkPopUp = document.querySelector(`${baseSelector}.social-link.pop-up`);
        const iconPopUp = document.querySelector(`${baseSelector} .icon-social.pop-up`);

        if (link && icon) {
            addSocialLinksEventListeners(link, icon, basePath);
        }
        if (linkPopUp && iconPopUp) {
            addSocialLinksEventListeners(linkPopUp, iconPopUp, basePath);
        }
    }

    // Initialize all social links
    initializeSocialLink('.whatsapp', 'whatsapp');
    initializeSocialLink('.viber', 'viber');


    // Burger menu animation
    const popUpMenu = document.querySelector('.pop-up-menu');
    const overlay = document.querySelector('.overlay');
    const closedBurgerMenu = document.querySelector('.burger-menu.closed');
    const openBurgerMenu = document.querySelector('.burger-menu.open');
    closedBurgerMenu.addEventListener('click', () => {
            overlay.style.display ='block';
            setTimeout(() => {
                popUpMenu.classList.add('active');
            }, 50);
    });
    openBurgerMenu.addEventListener('click', () => {
        popUpMenu.classList.remove('active');
        setTimeout(() => {
            overlay.style.display = 'none';
        }, 50);
    });

    // Pop-up menu form buttons
    const requestBtns = document.querySelectorAll('.repair-request.request');
    requestBtns.forEach((button) => {
        const plusIcon = button.querySelector('.plus-sign-btn');
        
        button.addEventListener('mouseover', () => {
            toggleIcon(plusIcon);
        });

        button.addEventListener('mouseout', () => {
            toggleIcon(plusIcon);
        });
    });

    function toggleIcon(plusIcon) {
        const isOrange = plusIcon.src.endsWith("/+orange.svg");
        plusIcon.src = isOrange ? "assets/svgs/+white.svg" : "assets/svgs/+orange.svg";
    }


    // Animated titles
    const targets = document.querySelectorAll('.title-animated');

    if (!('IntersectionObserver' in window)) {
        target.classList.add('visible');
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                entry.target.classList.remove('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    targets.forEach((target) => {
        observer.observe(target);
    });

    // Reviews carousel
    const carouselViewports = document.querySelectorAll('.carousel-viewport');
    
    carouselViewports.forEach(carouselContainer => {
        setupCarousel(carouselContainer);
    });

    function setupCarousel(carouselContainer) {
        const track = carouselContainer.querySelector('.carousel-track');
        const items = Array.from(track.children);
        const btnContainer = carouselContainer.nextElementSibling;
        const nextButton = btnContainer.querySelector('.next-btn');
        const prevButton = btnContainer.querySelector('.prev-btn');
        const itemWidth = items[0].getBoundingClientRect().width;
        let currentSlide = 0;
        let startX;

        nextButton.addEventListener('click', () => moveSlide(1));
        prevButton.addEventListener('click', () => moveSlide(-1));

        track.addEventListener('touchstart', handleTouchStart, { passive: false });
        track.addEventListener('touchmove', handleTouchMove, { passive: false });
        track.addEventListener('touchend', handleTouchEnd);

        function moveSlide(direction) {
            const newPosition = currentSlide + direction;
            if (newPosition >= 0 && newPosition < items.length) {
                currentSlide = newPosition;
                moveTrack((itemWidth + 24) * currentSlide);
            }
        }

        function moveTrack(position) {
            track.style.transform = `translateX(-${position}px)`;
        }

        function handleTouchStart(e) {
            startX = e.touches[0].clientX;
        }

        function handleTouchMove(e) {
            const moveX = e.touches[0].clientX - startX;
            if (Math.abs(moveX) > 5) {
                e.preventDefault();
            }
        }

        function handleTouchEnd(e) {
            const moveX = e.changedTouches[0].clientX - startX;
            if (moveX > 50) {
                moveSlide(-1);
            } else if (moveX < -50) {
                moveSlide(1);
            }
        }
    }
        
    // Arrow buttons hovering effect
    function toggleArrow(button) {
        const isNormal = button.getAttribute('data-state') === 'normal';
        if (isNormal) {
            button.src = button.src.replace("normal.svg", "hover.svg");
            button.setAttribute('data-state', 'hover');
        } else {
            button.src = button.src.replace("hover.svg", "normal.svg");
            button.setAttribute('data-state', 'normal');
        }
    }
    
    function addEventListenersForArrows(buttons) {
        buttons.forEach(button => {
            button.setAttribute('data-state', button.src.includes('normal.svg') ? 'normal' : 'hover');
            button.addEventListener('mouseenter', () => toggleArrow(button));
            button.addEventListener('mouseleave', () => toggleArrow(button));
        });
    }
    
    const buttons = document.querySelectorAll('.carousel-arrow, .faq-icon');
    addEventListenersForArrows(buttons);
    

    // Hidable FAQ sections

    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach((question) => {
        const icon = question.querySelector('.faq-icon');
        const answer = question.querySelector('.faq-answer');

        icon.addEventListener('click', () => {
            toggleFAQ(answer, icon);
        });
    });

    function toggleFAQ(answer, icon) {
        const isOpen = answer.style.height !== "0px" && answer.style.height !== "";
        
        if (!isOpen) {
            answer.style.display = 'block';
            answer.style.height = '0';
            answer.style.opacity = '0';
            answer.style.marginTop = '24px';

            const height = answer.scrollHeight + "px";
            requestAnimationFrame(() => {
                answer.style.height = height;
                answer.style.opacity = "1";
            });

            icon.src = icon.src.replace("hover.svg", "active.svg");
        } else {
            answer.style.height = "0";
            answer.style.opacity = "0";

            setTimeout(() => {
                answer.style.marginTop = '0px';
                answer.style.display = 'none';
            }, 500); 

            icon.src = icon.src.replace("active.svg", "hover.svg");
        }
    }

    // Contacts links
    const scrollToFooterLinks = document.querySelectorAll('.scroll-to-footer');
    const footer = document.querySelector('.footer');

    scrollToFooterLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            popUpMenu.classList.remove('active');
            overlay.style.display = 'none'; 
            footer.scrollIntoView({ behavior: 'smooth' });
        });
    });

    const mobileLinks = document.querySelectorAll('.pop-up-remove');
    mobileLinks.forEach((link) => {
        link.addEventListener('click', () => {
            popUpMenu.classList.remove('active');
            overlay.style.display = 'none'; 
        });
    });

    // Function to toggle visibility of an overlay
    function toggleOverlay(button, overlayClass, isVisible) {
        let container = button.closest('body'); 

        const overlay = container.querySelector(overlayClass);
        if (overlay) {
            overlay.classList.toggle('visible-pop-up', isVisible);
        }
    }

    function setupButtonListeners(buttonSelector, overlaySelector, shouldShow) {
        document.querySelectorAll(buttonSelector).forEach(button => {
            button.addEventListener('click', () => toggleOverlay(button, overlaySelector, shouldShow));
        });
    }

    setupButtonListeners('.repair-request.popup-webform', '.webform-popup-overlay', true);
    setupButtonListeners('.webform-close-btn', '.webform-popup-overlay', false);
    setupButtonListeners('.policy-link', '.policy-overlay', true);
    setupButtonListeners('.policy-close-btn', '.policy-overlay', false);

});
