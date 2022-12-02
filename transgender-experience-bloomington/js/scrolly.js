'use strict';

/***************************************
*   SCROLLYTELLING GRAPHIC             *
***************************************/

// select DOM elements
const scrolly = document.querySelector('.scrolly');
console.log(scrolly)
const arrow = document.querySelector('.arrow');

// insert image divs
const graphicDiv = document.querySelector('.graphic');
for (let i = 0; i < 5; i++) {
    let html;
    html = `<div class="image"></div>`;
    graphicDiv.insertAdjacentHTML('beforeend', html);
}

const imageURLS = [
    'https://s3.amazonaws.com/snwceomedia/ids/5f0a60e5-c5fe-4c67-8769-e823ad2b2dc2.sized-1000x1000.JPG',
    'https://s3.amazonaws.com/snwceomedia/ids/f7798683-3c36-43a1-9794-5e8290505671.sized-1000x1000.jpg',
    'https://s3.amazonaws.com/snwceomedia/ids/39d30580-9ceb-4c75-87e2-080a17389581.sized-1000x1000.JPG',
    'https://s3.amazonaws.com/snwceomedia/ids/fbbf0782-ad30-4608-a9f9-e534aa353cd2.sized-1000x1000.jpg',
    'https://s3.amazonaws.com/snwceomedia/ids/a937da7a-f06e-4d6c-a438-acb5bbccb649.sized-1000x1000.jpg',
];

// insert background images
const imageDivs = document.querySelectorAll('.graphic div.image');

imageDivs.forEach((div, index) => {
    div.style.backgroundImage = `url(${imageURLS[index]})`;
})

let placedImages = Array.from(document.querySelectorAll('.image'));

placedImages[0].style.opacity = 1;
console.log(placedImages)
// initialize scrollama
// this is basically saying, go ahead and use the scrollama library we imported in the html
const scroller = scrollama();

// // scrollama event handlers
// the step enter function controls what happens when a text box enters on the page
function handleStepEnter(event) {

    let index = event.element.dataset.step;
    // check the console. it should print this every time a text box crosses the threshold
    console.log('enter', index);

    if (event.direction === 'down') {
        // set both mobile and desktop divs to visible
        // media queries will show/hide them depending on the screen width
        if (index == 2) {
            placedImages[1].style.opacity = 1;
            arrow.style.opacity = 0;

        } else if (index == 3) {
            placedImages[2].style.opacity = 1;
        }
            else if (index == 4) {
        placedImages[3].style.opacity = 1;
        }
            else if (index == 5) {
        placedImages[4].style.opacity = 1;
        }
    }

}

function handleStepExit(event) {

    if (event.direction === 'up') {
        // set both mobile and desktop divs to hidden
        // media queries will show/hide them depending on the screen width
        let index = event.element.dataset.step;
        console.log('exit', index);
        if (index == 1) {
            arrow.style.opacity = 1;

        } else if (index == 2) {

            placedImages[1].style.opacity = 0;

        } else if (index == 3) {
            placedImages[2].style.opacity = 0;

        }
            else if (index == 4) {
            placedImages[3].style.opacity = 0;

        }
            else if (index == 5) {
            placedImages[4].style.opacity = 0;

        }
    }
}

scroller
    .setup({
        step: '.step',
        // debug: true,
        offset: 1
    })
    .onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit);
