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
        // nav.style.backgroundColor = 'transparent';
        // slug.style.display = 'none';
    }
}
window.addEventListener('scroll', checkScroll);

/*
    DROPDOWN MENU
    Adapted from Erika Lee's I360 course: https://codepen.io/ebigalee/pen/dyydovo
*/
function toggleDropdown() {
    const socials = document.getElementsByClassName('item');
    console.log(socials);
    for(let i=0; i<socials.length; ++i) socials[i].classList.toggle('show');
    // socials.classList.toggle('show');
}
document.querySelector('.toggle').addEventListener('click', toggleDropdown);


const accordions = document.getElementsByClassName('accordion');
let open = [];
for(let i=0; i<accordions.length; ++i){
    open.push(false);
    accordions[i].addEventListener('click', e => {
        accordions[i].classList.toggle('accordion-open');
        open[i] = !open[i];

        accordions[i].style.maxHeight = open[i] ? accordions[i].scrollHeight + "px" : "80px";

        accordions[i].getElementsByClassName('term-icon')[0].innerText = open[i] ? '-' : '+';
    });
}


const tooltipContainers = document.getElementsByClassName('tooltip-container');

document.getElementById("page-header").addEventListener("click", e => {
    for(let i=0; i<tooltipContainers.length; ++i) tooltipContainers[i].classList.remove('tooltip-visible');  
});


for(let i=0; i<tooltipContainers.length; ++i){
    tooltipContainers[i].addEventListener('click', e => {
        tooltipContainers[i].classList.toggle('tooltip-visible')
        e.stopPropagation();
    });
}



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
