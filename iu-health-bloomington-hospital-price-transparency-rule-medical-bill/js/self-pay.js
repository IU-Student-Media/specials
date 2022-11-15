'use strict';
console.log('self pay script working');

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
const arrow = document.querySelector('.arrow');

// insert image divs
const graphicDiv = document.querySelector('.graphic');
for (let i = 0; i < 12; i++) {
    let html;
    if (i < 6) {
        html = `<div class="image show-desktop"></div>`;
    } else {
        html = `<div class="image show-mobile"></div>`;
    }
    graphicDiv.insertAdjacentHTML('beforeend', html);
}

const mobileURLS = [
    'https://s3.amazonaws.com/snwceomedia/ids/75959090-c743-4dd3-8856-76644390ade8.sized-1000x1000.png',
    'https://s3.amazonaws.com/snwceomedia/ids/3c1b84dc-c05e-4740-847a-65206c450b0c.sized-1000x1000.png',
    'https://s3.amazonaws.com/snwceomedia/ids/8a6030e3-7b61-45c4-9bbc-1856ddbde871.sized-1000x1000.png',
    'https://s3.amazonaws.com/snwceomedia/ids/2c107828-6f39-4237-b250-bdd7a8abefcf.sized-1000x1000.png',
    'https://s3.amazonaws.com/snwceomedia/ids/7faed370-883f-4f60-b8cb-d9ccd309855a.sized-1000x1000.png',
    'https://s3.amazonaws.com/snwceomedia/ids/62b520ff-3f48-43ce-901d-534da9c378a8.sized-1000x1000.png'
];
const desktopURLS = [
    'https://s3.amazonaws.com/snwceomedia/ids/03594f68-06c9-423b-94f5-32a77a60c328.sized-1000x1000.png',
    'https://s3.amazonaws.com/snwceomedia/ids/a5f8702b-c364-4bef-b453-d957f16efc1f.sized-1000x1000.png',
    'https://s3.amazonaws.com/snwceomedia/ids/0b8d1d33-cddf-4035-8382-920ce45747d5.sized-1000x1000.png',
    'https://s3.amazonaws.com/snwceomedia/ids/1557fab9-2d4a-49c4-be6e-b15fc41fac65.sized-1000x1000.png',
    'https://s3.amazonaws.com/snwceomedia/ids/75314f26-3016-4f01-9552-cf40bfba46fa.sized-1000x1000.png'
];

// insert background images
const mobileDivs = document.querySelectorAll('.graphic div.image.show-mobile');
const desktopDivs = document.querySelectorAll('.graphic div.image.show-desktop');

mobileDivs.forEach((div, index) => {
    div.style.backgroundImage = `url(${mobileURLS[index]})`;
    // div.style.background = `rgba('red',.2)`;
})
desktopDivs.forEach((div, index) => {
    div.style.backgroundImage = `url(${desktopURLS[index]})`;
    // div.style.background = `rgba('0,0,0',.2)`;
    // div.innerHTML = `<p style="margin-top:${60 * (index + 1)}px;">${(index.toString())}</p>`;
})

const desktopImages = document.querySelectorAll('.image.show-desktop');
const mobileImages = document.querySelectorAll('.image.show-mobile');

if (mobile) {
    mobileImages[0].style.opacity = 1;
} else {
    desktopImages[0].style.opacity = 1;
}

// initialize scrollama
let scroller = scrollama();

/* Progress bar */
// source: https://codepen.io/pierrinho/pen/rQqGOZ?css-preprocessor=sass
let scrollTop = window.scrollY;
let scrollPercent = (scrollTop - scrolly.offsetTop) / (scrolly.offsetHeight - window.innerHeight) * 100;
let progressBar = document.querySelector('#js-progressbar');
progressBar.setAttribute('value', scrollPercent);

window.addEventListener('scroll', function () {
    scrollPercent = (window.scrollY - scrolly.offsetTop) / (scrolly.offsetHeight - window.innerHeight) * 100;
    progressBar.setAttribute('value', scrollPercent);
});

// scrollama event handlers
function handleStepEnter(event) {

    let index = event.element.dataset.step;
    // console.log(index)
    // set both mobile and desktop divs to visible
    // media queries will show/hide them depending on the screen width
    mobileImages[index].style.opacity = 1;
    desktopImages[index].style.opacity = 1;

    if (index == 2) {
        arrow.style.opacity = 0;
    }

}

