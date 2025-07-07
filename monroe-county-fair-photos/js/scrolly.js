
'use strict';

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


// initialize scrollama
let scroller = scrollama();

// scrollama event handlers
function handleStepEnter(event) {

    let index = event.element.dataset.step;

    console.log(index);
    nav.style.backgroundColor = "transparent";

    if (index == 15) {
        document.querySelector('.sticky-image').style.opacity = 0;
        document.querySelector('.sticky-image').style.pointerEvents = "none";
        nav.style.backgroundColor = "black";
    } else {
        images[index].style.opacity = 1;
        if (index != 0) {
            images[index-1].style.opacity = 0;
        }
    }

}

function handleStepExit(event) {

    if (event.direction === 'up') {
        nav.style.backgroundColor = "transparent";

        let index = event.element.dataset.step;

        if (index == 15) {
            document.querySelector('.sticky-image').style.opacity = 1;
            document.querySelector('.sticky-image').style.pointerEvents = "initial";
        } else {
            images[index].style.opacity = 0;

            if (index != 0) {
                images[index-1].style.opacity = 1;
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


    
