'use strict';

/***************************************
*   SCROLLYTELLING GRAPHIC             *
***************************************/

// select DOM elements
const scrolly = document.querySelector('.scrolly');
const arrow = document.querySelector('.arrow');

// insert image divs
const graphicDiv = document.querySelector('.graphic');
for (let i = 0; i<24; i++) {
    let html;
    html = `<div class="image scrolly-show-desktop"></div>`;
    if (i < 12) {
        html = `<div class="image scrolly-show-desktop"></div>`;
    } else {
        html = `<div class="image scrolly-show-mobile"></div>`;
    }
    graphicDiv.insertAdjacentHTML('beforeend', html);
}

const mobileURLS = [
    // 'images/mobile-1.png',
    // 'images/mobile-2.png',
    // 'images/mobile-3.png',
    // 'images/mobile-4.png',
    // 'images/mobile-svg-02.svg',
    // 'images/mobile-svg-03.svg',
    // 'images/mobile-svg-04.svg',
    // 'images/mobile-svg-05.svg',
    // 'images/mobile-svg-06.svg',
    // 'images/mobile-svg-07.svg',
    // 'images/mobile-svg-08.svg'

    'https://s3.amazonaws.com/snwceomedia/ids/3427f4a3-25b7-4a01-a07e-801bf127aca5.sized-1000x1000.png',
    'https://s3.amazonaws.com/snwceomedia/ids/848e49a5-d059-4273-bc3b-c3d9182fc4ac.sized-1000x1000.png',
    'https://s3.amazonaws.com/snwceomedia/ids/747af9fd-793f-4901-8f41-408a0b47e8b2.sized-1000x1000.png',
    'https://s3.amazonaws.com/snwceomedia/ids/f40dd7c7-2c91-490c-b048-1696c46f365b.sized-1000x1000.png',
    'https://s3.amazonaws.com/snwceomedia/ids/eac4c807-3292-4cd6-a614-a73adc808eca.original.svg',
    'https://s3.amazonaws.com/snwceomedia/ids/d2386a3c-2e86-400f-a543-f16df0ce6cb2.original.svg',
    'https://s3.amazonaws.com/snwceomedia/ids/83cd9170-f10a-47de-9045-72457aa02d30.original.svg',
    'https://s3.amazonaws.com/snwceomedia/ids/b582d813-daf0-4ea5-8795-47b439811c3f.original.svg',
    'https://s3.amazonaws.com/snwceomedia/ids/64a7965e-717b-41c3-816b-a467d3112226.original.svg',
    'https://s3.amazonaws.com/snwceomedia/ids/7e75de14-e506-470c-ad1f-12148d1cdf58.original.svg',
    'https://s3.amazonaws.com/snwceomedia/ids/b757addb-e91d-4727-a490-6f0dc29cb6f7.original.svg'
];
const desktopURLS = [
    // 'images/desktop-1.png',
    // 'images/desktop-2.png',
    // 'images/desktop-3.png',
    // 'images/desktop-4.png',
    // 'images/desktop-names-02.svg',
    // 'images/desktop-names-03.svg',
    // 'images/desktop-names-04.svg',
    // 'images/desktop-names-05.svg',
    // 'images/desktop-names-06.svg',
    // 'images/desktop-names-07.svg',
    // 'images/desktop-names-08.svg'
    
    'https://s3.amazonaws.com/snwceomedia/ids/b44ba039-d488-4768-8fb6-6bcc6b107362.sized-1000x1000.png',
    'https://s3.amazonaws.com/snwceomedia/ids/7a3243ab-a2b7-4c32-940d-7b6de9cd0a44.sized-1000x1000.png',
    'https://s3.amazonaws.com/snwceomedia/ids/7aedd69f-3aa2-4128-b7f7-9fcede80db72.sized-1000x1000.png',
    'https://s3.amazonaws.com/snwceomedia/ids/1a0a9950-1074-4950-a0fc-4c9f288b7056.sized-1000x1000.png',
    'https://s3.amazonaws.com/snwceomedia/ids/103ae562-d4ec-4e3b-86a6-a50fa3d5f507.original.svg',
    'https://s3.amazonaws.com/snwceomedia/ids/c707c4e2-96de-4317-bd5b-873e5444380c.original.svg',
    'https://s3.amazonaws.com/snwceomedia/ids/8ea4b3e2-40ee-401a-97ee-0c4f46e88d26.original.svg',
    'https://s3.amazonaws.com/snwceomedia/ids/02902ed8-b099-47ca-94a7-66341983b772.original.svg',
    'https://s3.amazonaws.com/snwceomedia/ids/1a27d936-b74f-4c20-9a75-073e346cf2a9.original.svg',
    'https://s3.amazonaws.com/snwceomedia/ids/2c58de04-776e-4219-afb1-689c41dddb8e.original.svg',
    'https://s3.amazonaws.com/snwceomedia/ids/95e27b84-8942-472b-87bd-7b416f379521.original.svg'

];

