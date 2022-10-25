'use strict';

/*
    TRANSPARENT NAVBAR TRANSITION
*/
// define elements from DOM
// const nav = document.querySelector('nav');
// const slug = document.querySelector('.logo span');
// const header = document.querySelector('header');
// function checkScroll() { // callback function 
//     let startY = header.offsetHeight * 0.6; //The point where the navbar changes in px
//     // check whether scroll position is above/below target
//     // toggle css styles accordingly
//     if (window.scrollY > startY) {
//         nav.style.backgroundColor = 'black';
//         slug.style.display = 'block';
//     } else {
//         nav.style.backgroundColor = 'rgba(0,0,0,.8)';
//         slug.style.display = 'none';
//     }
// }
// window.addEventListener('scroll', checkScroll);

/*
    SPOOKY SECTION BREAK
*/

const breaks = document.querySelectorAll('.section-break');
breaks.forEach((secBreak) => {
    secBreak.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
            <path d="M50.8 452.1L19.2 477.4c-2.1 1.7-4.7 2.6-7.4 2.6C5.3 480 0 474.7 0 468.2V192C0 86 86 0 192 0S384 86 384 192V468.2c0 6.5-5.3 11.8-11.8 11.8c-2.7 0-5.3-.9-7.4-2.6l-31.6-25.3c-3.3-2.7-7.5-4.1-11.8-4.1c-5.9 0-11.5 2.8-15 7.5l-37.6 50.1c-3 4-7.8 6.4-12.8 6.4s-9.8-2.4-12.8-6.4l-38.4-51.2c-3-4-7.8-6.4-12.8-6.4s-9.8 2.4-12.8 6.4l-38.4 51.2c-3 4-7.8 6.4-12.8 6.4s-9.8-2.4-12.8-6.4L77.6 455.5c-3.6-4.7-9.1-7.5-15-7.5c-4.3 0-8.4 1.5-11.7 4.1zM160 192c0-17.7-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32s32-14.3 32-32zm96 32c17.7 0 32-14.3 32-32s-14.3-32-32-32s-32 14.3-32 32s14.3 32 32 32z" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
            <path d="M416 398.9c58.5-41.1 96-104.1 96-174.9C512 100.3 397.4 0 256 0S0 100.3 0 224c0 70.7 37.5 133.8 96 174.9c0 .4 0 .7 0 1.1v64c0 26.5 21.5 48 48 48h48V464c0-8.8 7.2-16 16-16s16 7.2 16 16v48h64V464c0-8.8 7.2-16 16-16s16 7.2 16 16v48h48c26.5 0 48-21.5 48-48V400c0-.4 0-.7 0-1.1zM224 256c0 35.3-28.7 64-64 64s-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64zm128 64c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z"/>
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
            <!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. -->
            <path d="M190.4 32.6c4.8-12.4-1.4-26.3-13.8-31s-26.3 1.4-31 13.8L113.1 100c-7.9 20.7-3 44.1 12.7 59.7l57.4 57.4-80.4-26.8c-2.4-.8-4.3-2.7-5.1-5.1L78.8 128.4C74.6 115.8 61 109 48.4 113.2S29 131 33.2 143.6l18.9 56.8c5.6 16.7 18.7 29.8 35.4 35.4L148.1 256 87.6 276.2c-16.7 5.6-29.8 18.7-35.4 35.4L33.2 368.4C29 381 35.8 394.6 48.4 398.8s26.2-2.6 30.4-15.2l18.9-56.8c.8-2.4 2.7-4.3 5.1-5.1l80.4-26.8-57.4 57.4c-15.6 15.6-20.6 39-12.7 59.7l32.5 84.6c4.8 12.4 18.6 18.5 31 13.8s18.5-18.6 13.8-31l-32.5-84.6c-1.1-3-.4-6.3 1.8-8.5L192 353.9c1 52.1 43.6 94.1 96 94.1s95-41.9 96-94.1l32.3 32.3c2.2 2.2 2.9 5.6 1.8 8.5l-32.5 84.6c-4.8 12.4 1.4 26.3 13.8 31s26.3-1.4 31-13.8L462.9 412c7.9-20.7 3-44.1-12.7-59.7l-57.4-57.4 80.4 26.8c2.4 .8 4.3 2.7 5.1 5.1l18.9 56.8c4.2 12.6 17.8 19.4 30.4 15.2s19.4-17.8 15.2-30.4l-18.9-56.8c-5.6-16.7-18.7-29.8-35.4-35.4L427.9 256l60.5-20.2c16.7-5.6 29.8-18.7 35.4-35.4l18.9-56.8c4.2-12.6-2.6-26.2-15.2-30.4s-26.2 2.6-30.4 15.2l-18.9 56.8c-.8 2.4-2.7 4.3-5.1 5.1l-80.4 26.8 57.4-57.4c15.6-15.6 20.6-39 12.7-59.7L430.4 15.4C425.6 3 411.8-3.2 399.4 1.6s-18.5 18.6-13.8 31l32.5 84.6c1.1 3 .4 6.3-1.8 8.5L368 174.1V160c0-31.8-18.6-59.3-45.5-72.2c-9.1-4.4-18.5 3.3-18.5 13.4V112c0 8.8-7.2 16-16 16s-16-7.2-16-16V101.2c0-10.1-9.4-17.7-18.5-13.4C226.6 100.7 208 128.2 208 160v14.1l-48.3-48.3c-2.2-2.2-2.9-5.6-1.8-8.5l32.5-84.6z"/>
        </svg>`
})

/*
    DROPDOWN MENU
    Adapted from Erika Lee's I360 course: https://codepen.io/ebigalee/pen/dyydovo
*/
function toggleDropdown() {
    const socials = document.querySelector('.item');
    socials.classList.toggle('show');
}
document.querySelector('.toggle').addEventListener('click', toggleDropdown);

/*
    DATA SCROLL SPEED
*/
$.fn.moveIt = function () {
    var $window = $(window);
    var instances = [];

    $(this).each(function () {
        instances.push(new moveItItem($(this)));
    });

    window.addEventListener('scroll', function () {
        var scrollTop = $window.scrollTop();
        instances.forEach(function (inst) {
            inst.update(scrollTop);
        });
    }, { passive: true });
}

var moveItItem = function (el) {
    this.el = $(el);
    this.speed = parseInt(this.el.attr('data-scroll-speed'));
};

moveItItem.prototype.update = function (scrollTop) {
    this.el.css('transform', 'translateY(' + -(scrollTop / this.speed) + 'px)');
};

// Initialization
$(function () {
    $('[data-scroll-speed]').moveIt();
});
