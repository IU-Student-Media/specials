'use strict';

/* 
    HEADLINE ANIMATION
*/
//#region Headline Animation
var textTitle = "‘We have seen the worst’";

var typeText = []
typeText.push(textTitle)

const textSpeed = 40
const currentScrollAt = 0
var currentIndex = 0
var currentArrLength = typeText[0].length
var currentTextPos = 0
var stringContent = ''
var currentRow = 0

var isDisabled = true

function typewriter(selector) {

    stringContent = '  '
    currentRow = Math.max(0, currentIndex - currentScrollAt)

    while (currentRow < currentIndex) {
        stringContent += typeText[currentRow++] + "<br/>"
    }

    var textPrint = stringContent + typeText[currentIndex].substring(0, currentTextPos)
    $(selector).text(textPrint)

    if (currentTextPos++ == currentArrLength) {
        currentTextPos = 0
        currentIndex++
        if (currentIndex != typeText.length) {
            currentArrLength = typeText[currentIndex].length
            setTimeout(() => {
                typewriter(selector)
            }, 700);
        }
        else {
            isDisabled = false
            $("#abstract").delay(500).animate({ "opacity": "1" }, 500);
        }
    }
    else {
        setTimeout(() => {
            typewriter(selector)
        }, textSpeed);
    }
}
//#endregion


/*
    CHECK IF ELEMENT IS IN VIEW
*/
//#region Check element in view
scrolledIntoView();
$(window).on("scroll", function () {
    scrolledIntoView();
})

function scrolledIntoView() {
    var scrollTop = $(window).scrollTop();
    var scrollBottom = scrollTop + $(window).height();

    $(".load-wait").each(function () {
        var elemTop = $(this).offset().top;
        if ((elemTop <= scrollBottom) && (elemTop >= scrollTop)) {
            $(this).addClass("load-now");
            $(this).removeClass("load-wait");
        }
    })

    $(".highlight").each(function () {
        var elemTop = $(this).offset().top;
        if ((elemTop <= scrollBottom) && (elemTop >= scrollTop)) {
            $(this).addClass("active");
        }
    })
}
//#endregion

/*
    TRANSPARENT NAVBAR TRANSITION
*/
//#region Transparent Navbar Transition
// define elements from DOM
const nav = document.querySelector('nav');
const slug = document.querySelector('.logo span');
const header = document.querySelector('header');
function checkScroll() { // callback function 
    let startY = header.offsetHeight * 0.6; //The point where the navbar changes in px
    // check whether scroll position is above/below target
    // toggle css styles accordingly
    if (window.scrollY > startY) {
        nav.style.backgroundColor = 'black';
        slug.style.display = 'block';
    } else {
        nav.style.backgroundColor = 'transparent';
        slug.style.display = 'none';
    }
}
window.addEventListener('scroll', checkScroll);
//#endregion

/*
    DROPDOWN MENU
    Adapted from Erika Lee's I360 course: https://codepen.io/ebigalee/pen/dyydovo
*/
//#region Dropdown Menu
function toggleDropdown() {
    const socials = document.querySelector('.item');
    socials.classList.toggle('show');
}
document.querySelector('.toggle').addEventListener('click', toggleDropdown);
//#endregion

/*
    DATA SCROLL SPEED
*/
//#region Data Scroll Speed
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
//#endregion

/*
    PAGE LOADER
*/
var elements = $("#page-loader > .load-objects");
var index = 0;

var loadNext = null;
loadNext = function () {
    var element = elements.eq(index);
    console.log(element)
    $(element).addClass("active")
    if (index < elements.length) {
        index++;
        setTimeout(loadNext, 500);
    }
}


// Initialization
$(function () {
    $('[data-scroll-speed]').moveIt();

    loadNext(); //  Page Loader Function

    setTimeout(function () {
        $('loader').fadeOut('slow');
        typewriter("#headline");
    }, 1500);

});