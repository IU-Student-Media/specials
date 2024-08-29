'use strict';

/*
    DATA SCROLL SPEED FOR HORIZONTAL SIGN
    - Adapted from ids.js
*/
$.fn.moveItHorizontal = function() {
var $window = $(window);
var instances = [];

$(this).each(function() {
    instances.push(new moveItHorizItem($(this)));
});

window.addEventListener('scroll', function() {
    var scrollTop = $window.scrollTop();
    instances.forEach(function(inst){
    inst.update(scrollTop);
    });
}, {passive: true});
}

var moveItHorizItem = function(el) {
    this.el = $(el);
    this.hspeed = parseInt(this.el.attr('horiz-scroll-speed'));
};

moveItHorizItem.prototype.update = function(scrollTop) {
    this.el.css('transform', 'translateX(' + -(scrollTop / this.hspeed) + 'px');
};

// Initialization
$(function() {
    $('[horiz-scroll-speed]').moveItHorizontal();
});
    