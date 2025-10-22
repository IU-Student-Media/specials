'use strict';

/*
    DROPDOWN MENU
    Adapted from Erika Lee's I360 course: https://codepen.io/ebigalee/pen/dyydovo
*/
function toggleDropdown() {
    const socials = document.querySelector('.item');
    socials.classList.toggle('socials-show');
}
document.querySelector('.toggle').addEventListener('click', toggleDropdown);
