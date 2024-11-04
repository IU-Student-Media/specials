'use strict';

/*
    DROPDOWN MENU
    Adapted from Erika Lee's I360 course: https://codepen.io/ebigalee/pen/dyydovo
*/
// TODO: This is different than that provided by template, and will need to be updated.
function toggleDropdown() {
    let nav_links = document.getElementsByClassName('item')
    Array.from(nav_links).forEach(e => e.classList.toggle('show'))
}
document.querySelector('.toggle').addEventListener('click', toggleDropdown);