function handleStepExit(event) {

    if (event.direction === 'up') {
        // set both mobile and desktop divs to hidden
        // media queries will show/hide them depending on the screen width
        let index = event.element.dataset.step;

        // console.log(index)

        mobileImages[index].style.opacity = 0;
        desktopImages[index].style.opacity = 0;
        if (index == 1) {
            arrow.style.opacity = 1;
        }
    }
}

scroller
    .setup({
        step: '.step',
        // debug: true,
        offset: .9,
    })
    .onStepEnter(handleStepEnter)
    .onStepExit(handleStepExit);


/***************************************
*   TOOLTIPS                           *
***************************************/
const tooltipDescr = {
    'chemo': '"In this procedure, the provider administers the chemotherapy drug into an artery using an infusion technique. Infusion takes place through an implantable or portable pump and lasts more than 8 hours. Use this code for infusion initiation."',
    'epipen': '"A therapeutic, prophylactic, or diagnostic substance (a fluid, a drug, etc.) is injected via intramuscular or subcutaneous route into the patient\'s body. The procedure is performed by the physician themself or by their assistant or nurse under direct supervision of the physician. Injection of a vaccine or toxoid is not included in this code. "',
    'cpr': '"In this procedure, the provider attempts to restart the heart and lungs of the patient with cardiopulmonary arrest to ensure oxygen supply to the lungs."',
    'appendix': '"The provider removes the appendix via laparoscopic technique. They performs this procedure because of an inflamed or burst appendix, a saclike structure situated in the right lower quadrant of the abdomen at the junction of the large and small intestines."',
    'pregnancy': '"The lab analyst performs the pregnancy test on a urine specimen using a methodology or kit that the analyst can read visually for a direct readout." ',
    'insulin': '"The lab analyst measures the total insulin level, typically in a serum sample. Total insulin measurement includes both the protein bound insulin and free insulin in the blood."',
    'mri': '"The provider performs magnetic resonance angiography of the vessels of the head and surrounding areas. The provider does not use contrast."',
    'delivery': '"In this procedure, the provider provides admission to the hospital for delivery, labor management, including induction of labor, fetal monitoring, use of low forceps, and episiotomy, vaginal delivery of the fetus and placenta on the same date of service."',
    'anesthesia': '"The provider performing a diagnostic or therapeutic procedure administers medication to reduce consciousness, but not render the patient unconscious or asleep, in a child younger than five years of age, in the presence of a trained observer who assists in monitoring the patient. This code is for the initial 15 minutes of intraservice time."',
    'iv': '"The provider introduces a catheter intravenously for supplementation of fluid and electrolytes for 31 minutes to one hour to treat severe cases of dehydration."'
};

const hasTooltips = document.querySelectorAll('.has-tooltip');
const main = document.querySelector('main');
main.insertAdjacentHTML('beforebegin', '<div class="price-tooltip"></div>');
const tooltip = document.querySelector('.price-tooltip');

hasTooltips.forEach((el) => {
    el.addEventListener('mousemove', () => {
        tooltip.style.top = `${event.pageY + 20}px`;
        tooltip.style.left = `${event.pageX - 30}px`;
    })
    el.addEventListener('mouseover', (event) => {
        let key = event.srcElement.dataset.tooltip;
        tooltip.innerHTML = `<p>${tooltipDescr[key]}</p>
                            <p><small>— American Academy of Professional Coders</small></p>`;
        tooltip.style.visibility = 'visible';
    })
    el.addEventListener('mouseout', () => {
        tooltip.innerHTML = '';
        tooltip.style.visibility = 'hidden';
    })
})

