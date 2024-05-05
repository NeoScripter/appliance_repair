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
            e.preventDefault();
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
    function toggleArrow(arrowBtn) {
        const isNormal = arrowBtn.src.endsWith("normal.svg");

        if (isNormal) {
            arrowBtn.src = arrowBtn.src.replace("normal.svg", "hover.svg");
        } else {
            arrowBtn.src = arrowBtn.src.replace("hover.svg", "normal.svg");
        }
    }

    const arrowBtns = document.querySelectorAll('.carousel-arrow');
    arrowBtns.forEach((button) => {
        
        button.addEventListener('mouseover', () => {
            toggleArrow(button);
        });

        button.addEventListener('mouseout', () => {
            toggleArrow(button);
        });
    });

    const faqIcons = document.querySelectorAll('.faq-icon');
    faqIcons.forEach((button) => {
        
        button.addEventListener('mouseover', () => {
            toggleArrow(button);
        });

        button.addEventListener('mouseout', () => {
            toggleArrow(button);
        });
    });

    // Hidable FAQ sections

    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach((question) => {
        const closestIcon = question.querySelector('.faq-icon');
        closestIcon.addEventListener('click', () => {
            const closestAnswer = question.closest('.faq-question').querySelector('.faq-answer');
            if (getComputedStyle(closestAnswer).height === "0px") {
                closestAnswer.style.display = 'block';
                closestAnswer.style.marginTop = '24px';
                const height = closestAnswer.scrollHeight + "px";

                closestIcon.src = closestIcon.src.replace("hover.svg", "active.svg");
                
                closestAnswer.style.height = "0";
                closestAnswer.style.opacity = "0";
                requestAnimationFrame(() => {
                    closestAnswer.style.height = height;
                    closestAnswer.style.opacity = "1";
                });
            } else {
                closestAnswer.style.height = "0";
                closestAnswer.style.opacity = "0";
                closestIcon.src = closestIcon.src.replace("active.svg", "hover.svg");
                setTimeout(() => {
                    closestAnswer.style.marginTop = '0px';
                }, 250);
                setTimeout(() => {
                    closestAnswer.style.display = 'none';
                }, 500);
            }
        });
    });

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

    const repairRequestBtns = document.querySelectorAll('.repair-request.popup-webform');
    const closeRequestPopUpForm = document.querySelectorAll('.webform-close-btn');
    repairRequestBtns.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.webform-popup-overlay').classList.add('visible-pop-up');
        })
    });
    closeRequestPopUpForm.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.webform-popup-overlay').classList.remove('visible-pop-up');
        })
    });

    const policyBtns = document.querySelectorAll('.policy-link');
    const closePolicyBtn = document.querySelectorAll('.policy-close-btn');
    policyBtns.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.policy-overlay').classList.add('visible-pop-up');
        })
    });
    closePolicyBtn.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelector('.policy-overlay').classList.remove('visible-pop-up');
        })
    });

});