// insert background images
const mobileDivs = document.querySelectorAll('.graphic div.image.scrolly-show-mobile');
const desktopDivs = document.querySelectorAll('.graphic div.image.scrolly-show-desktop');
mobileDivs.forEach( (div, index) => {
    div.dataset.src = 'src';
    div.style.backgroundImage = `url(${mobileURLS[index]})`;
})
desktopDivs.forEach( (div, index) => {
    div.style.backgroundImage = `url(${desktopURLS[index]})`;
})

let desktopImages = Array.from(document.querySelectorAll('.image.scrolly-show-desktop'));
let mobileImages = Array.from(document.querySelectorAll('.image.scrolly-show-mobile'));

mobileImages[0].style.opacity = 1;
desktopImages[0].style.opacity = 1;

// initialize scrollama
let scroller = scrollama();

// scrollama event handlers
function handleStepEnter(event) {

    let index = event.element.dataset.step;
    // console.log('enter', index);

    if (event.direction === 'down') { 
        // set both mobile and desktop divs to visible
        // media queries will show/hide them depending on the screen width
        if (index == 1) { // zoomed in pic of cemetery // hide arrow
            mobileImages[1].style.opacity = 1;
            desktopImages[1].style.opacity = 1;

            arrow.style.opacity = 0;

        } else if (index == 2) { // infant row

            desktopImages[4].style.opacity = 1;
            mobileImages[4].style.opacity = 1;

        } else if (index == 3) { // hoagy
            desktopImages[5].style.opacity = 1;
            mobileImages[5].style.opacity = 1;

        } else if (index == 4) { // shively
            desktopImages[6].style.opacity = 1;
            mobileImages[6].style.opacity = 1;

        } else if (index == 5) { // eagleson
            desktopImages[7].style.opacity = 1;
            mobileImages[7].style.opacity = 1;

        } else if (index == 6) { // atwater
            desktopImages[8].style.opacity = 1;
            mobileImages[8].style.opacity = 1;

        } else if (index == 7) { // crafton
            desktopImages[9].style.opacity = 1;
            mobileImages[9].style.opacity = 1;

        } else if (index == 8) { // ferguson
            desktopImages[10].style.opacity = 1;
            mobileImages[10].style.opacity = 1;

        } else if (index == 9) { // hide markers, show plots

            desktopImages.slice(4).forEach( (img) => { 
                img.style.opacity = 0; 
            });
            desktopImages[2].style.opacity = 1;
            mobileImages.slice(4).forEach( (img) => { 
                img.style.opacity = 0; 
            });
            mobileImages[2].style.opacity = 1;

        } else if (index == 10) { // hide plots, show yellow box
            desktopImages[2].style.opacity = 0;
            desktopImages[3].style.opacity = 1;

            mobileImages[2].style.opacity = 0;
            mobileImages[3].style.opacity = 1;

        } else if (index == 11) { // zoom in on old section — most unmarked graves

            let screenwidth = screen.width;

            if (screenwidth > 1300) {
                desktopImages[3].style.transform = `scale(2.0) translate(-150px, -90px)`;
            } else {
                desktopImages[3].style.transform = `scale(2.5) translate(-150px, -70px)`;
            } 

            mobileImages[3].style.transform = `scale(2) translate(60px, -150px)`;

        } else if (index == 12) { // zoom out

            desktopImages[3].style.transform = `scale(1) translate(0, 0)`;
            desktopImages[1].style.opacity = 1;

            mobileImages[3].style.transform = `scale(1) translate(0, 0)`;
            mobileImages[1].style.opacity = 1;

        } else if (index == 13) { // hide yellow box
            desktopImages[3].style.opacity = 0;
            desktopImages[1].style.opacity = 1;

            mobileImages[3].style.opacity = 0;
            mobileImages[1].style.opacity = 1;
        }
    }


}

