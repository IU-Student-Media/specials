$(document).ready(function(){

var $window = $(window); //You forgot this line in the above example

$('section[data-type="background"]').each(function(){
var $bgobj = $(this); // assigning the object
$(window).scroll(function() {
var yPos = -( ($window.scrollTop() + 400) / $bgobj.data('speed'));
// Put together our final background position
var coords = '50% '+ yPos + 'px';
// Move the background
//$bgobj.css({ backgroundPosition: coords });
});
});
});

// Create HTML5 elements for IE
          
                    document.createElement("article");
                    document.createElement("section");

