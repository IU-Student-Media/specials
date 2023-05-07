/*
    HEAT MAP
*/
const drawHeatMap = (data) => {

    // fix datatypes
    data = data.map((d) => {
        d['TotalCrashes'] = d3.format('0.1f')(+d['TotalCrashes'] / 19)
        return d
    })

    // create tooltip for later
    var tooltip = d3.select("main")
        .append("div")
        .style("position", "absolute")
        .attr('class', 'tooltip')
        .style("z-index", "10")
        .style("visibility", "hidden")

    // set width/height (aspect ratio) for container
    var width = 768,
        height = 430;
    const margin = ({ top: 0, right: 0, bottom: 70, left: 100 })

    // grab div by id, inject svg
    var svg = d3.select("#heat-map").append("svg")
        .attr("preserveAspectRatio", "xMidYMid")
        .attr("viewBox", "0 0 " + (width + margin.left + margin.right) + " " + (height + margin.top + margin.bottom));

    // Labels of row and columns
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    var timeRanges = ['6-8', '8-10', '10-12', '12-14', '14-16', '16-18', '18-20', '20-22', '22-24', '0-2', '0-4', '4-6',]
    var tickLabels = ['6 AM', '8 AM', '10 AM ', '12 PM', '2 PM', '4 PM', '6 PM', '8 PM', '10 PM', '12 AM', '2 AM', '4 AM',]
    var tooltipLabels = ['6 - 8 AM', '8 - 10 AM', '10 AM - 12 PM ', '12 - 2 PM', '2 - 4 PM', '4 - 6 PM', '6 - 8 PM', '8 - 10 PM', '10 PM - 12 AM', '12 - 2 AM', '2 - 4 AM', '4 - 6 AM',]

    // Build X scales and axis:
    var y = d3.scaleBand()
        .range([0, height])
        .domain(days)
        .padding(0.01);
    svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`)
        .call(d3.axisLeft(y))
        .call(g => g.selectAll(".domain").remove())
        .call(g => g.selectAll(".tick line").remove())

    // Build X scales and axis:
    var x = d3.scaleBand()
        .range([0, width])
        .domain(timeRanges)
        .padding(0.01)
    svg.append("g")
        .attr("transform", `translate(${margin.left - 30},${height})`)
        .call(d3.axisBottom(x).tickFormat((d, i) => tickLabels[i]))
        .call(g => g.selectAll(".domain").remove())
        .call(g => g.selectAll(".tick line").remove())
        .call(g => g.selectAll(".tick ").style())

    // Build color scale
    const colors = ["#fff5f0", "#fee0d3", "#fdc3ac", "#fca082", "#fb7c5c", "#f5553d", "#e23028", "#c2181c", "#9b0d14", "#67000d"]
    var colorScale = d3.scaleThreshold()
        .range(colors)
        .domain([10, 20, 30, 40, 50, 60, 70, 80, 90])

    svg.selectAll()
        .data(data, function (d) { return d["TimeRange"] + ':' + d['Weekday']; })
        .enter()
        .append("rect")
        .attr('class', 'heatRect')
        .attr("x", function (d) { return x(d['TimeRange']) + margin.left })
        .attr("y", function (d) { return y(d['Weekday']) + margin.top })
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", function (d) { return colorScale(d['TotalCrashes']) })

    // add morning and night annotations
    var morning = svg.append("line")
        .attr("stroke", "var(--darkgray)")
    var night = svg.append("line")
        .attr("stroke", "var(--darkgray)")

    // left/right position of morning  & night lines
    const morningLeft = x('6-8') + margin.left + 10
    const morningRight = x('20-22') + margin.left - 10
    const nightLeft = x('20-22') + margin.left + 10
    const nightRight = x('4-6') + margin.left + (x('8-10') - x('6-8')) - 10

    morning.attr("x1", morningLeft)
        .attr("x2", morningRight)
        .attr('y1', height + 40)
        .attr('y2', height + 40)
        .attr("opacity", 1)

    night.attr("x1", nightLeft)
        .attr("x2", nightRight)
        .attr('y1', height + 40)
        .attr('y2', height + 40)
        .attr("opacity", 1)

    const coords = [morningLeft, morningRight, nightLeft, nightRight]

    // for each start/end point, add a tick
    coords.forEach((coord) => {
        svg.append("line")
            .attr("stroke", "var(--darkgray")
            .attr("x1", coord)
            .attr("x2", coord)
            .attr("y1", height + 40)
            .attr("y2", height + 30)
    })

    // add labels
    svg.append("text")
        .attr("dx", (morningRight - morningLeft) / 2 + margin.left)
        .attr("dy", height + 60)
        .attr('text-anchor', 'middle')
        .style('font-family', 'Inter')
        .style("font-weight", "bold")
        .style('font-size', 14)
        .text("DAYTIME")

    svg.append("text")
        .attr("dx", width + margin.left - ((nightRight - nightLeft) / 2))
        .attr("dy", height + 60)
        .attr('text-anchor', 'middle')
        .style('font-family', 'Inter')
        .style("font-weight", "bold")
        .style('font-size', 14)
        .text("NIGHTTIME")

    var legend = d3.select('#legend')
        .append('ul')
        .attr('class', 'list-inline');

    var keys = legend.selectAll('li.key')
        .data(colorScale.range());

    keys.enter().append('li')
        .attr('class', 'key')
        .style('border-top-color', String)
        .append('p')
        .text(function (d) {
            // console.log(colorScale.invertExtent(d)[0])
            var r = colorScale.invertExtent(d)[0];
            return r;
        });

    d3.selectAll(".heatRect")
        .style('cursor', 'pointer')
        .on("mousemove", (d, i) => {
            // const offset = d.view.screen.width - d.pageX

            // let rightAlign = false

            // if (offset < 250) {
            //     console.log('tooltip distorted')
            //     rightAlign = true
            // }

            tooltip.html(`<p>On average, <strong>${d3.format('.0f')(i.TotalCrashes)}</strong> crashes were reported each year on <strong>${i.Weekday}s</strong> from <strong>${tooltipLabels[timeRanges.indexOf(i.TimeRange)]}</strong></p>`)
                .style('top', d.pageY - 12 + 'px')
                .style('left', d.pageX + 25 + 'px')
                .style('visibility', 'visible')
                .style("opacity", 1)

        }).on("mouseout", function (d) {
            tooltip.style("opacity", 0);
        })

}

const asyncData = async () => {
    return d3.csv('./data/heatmapd3data 2.csv')
}
    // once promises return, run the map drawing function
    ; (async () => {
        drawHeatMap(await asyncData())
    })()