function handleStepExit(event) {

    if (event.direction === 'up') {

        // set both mobile and desktop divs to hidden
        // media queries will show/hide them depending on the screen width
        let index = event.element.dataset.step;
        // console.log('exit', index);
        if (index == 1) { // zoomed in pic of cemetery // hide arrow
            mobileImages[1].style.opacity = 0;
            desktopImages[1].style.opacity = 0;

            arrow.style.opacity = 1;

        } else if (index == 2) { // hoagy

            desktopImages[4].style.opacity = 0;
            mobileImages[4].style.opacity = 0;

        } else if (index == 3) { // jb
            desktopImages[5].style.opacity = 0;
            mobileImages[5].style.opacity = 0;

        } else if (index == 4) { // wylie
            desktopImages[6].style.opacity = 0;
            mobileImages[6].style.opacity = 0;

        } else if (index == 5) { // atwater
            desktopImages[7].style.opacity = 0;
            mobileImages[7].style.opacity = 0;

        } else if (index == 6) { // civil-war
            desktopImages[8].style.opacity = 0;
            mobileImages[8].style.opacity = 0;

        } else if (index == 7) { // infant-row
            desktopImages[9].style.opacity = 0;
            mobileImages[9].style.opacity = 0;

        } else if (index == 8) { // eagleson
            desktopImages[10].style.opacity = 0;
            mobileImages[10].style.opacity = 0;

        } else if (index == 9) { // hide markers, show plots

            desktopImages.slice(4).forEach( (img) => { 
                img.style.opacity = 1; 
            });
            desktopImages[2].style.opacity = 0;
            mobileImages.slice(4).forEach( (img) => { 
                img.style.opacity = 1; 
            });
            mobileImages[2].style.opacity = 0;

        } else if (index == 10) { // hide plots, show yellow box
            desktopImages[1].style.opacity = 1;
            desktopImages[2].style.opacity = 1;
            desktopImages[3].style.opacity = 0;

            mobileImages[1].style.opacity = 1;
            mobileImages[2].style.opacity = 1;
            mobileImages[3].style.opacity = 0;

        } else if (index == 11) { // zoom out

            desktopImages[3].style.transform = `scale(1) translate(0, 0)`;

            mobileImages[3].style.transform = `scale(1) translate(0, 0)`;

        } else if (index == 12) { // zoom in

            let screenwidth = screen.width;

            if (screenwidth > 1300) {
                desktopImages[3].style.transform = `scale(2.0) translate(-150px, -90px)`;
            } else {
                desktopImages[3].style.transform = `scale(2.5) translate(-150px, -70px)`;
            } 

            mobileImages[3].style.transform = `scale(2) translate(60px, -150px)`;


        } else if (index == 13) { // hide yellow box
            desktopImages[3].style.opacity = 1;
            desktopImages[1].style.opacity = 0;

            mobileImages[3].style.opacity = 1;
            mobileImages[1].style.opacity = 0;
        }
    }
}

scroller
    .setup({
        step: '.step',
        // debug: true,
        offset: .7
    })
    .onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit);