/***************************************
*   D3 DUMBBELL CHART                  *
***************************************/
const data = [
    {
        'procedure': 'CPR',
        'anthem': 2806,
        'selfpay': 1296,
        'humana': 3540,
        'united': 2943,
        'medicare': 3263,
        'tooltip': 'cpr'
    },
    {
        'procedure': 'Appendectomy',
        'anthem': 10880,
        'selfpay': 5026,
        'humana': 13731,
        'united': 11412,
        'medicare': 5003,
        'tooltip': 'appendectomy'
    },
    {
        'procedure': 'EpiPen injection',
        'anthem': 101,
        'selfpay': 47,
        'humana': 128,
        'united': 106,
        'medicare': 61,
        'tooltip': 'epipen'
    },
    {
        'procedure': 'Urine pregnancy test',
        'anthem': 8,
        'selfpay': 11,
        'humana': 21,
        'united': 21,
        'medicare': 8,
        'tooltip': 'pregnancy'
    },
    {
        'procedure': 'Insulin',
        'anthem': 5,
        'selfpay': 15,
        'humana': 11,
        'united': 11,
        'medicare': 11,
        'tooltip': 'insulin'
    },
    {
        'procedure': 'MRI (head)',
        'anthem': 925,
        'selfpay': 317,
        'humana': 925,
        'united': 719,
        'medicare': 227,
        'tooltip': 'mri'
    },
    {
        'procedure': 'Intra-Arterial Chemo',
        'anthem': 1672,
        'selfpay': 773,
        'humana': 2110,
        'united': 1754,
        'medicare': 307,
        'tooltip': 'chemo'
    },
    {
        'procedure': 'Vaginal delivery',
        'anthem': 2022,
        'selfpay': 934,
        'humana': 2552,
        'united': 2121,
        'medicare': 2593,
        'tooltip': 'delivery'
    },
    {
        'procedure': 'Anesthesia (moderate sedation)*',
        'anthem': 124,
        'selfpay': 57,
        'humana': 156,
        'united': 130,
        'tooltip': 'anesthesia'
    },
    {
        'procedure': 'IV',
        'anthem': 1838,
        'selfpay': 849,
        'humana': 2319,
        'united': 1927,
        'medicare': 201,
        'tooltip': 'iv'
    }
];

// convert data into percentages rather than dollar amounts
const proportionalData = data.map((datapoint) => {
    datapoint['anthem'] /= datapoint['selfpay'];
    datapoint['medicare'] /= datapoint['selfpay'];
    datapoint['humana'] /= datapoint['selfpay'];
    datapoint['united'] /= datapoint['selfpay'];
    datapoint['selfpayTrue'] = datapoint['selfpay'];
    datapoint['selfpay'] = 1;
    return datapoint;
})

// grab figure to set width the graph should be
let bigImage = document.querySelector('.big-image');
let width = bigImage.clientWidth;
// call the draw function on load
draw(width);
// call the draw function again if window is resized to redraw the graphic
window.addEventListener('resize', () => {
    width = bigImage.clientWidth;
    draw(width);
});

