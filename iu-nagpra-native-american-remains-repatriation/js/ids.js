'use strict';

/*
    TRANSPARENT NAVBAR TRANSITION
*/
// define elements from DOM
const nav = document.querySelector('nav');
document.querySelector('.logo span').style.display = 'block';
const header = document.querySelector('header');
// function checkScroll() { // callback function 
//     let startY = header.offsetHeight * 0.6; //The point where the navbar changes in px
//     // check whether scroll position is above/below target
//     // toggle css styles accordingly
//     if(window.scrollY > startY) { 
//         nav.style.backgroundColor = 'black';
//         slug.style.display = 'block';
//     } else {
//         nav.style.backgroundColor = 'transparent';
//         slug.style.display = 'none';
//     }
// }
// window.addEventListener('scroll', checkScroll);

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


// html table
const tableDiv = document.querySelector('#inventory-table');
// tableDiv.innerHTML = '<'

// let tableData = []
let tableHTML = '';
d3.csv('files/inventory-reports.csv', (row, i) => {
    // let tableHTML;
    if (i === 0) {
        tableHTML += '<thead><tr>'
        // console.log('first object')
        Object.keys(row).forEach((item, j) => {
            // console.log(item)
            tableHTML += `<th ${j == 0 ? 'style="width:13%;text-align:left;"' : ''} ${j == 3 | j == 4 ? 'style="text-align:right;"' : 'style="text-align:left;"'}>${item}</th>`
        })
        tableHTML += '</thead></tr><tbody>'
    }

    Object.values(row).forEach((item, j) => {
        // console.log(item)
        tableHTML += `<td ${j == 3 | j == 4 ? 'style="text-align:right;"' : ''}>${item}</td>`
    })
    tableHTML += '</tr>'

    // tableDiv.insertAdjacentHTML('beforeend', tableHTML)
    // console.log(tableData)
});

setTimeout(afterLoad, 300);

function afterLoad() {
    console.log('timeout')
    console.log(tableHTML)
    tableDiv.insertAdjacentHTML('beforeend', tableHTML)
}

