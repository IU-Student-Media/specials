/*
    BEESWARM PLOT
*/
// Import Observable runtime and the @d3/color-legend notebook
import { Runtime } from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js";
import d3_colorLegend from "https://api.observablehq.com/@d3/color-legend.js?v=3";

const drawBeeswarm = (data) => {
    // convert strings to integers, remove zeroes
    data = data.map((d) => {
        d['MNI'] = +d['MNI']
        d['AFO'] = +d['AFO']
        return d
    }).filter((d) => d.MNI > 0)

    // create tooltip for later
    var tooltip = d3.select("main")
        .append("div")
        .style("position", "absolute")
        .attr('class', 'tooltip')
        .style("z-index", "10")
        .style("visibility", "hidden")

    // set width/height (aspect ratio) for container
    var width = 768,
        height = 400;
    const margin = ({ top: 0, right: 40, bottom: 0, left: 40 })

    // grab div by id, inject svg
    var svg = d3.select("#beeswarm").append("svg")
        .attr("preserveAspectRatio", "xMidYMid")
        .attr("viewBox", "0 0 " + width + " " + (height + margin.top + margin.bottom));

    const arrowSize = 7
    const arrowPoints = [[0, 0], [0, arrowSize], [arrowSize, arrowSize / 2]];

    svg
        .append('defs')
        .append('marker')
        .attr('id', 'arrow')
        .attr('viewBox', [0, 0, arrowSize, arrowSize])
        .attr('refX', (arrowSize / 2))
        .attr('refY', (arrowSize / 2))
        .attr('markerWidth', arrowSize)
        .attr('markerHeight', arrowSize)
        .attr('orient', 'auto-start-reverse')
        .append('path')
        .attr('d', d3.line()(arrowPoints))
        .attr('stroke', 'currentColor');

    svg
        .append('path')
        .attr('d', d3.line()([[(width / 2 + 10 - 50 + 20), 300], [(width / 2 + 10 + 50 + 20), 300]]))
        .attr('stroke', 'var(--darkgray)')
        .attr('marker-start', 'url(#arrow)')
        .attr('marker-end', 'url(#arrow)')
        .attr('fill', 'none')
    svg.append('text')
        .text('Fewer reported remains')
        .attr('class', 'arrow-label')
        .attr('dx', width / 2 - 60 + 10 + 20)
        .attr('dy', 304)
        .attr('text-anchor', 'end')
    svg.append('text')
        .text('More reported remains')
        .attr('class', 'arrow-label')
        .attr('dx', width / 2 + 60 + 10 + 20)
        .attr('dy', 304)
        .attr('text-anchor', 'start')

    // establish x scale
    var xScale = d3.scaleLinear()
        .domain([0, 10000])
        .range([margin.left + 50, width - margin.right])
    // create force layout for beeswarm
    var simulation = d3.forceSimulation(data)
        .force("x", d3.forceX((d) => xScale(+d.MNI)).strength(1))
        .force("y", d3.forceY((height / 2)))
        .force("collide", d3.forceCollide(6))
        .stop()
    // apply simulation
    for (var i = 0; i < data.length; ++i) simulation.tick();
    var circles = svg.selectAll(".beeCircle")
        .data(data, (d) => d.MNI);//join the data

    // color scale
    const colorScale = d3.scaleThreshold()
        .domain([10, 100, 1000])
        // .domain(d3.quantile)
        .range(d3.schemeBlues[4])

    circles.exit()//this is the exit selection
        .attr("cx", 0)
        .attr("cy", (height / 2))
        .remove();

    circles.enter()//this is the enter selection
        .append("circle")
        .attr("class", d => `beeswarm-circle ${d.Institution == "Indiana University" ? "IU" : ""}`)
        .attr("cx", 0)
        .attr("cy", (height / 2))
        .attr("r", 5)
        .style('fill', d => colorScale(d.MNI))
        .merge(circles)//and the "merge" unify enter and update selections!
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y);

    var xline = svg.append("line")
        .attr("stroke", "gray")
        .attr("stroke-dasharray", "1,2");

    const iuBubble = d3.select('.IU')

    xline.attr("x1", iuBubble.attr("cx"))
        .attr("y1", iuBubble.attr("cy"))
        .attr("y2", +iuBubble.attr("cy") - 40)
        .attr("x2", iuBubble.attr("cx"))
        .attr("opacity", 1);

    svg.append("g")
        .attr("class", "labels")
        .style("font-family", "Inter")
        .selectAll("text")
        .data(data.filter(d => d.Institution == "Indiana University"))
        .enter().append("text")
        .attr("dx", d => xScale(d.MNI))
        .attr("dy", +iuBubble.attr("cy") - 50)
        .attr('text-anchor', 'middle')
        .text("IU: 4,838");

    // for (let n of [2589, 9336]) {
    //     svg.append("line")
    //         .attr("stroke", "var(--darkgray")
    //         .attr("x1", xScale(n) + (n == 9336 ? 10 : 0) + (n == 1 ? -60 : 0))
    //         .attr("x2", xScale(n) + (n == 9336 ? 10 : 0) + (n == 1 ? -60 : 0))
    //         .attr("y1", height / 2 + 35)
    //         .attr("y2", height / 2 + 20)
    // }

    // const pairs = [[2589, 9336]]

    // for (let i in pairs) {
    //     console.log(xScale(pairs[i][0] + pairs[i][1]) + (i == 0 ? -60 : 10))
    //     svg.append("text")
    //         .attr("dx", (xScale(pairs[i][0]) + xScale(pairs[i][1]) + (i == 1 ? -60 : 10)) / 2)
    //         .attr("dy", height / 2 + 60)
    //         .attr('text-anchor', 'middle')
    //         .style('font-family', 'Inter')
    //         .style('font-size', 14)
    //         .text("10 institutions own 49.4% of all reported remains")
    // }

    // var top50 = svg.append("line")
    //     .attr("stroke", "var(--darkgray)")

    // top50.attr("x1", xScale(2589))
    //     .attr("x2", xScale(9336) + 10)
    //     .attr('y1', height / 2 + 35)
    //     .attr('y2', height / 2 + 35)
    //     .attr("opacity", 1);

    // svg.append("g")
    //     .attr("class", "legendOrdinal")
    //     .attr("transform", "translate(20,20)");

    async function renderLegend(el) {
        // Get the value of the "legend" notebook cell, which is the function we want, which returns a DOM element
        const module = new Runtime().module(d3_colorLegend);
        const Legend = await module.value("Legend");

        // Finally, call `legend` with our options and append it to the container
        const element = Legend((colorScale), {
            title: "Unrepatriated remains reported by institutions",
            height: 50,
            width: 250,
            tickSize: 0,
            tickFormat: d3.format(',')
        });
        el.appendChild(element);

    }
    renderLegend(document.querySelector('.container'))

    d3.selectAll(".beeswarm-circle")
        .on("mouseover", (d, i) => {
            tooltip.html(`<p><strong>${i.Institution}</strong> reported ancestral remains of at least <strong>${d3.format(",")(i.MNI)}</strong> individual${i.MNI == 1 ? '' : 's'}</p>`)
                .style('top', d.pageY - 12 + 'px')
                .style('left', d.pageX + 25 + 'px')
                .style('visibility', 'visible')
                .style("opacity", 1)

        }).on("mousemove", (d, i) => {
            tooltip.html(`<p><strong>${i.Institution}</strong> reported ancestral remains of at least <strong>${d3.format(",")(i.MNI)}</strong> individual${i.MNI == 1 ? '' : 's'}</p>`)
                .style('top', d.pageY - 12 + 'px')
                .style('left', d.pageX + 25 + 'px')
                .style('visibility', 'visible')
                .style("opacity", 1);

        }).on("mouseout", function (d) {
            tooltip.style("opacity", 0);
        });

}

const asyncBeeswarm = async () => {
    return d3.csv('./files/strip_chart_data.csv')
    // return d3.csv('https://raw.githubusercontent.com/ids-digi/nagpra/main/files/strip_chart_data.csv?token=GHSAT0AAAAAACASYJVXAGBTMFEQN5N3R6OUZCF54VQ')
}
    // once promises return, run the map drawing function
    ; (async () => {
        drawBeeswarm(await asyncBeeswarm())
    })()