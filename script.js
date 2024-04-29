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
const burgerMenu = document.querySelector('.burger-menu');
burgerMenu.addEventListener('click', () => {
    if (burgerMenu.style.width === "56px") {
        burgerMenu.style.width = "32px";
        burgerMenu.style.alignSelf = "flex-start";
        burgerMenu.src = "assets/svgs/burger-menu.open.svg";
    } else {
        burgerMenu.style.width = "56px";
        burgerMenu.style.alignSelf = "center";
        burgerMenu.src = "assets/svgs/burger-menu.close.svg";
    }
});