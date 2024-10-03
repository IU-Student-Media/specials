'use strict';

const e = document.getElementById("booth-scroll");
console.log(e);

var w = $(window)
var scale = 0.1;
var offset = .3;

window.addEventListener('scroll', () => {
    var scrollTop = w.scrollTop();
    var h = w.height();

    console.log(scrollTop, h)

    e.style.top = Math.max(0,  scale*(h - scrollTop - (offset * h)) ) + "vh"
    e.style.right = Math.min(0, -(h-scrollTop-(offset * h))) + "px";

})

