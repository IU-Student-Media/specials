'use strict';




/***************** 
* NUMBER OF IMAGES *
******************* */

const numImages = 12;


/***************************************
*   UTILITIES                          *
***************************************/
// detect page size to adjust scrollytelling/graphic 
let mobile;
if (window.innerWidth <= 600) {
    mobile = true;
}
window.addEventListener('resize', () => {
    if (window.innerWidth <= 600) {
        mobile = true;
    } else {
        mobile = false;
    }
});

/***************************************
*   SCROLLYTELLING GRAPHIC             *
***************************************/

// select DOM elements
const scrolly = document.querySelector('.scrolly');

// insert image divs
const graphicDiv = document.querySelector('.graphic');

const images = document.querySelectorAll('.scrolly figure');

images.forEach((figure) => figure.style.opacity = 0)

images[0].style.opacity = 1;

// Maintenance for footer stuff
document.querySelector('#foot').style.opacity = 0;
document.querySelector('.donate').style.opacity = 0;

document.querySelector('.timeline').style.opacity = 0;

// initialize scrollama
let scroller = scrollama();

// scrollama event handlers
function handleStepEnter(event) {

    let index = event.element.dataset.step;

    // console.log("enter", index);

    if (index == numImages) {
        document.querySelector('.sticky-image').style.opacity = 0;
        document.querySelector('#foot').style.opacity = 1;
        document.querySelector('.timeline').style.opacity = 0;
        document.querySelector('.donate').style.opacity = 1;
        document.querySelector('.sticky-image').style.pointerEvents = "none";
    } else {
        images[index].style.opacity = 1;

        // console.log("pain", index)

        if (index >= 1) {
            images[0].style.opacity = 0;
            console.log("your mom")
            document.querySelector('.headline-container').style.opacity = 0;
            document.querySelector('.timeline').style.opacity = 1;
        }
    }
}

function handleStepExit(event) {

    if (event.direction === 'up') {

        let index = event.element.dataset.step;
        // console.log("exit", index);
``
        if (index == numImages) {
            document.querySelector('.sticky-image').style.opacity = 1;
            document.querySelector('.timeline').style.opacity = 1;
            document.querySelector('#foot').style.opacity = 0;
            document.querySelector('.donate').style.opacity = 0;
            document.querySelector('.sticky-image').style.pointerEvents = "initial";
        } else {
            images[index].style.opacity = 0;

            if (index == 1) {
                images[0].style.opacity = 1;
                document.querySelector('.headline-container').style.opacity = 1;
                document.querySelector('.timeline').style.opacity = 0;
            }
        }
    }
}

scroller
    .setup({
        step: '.step',
        // debug: true,
        offset: 1,
    })
    .onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit);

