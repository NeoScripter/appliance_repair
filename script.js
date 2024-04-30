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
const requestBtn = document.querySelector('.pop-up-btn.request');
const plusIcon = document.querySelector('.plus-sign-btn');
requestBtn.addEventListener('mouseover', () => {
    plusIcon.src = "assets/svgs/+white.svg";
    requestBtn.addEventListener('mouseout', () => {
        plusIcon.src = "assets/svgs/+orange.svg";
    });
});
