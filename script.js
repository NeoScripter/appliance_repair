document.addEventListener("DOMContentLoaded", function() {
// Social links animaition
const whatsappLink = document.querySelector('.social-link.whatsapp');
const whatsappIcon = document.querySelector('.whatsapp .icon-social');
const viberLink = document.querySelector('.social-link.viber');
const viberIcon = document.querySelector('.viber .icon-social');

const whatsappLinkPopUp = document.querySelector('.social-link.whatsapp.pop-up');
const whatsappIconPopUp = document.querySelector('.whatsapp .icon-social.pop-up');
const viberLinkPopUp = document.querySelector('.social-link.viber.pop-up');
const viberIconPopUp = document.querySelector('.viber .icon-social.pop-up');


function addSocialLinksEventListeners(link, icon, path) {
    link.addEventListener('mouseover', () => {
        icon.src = `assets/svgs/${path}.hover.svg`;
        link.addEventListener('mouseout', () => {
            icon.src = `assets/svgs/${path}.normal.svg`;
        });
    });
}

addSocialLinksEventListeners(whatsappLink, whatsappIcon, 'whatsapp');
addSocialLinksEventListeners(viberLink, viberIcon, 'viber');
addSocialLinksEventListeners(whatsappLinkPopUp, whatsappIconPopUp, 'whatsapp');
addSocialLinksEventListeners(viberLinkPopUp, viberIconPopUp, 'viber');

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
        overlay.style.display = 'none'
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
    const track = document.querySelector('.carousel-track');
    const items = Array.from(track.children);
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    const itemWidth = items[0].getBoundingClientRect().width;
    let currentSlide = 0;

    // Move the track
    function moveTrack(position) {
        track.style.transform = `translateX(-${position}px)`;
    }

    nextButton.addEventListener('click', () => {
        if (currentSlide < items.length - 1) {
            currentSlide++;
            moveTrack(itemWidth * currentSlide);
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            moveTrack(itemWidth * currentSlide);
        }
    });

    
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

// Code that makes the sections gradually appear and disappear

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
});
