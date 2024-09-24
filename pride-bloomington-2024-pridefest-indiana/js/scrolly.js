// using d3 for convenience
var main = d3.select("main");
var scrolly = main.select("#scrolly");
var figure = scrolly.select("figure");
var article = scrolly.select("article");
var step = article.selectAll(".step");

// initialize the scrollama
var scroller = scrollama();

const scrollImgs = document.querySelectorAll('.scroll-img');


// generic window resize listener event
function handleResize() {
    // 1. update height of step elements
    var stepH = Math.floor(window.innerHeight * 0.75);
    step.style("height", stepH + "px");

    var figureHeight = window.innerHeight;
    var figureMarginTop = (window.innerHeight - figureHeight) / 2;

    figure
        .style("height", figureHeight + "px")
        .style("top", "0px");

    // 3. tell scrollama to update new element dimensions
    scroller.resize();
}

// scrollama event handlers
function handleStepEnter(response) {
    // console.log(response);
    // response = { element, direction, index }

    // add color to current step only
    step.classed("is-active", function (d, i) {
        return i === response.index;
    });

    // update graphic based on step
    // console.log(response.index + 1)
    // figure.select("p").text(response.index + 1);

    // console.log(response.direction);
    if (response.direction == 'down' && response.index > 0) {
    }
    if (response.direction == 'up' && response.index < scrollImgs.length - 1) {
        scrollImgs[response.index+1].style.opacity=0;
    }
    scrollImgs[response.index].style.opacity=1;
    figure.background
}


function init() {

    scrollImgs[0].style.opacity=1;

    // 1. force a resize on load to ensure proper dimensions are sent to scrollama
    handleResize();

    // 2. setup the scroller passing options
    // 		this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)
    scroller
        .setup({
            step: "#scrolly article .step",
            offset: 0.33,
            debug: false
        })
        .onStepEnter(handleStepEnter);
}

// kick things off
init();