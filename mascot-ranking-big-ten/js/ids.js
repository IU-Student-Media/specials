'use strict';

/*
    TRANSPARENT NAVBAR TRANSITION
*/
// define elements from DOM
const nav = document.querySelector('nav');
const slug = document.querySelector('.logo span');
const header = document.querySelector('header');
function checkScroll() { // callback function 
    let startY = header.offsetHeight * 0.6; //The point where the navbar changes in px
    // check whether scroll position is above/below target
    // toggle css styles accordingly
    if(window.scrollY > startY) { 
        nav.style.backgroundColor = 'black';
        slug.style.display = 'block';
    } else {
        nav.style.backgroundColor = 'transparent';
        slug.style.display = 'none';
    }
}
window.addEventListener('scroll', checkScroll);

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
$.fn.moveIt = function() {
var $window = $(window);
var instances = [];

$(this).each(function() {
    instances.push(new moveItItem($(this)));
});

window.addEventListener('scroll', function() {
    var scrollTop = $window.scrollTop();
    instances.forEach(function(inst){
    inst.update(scrollTop);
    });
}, {passive: true});
}

var moveItItem = function(el) {
    this.el = $(el);
    this.speed = parseInt(this.el.attr('data-scroll-speed'));
};

moveItItem.prototype.update = function(scrollTop) {
    this.el.css('transform', 'translateY(' + -(scrollTop / this.speed) + 'px)');
};

// Initialization
$(function() {
    $('[data-scroll-speed]').moveIt();
});