// define draw function to generate graphic based on dynamic width
function draw(user_width) {

    // reset graphic if it's being redrawn
    let graphic = document.querySelector('.dumbbellGraph svg');
    graphic.innerHTML = '';

    // set graphic height
    let graphheight = 600;

    // grab svg and define margin, height and width
    let svg = d3.select(".dumbbellGraph svg");
    // .attr('width', user_width + 'px')
    // .attr('height', graphHeight + 'px');

    let margin = { top: 20, right: 8, bottom: 80, left: 0 },
        width = user_width - margin.left - margin.right,
        height = graphheight - margin.top - margin.bottom;

    // add scales to create axes
    let xScale = d3.scaleLinear() // linear scale based on data
        .rangeRound([10, width - 10])
        .domain([0, 3]);
    let yScale = d3.scalePoint() // categorical scale based on procedure names
        .rangeRound([height, 10]).padding(0.4)
        .domain(data.map(function (d) { return d.procedure; }));

    let chart = svg.append("g") // add chart element to contain chart
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // insert x-axis
    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale)
            .tickFormat(d => d3.format('.0%')(d))
            .ticks(7));

    // y axis highlight to show where self pay cost is
    chart.append('line')
        .attr('x1', xScale(1))
        .attr('x2', xScale(1))
        .attr('y1', 0)
        .attr('y2', height - margin.top)
        .style('stroke-width', 1)
        .style('stroke', 'gray')
        .style('opacity', .5)

    // highlight label
    chart.append('text')
        .text('Cost for self-pay patients')
        .attr('transform', `translate(${xScale(1) + 8}, ${margin.top})`)
        .style('font-family', 'Lato, sans-serif')
        .style('font-size', '0.8em')
        .style('fill', 'gray');

    // add element to contain the dumbbells
    let dumbbellGroup = chart.append("g")
        .attr("id", "dumbbellGroup");

    // add each dumbbell element
    let dumbbell = dumbbellGroup.selectAll(".dumbbell")
        .data(data)
        .enter().append("g")
        .attr("class", `dumbbell`)
        .attr("transform", function (d) { return "translate(0," + yScale(d.procedure) + ")"; });

    // add y axis grid lines
    dumbbell.append("line")
        .attr("x1", 0)
        .attr("x2", width)
        .style('stroke-width', 1)
        .style('stroke', 'black')
        .style('stroke-dasharray', 2)
        .style('opacity', .2);

    // add Y axis labels to each dumbbell, right above the grid lines
    // add white background by measuring, deleting, adding white boxes and re-adding
    dumbbell.append('text')
        .attr('class', 'y axis label')
        .text(function (d) { return d.procedure; })
        .style('transform', 'translateY(-10px)')
        .each(function (d) {
            d[`bboxYLabel`] = this.getBBox();
        });
    chart.selectAll('.y.axis.label').remove();
    dumbbell.append('rect')
        .attr('class', `yLabelBkg`)
        .attr('width', d => d[`bboxYLabel`].width)
        .attr('height', d => d[`bboxYLabel`].height)
        .style('fill', 'white')
        // .style('opacity', 0)
        .style('transform', 'translateY(-28px)');
    dumbbell.append('text')
        .attr('class', 'y axis label')
        .text(function (d) { return d.procedure; })
        .style('transform', 'translateY(-12px)')

    // set up array with insurers we want to include in the graphic
    let insurers = ['anthem', 'selfpay', 'humana', 'medicare', 'united'];

    // add dumbbell lines, between each dot and the corresponding self pay dot
    for (let insurer of insurers) {

        dumbbell.append("line")
            .attr('class', `line between ${insurer}`)
            .attr("x1", function (d) { return xScale(d.selfpay); })
            .attr("x2", function (d) { return xScale(d[insurer]); })
            .style('stroke', `var(--${insurer})`)
            .style('stroke-width', 3)
            .style('opacity', .6);
    }

    // add dollar amounts to each dot
    // need to add white rectangles behind them because you can't set background color of an svg text element for SOME reason
    // 1. add text, measure and remove
    for (let insurer of insurers) {
        dumbbell.append('text')
            .attr('class', `circleLabel ${insurer}`)
            .text(function (d) {
                let format = d3.format(",");
                return `$${format(Math.round(d[insurer] * d.selfpayTrue))}`;
            })
            .each(function (d) {
                d[`bbox${insurer}`] = this.getBBox();
            });
    }
    chart.selectAll('.circleLabel').remove();
    // 2. add white box backgrounds
    for (let insurer of insurers) {
        dumbbell.append('rect')
            .attr('class', `circleLabelBkg ${insurer}`)
            .attr('width', d => d[`bbox${insurer}`].width + 6)
            .attr('height', d => d[`bbox${insurer}`].height)
            .style('fill', 'white')
            .style('opacity', 0)
            .style('transform', function (d) {
                // if it's 1 or above 1, put it on the right side
                // console.log(d[insurer]);
                let translation = xScale(d[insurer]);
                if (d[insurer] >= 1) {
                    // put on right side
                    translation += 10 - 3;
                }
                // if it's below 1, put it on the left side
                else {
                    // put on left side
                    translation -= 10 - 3 + d[`bbox${insurer}`].width;
                }
                return `translate(${translation}px, -12px)`;
            });
    }
    // 3. add text back 
    for (let insurer of insurers) {
        dumbbell.append('text')
            .attr('class', `circleLabel ${insurer}`)
            .text(function (d) {
                let format = d3.format(",");
                return `$${format(Math.round(d[insurer] * d.selfpayTrue))}`;
            })
            .attr('text-anchor', function (d) {
                if (d[insurer] < 1) {
                    return 'end';
                }
            })
            .style('transform', function (d) {
                // if it's 1 or above 1, put it on the right side of the dot
                // console.log(d[insurer]);
                let translation = xScale(d[insurer]);
                if (d[insurer] >= 1) {
                    // put on right side
                    translation += 10;
                }
                // if it's below 1, put it on the left side of the dot
                else {
                    // put on left side
                    translation -= 10;
                }
                return `translate(${translation}px, 5px)`;
            })
            .style('opacity', 0)
            .style('display', 'block')
            .style('fill', 'rgb(80,80,80)');
    }

    // add dot for each insurer for each line
    for (let insurer of insurers) {
        dumbbell.append("circle")
            .attr("class", `circle ${insurer}`)
            .attr("cx", function (d) { return xScale(d[insurer]); })
            .attr("cy", 0)
            .attr("r", 6)
            .style('fill', `var(--${insurer})`)
            // add hover effect
            .on('mouseover', function (d, i) {
                d3.selectAll('circle') // set all circles to low opacity
                    .style('opacity', .2);
                d3.selectAll('.line.between') // set all dumbbell lines to low opacity
                    .style('opacity', 0);
                d3.selectAll(`circle.${insurer}`) // set selected circle to 1
                    .style('opacity', 1);
                d3.selectAll('circle.selfpay') // set self pay circle to 1
                    .style('opacity', 1);
                d3.selectAll(`.line.between.${insurer}`) // set selected line to 1
                    .style('opacity', .5);

                d3.selectAll('.legend > div') // set legend to low opacity
                    .style('opacity', .2);
                d3.select(`.legend .${insurer}`) // set selected legend item to 1
                    .style('opacity', 1);
                d3.select('.legend .selfpay') // set self pay legend item to 1
                    .style('opacity', 1);

                d3.selectAll(`.circleLabel.${insurer}`) // show selected circle labels
                    .style('opacity', 1);
                d3.selectAll(`.circleLabelBkg.${insurer}`) // show selected circle label white bkg
                    .style('opacity', 1);

                d3.selectAll(`.circleLabel.selfpay`) // show self pay label
                    .style('opacity', 1);
                d3.selectAll(`.circleLabelBkg.selfpay`) // show self pay white background
                    .style('opacity', 1);
            })
            // remove hover effect on mouse out
            .on('mouseout', function (d, i) {
                d3.selectAll('circle') // return all circles to opacity 1
                    .style('opacity', 1);
                d3.selectAll('.line.between') // return all lines
                    .style('opacity', .4);
                d3.selectAll('.legend > div') // return all legend items
                    .style('opacity', 1);
                d3.selectAll(`.circleLabel`) // hide all circle labels 
                    .style('opacity', 0);
                d3.selectAll(`.circleLabelBkg`) // hide all circle label backgrounds
                    .style('opacity', 0);
            });

    }

    // add hover effect to legend items
    d3.selectAll('.legend > div')
        .on('mouseover', function (d, i) {
            d3.selectAll('circle') // set all circles to low opacity
                .style('opacity', .2);
            d3.selectAll('.line.between') // set all dumbbell lines to low opacity
                .style('opacity', 0);
            d3.selectAll(`circle.${d.srcElement.dataset.legend}`) // set selected circle to 1
                .style('opacity', 1);
            d3.selectAll('circle.selfpay') // set self pay circle to 1
                .style('opacity', 1);
            d3.selectAll(`.line.between.${d.srcElement.dataset.legend}`) // set selected line to 1
                .style('opacity', .5);

            d3.selectAll('.legend > div') // set legend to low opacity
                .style('opacity', .2);
            d3.select(`.legend .${d.srcElement.dataset.legend}`) // set selected legend item to 1
                .style('opacity', 1);
            d3.select('.legend .selfpay') // set self pay legend item to 1
                .style('opacity', 1);

            d3.selectAll(`.circleLabel.${d.srcElement.dataset.legend}`) // show selected circle labels
                .style('opacity', 1);
            d3.selectAll(`.circleLabelBkg.${d.srcElement.dataset.legend}`) // show selected circle label white bkg
                .style('opacity', 1);

            d3.selectAll(`.circleLabel.selfpay`) // show self pay label
                .style('opacity', 1);
            d3.selectAll(`.circleLabelBkg.selfpay`) // show self pay white background
                .style('opacity', 1);
        })
        // remove hover effect on mouse out
        .on('mouseout', function (d, i) {
            d3.selectAll('circle') // return all circles to opacity 1
                .style('opacity', 1);
            d3.selectAll('.line.between') // return all lines
                .style('opacity', .4);
            d3.selectAll('.legend > div') // return all legend items
                .style('opacity', 1);
            d3.selectAll(`.circleLabel`) // hide all circle labels 
                .style('opacity', 0);
            d3.selectAll(`.circleLabelBkg`) // hide all circle label backgrounds
                .style('opacity', 0);
        });

}

