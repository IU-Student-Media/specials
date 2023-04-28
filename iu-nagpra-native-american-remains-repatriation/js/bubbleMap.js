import { Runtime } from "https://cdn.jsdelivr.net/npm/@observablehq/runtime@4/dist/runtime.js";
import d3_colorLegend from "https://api.observablehq.com/@d3/color-legend.js?v=3";

/*
    BUBBLE MAP
*/

const drawMap = (countyData, stateData, us) => {

    // var statemap = new Map(topojson.feature(us.objects.states).features.map(d => [d.id, d]))

    // set width/height (aspect ratio) for map
    var width = 975,
        height = 610;
    const margin = ({ top: 30, right: 0, bottom: 0, left: 0 })
    // create path
    var path = d3.geoPath()
        .projection(null);
    // grab div by id, inject svg
    var svg = d3.select("#bubble-map").append("svg")
        .attr("preserveAspectRatio", "xMidYMid")
        .attr("viewBox", "0 0 " + width + " " + height);
    // define bubble radius scale
    var radius = d3.scaleSqrt()
        .domain([0, 400])
        .range([0, 25])

    const colorScale = d3.scaleThreshold()
        .domain([10, 100, 1000])
        // .domain(d3.quantile)
        .range(d3.schemeBlues[4])

    // color legend
    // var categories = ["1-10", "11-100", "101-1,000", "1,001-10,000"];

    // var ordinal = d3.scaleOrdinal()
    //     .domain(categories)
    //     // .range(categories.map((val, i) =>
    //     //     d3.interpolateBlues(i / (categories.length - 1))
    //     // ));
    //     .range(['rgb(235, 241, 253)', 'rgb(211, 227, 242)', 'rgb(88, 159, 206)', 'rgb(49, 130, 189)'])

    async function renderLegend(el) {
        // Get the value of the "legend" notebook cell, which is the function we want, which returns a DOM element
        const module = new Runtime().module(d3_colorLegend);
        const Legend = await module.value("Legend");

        // Finally, call `legend` with our options and append it to the container
        const element = Legend((colorScale), {
            title: "Unrepatriated remains IU reported",
            height: 50,
            width: 250,
            tickSize: 0,
            tickFormat: d3.format(',')
        });
        el.appendChild(element);

    }
    renderLegend(document.querySelector('.map-legend'))

    // tooltip
    var tooltip = d3.select("main")
        .append("div")
        .style("position", "absolute")
        .attr('class', 'tooltip')
        .style("z-index", "10")
        .style("visibility", "hidden")

    // add mni data to topojson data
    topojson.feature(us, us.objects.counties).features.map((county) => {
        const mni = countyData.find((item) => {
            if ((item['CountyFIPS']) === county.id.toString()) {
                return (item['CountyFIPS']) === county.id.toString()
            } else {
                return 0
            }
        })
        county.properties['mni'] = mni ? parseInt(mni['MNI']) : 0
        county.properties['state'] = mni ? mni['StateName'] : 'null'
        return county
    })
    // add state totals
    topojson.feature(us, us.objects.states).features.map((state) => {
        const mni = stateData.find((item) => {
            if ((item['StateFIPS']) === state.id.toString()) {
                return (item['StateFIPS']) === state.id.toString()
            } else {
                return 0
            }
        })
        state.properties['mni'] = mni ? parseInt(mni['MNI']) : 0
        return state
    })
    svg.append("defs").append("pattern")
        .attr('id', 'diagonal-stripe')
        .attr("width", 2.5)
        .attr("height", 5)
        .attr('patternUnits', "userSpaceOnUse")
        .attr('patternTransform', "rotate(-45)")
        .append('path')
        // .attr('fill', 'darkgray')
        .attr('stroke', 'rgba(0,0,0,.35)')
        .attr('stroke-width', '.5')
        .attr('d', 'M -1,2 l 6,0')

    const drawStates = (condition, fill, className = "") => {
        // condition: "zero", "nonzero"
        // fill: explicit or "color" for colorscale
        return svg.append("g")
            // .transform(`translate(0,${margin.top})`)
            .selectAll("path")
            .data(topojson.feature(us, us.objects.states).features.filter((state) => condition == "zero" ? state.properties.mni === 0 : state.properties.mni !== 0))
            .enter()
            .append("path")
            .attr('d', d3.geoPath().projection(null))
            .attr("class", className)
            .attr('fill', fill == "color" ? d => colorScale(d.properties.mni) : fill)
    }

    // null states
    drawStates("zero", "rgba(0,0,0,.04")
    drawStates("zero", "url(#diagonal-stripe)")

    // choropleth states
    drawStates("nonzero", "color", "state").on("mouseover", (d, i) => {
        tooltip.style("opacity", 1)
            .html(`<p>IU reported remains of at least <strong>${d3.format(',')(i.properties.mni)}</strong> individual${i.properties.mni == 1 ? '' : 's'} from <strong>${i.properties.name}</strong></p>`)
            .style("visibility", 'visible')
            .style("left", (d.pageX + 10) + "px")
            .style("top", (d.pageY + 10) + "px")
    }).on("mousemove", (d, i) => {
        tooltip.style("opacity", 1)
            .style("left", (d.pageX + 10) + "px")
            .style("top", (d.pageY + 10) + "px")
    }).on("mouseout", (d, i) => {
        tooltip.style("opacity", 0)
            .style("visibility", 'hidden')
    })

    // states outline 
    svg.append("path")
        .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
        .attr("class", "border border--state")
        .attr("d", path)
        .attr("stroke", "white")
        .attr("stroke-width", "1px")

    // map the bubbles
    svg.append("g")
        .attr("class", "bubble")
        .selectAll("circle")
        .data(topojson.feature(us, us.objects.counties).features
            // sort smallest to largest to smaller bubbles aren't covered
            .sort((a, b) => b.properties.mni - a.properties.mni)
        )
        .enter().append("circle")
        .attr("transform", (d) => `translate(${path.centroid(d)})`)
        .attr("r", (d) => radius(d.properties.mni))
        .on("mouseover", (d, i) => {
            tooltip.style("opacity", 1)
                .html(`<p>IU reported remains of at least <strong>${d3.format(',')(i.properties.mni)}</strong> individual${i.properties.mni == 1 ? '' : 's'} from <strong>${i.properties.name} County, ${i.properties.state}</strong></p>`)
                // .html(`<p><strong>${i.properties.name} County, ${i.properties.state}:</strong> IU still has remains of at least <strong>${d3.format(",")(+i.properties.mni)}</strong> individuals</p>`)
                .style("visibility", 'visible')
                .style("left", (d.pageX + 10) + "px")
                .style("top", (d.pageY + 10) + "px")
        }).on("mousemove", (d, i) => {
            tooltip.style("opacity", 1)
                .style("left", (d.pageX + 10) + "px")
                .style("top", (d.pageY + 10) + "px")
        }).on("mouseout", (d, i) => {
            tooltip.style("opacity", 0)
                .style("visibility", 'hidden')
        })

    // add legend for circles
    var legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", "translate(" + (width - 110) + "," + (height + margin.top - 130) + ")")
        .selectAll("g")
        .data([50, 200, 400])
        .enter().append("g");
    legend.append("circle")
        .attr("cy", function (d) { return -radius(d); })
        .attr("r", radius);
    legend.append("text")
        .attr("y", function (d) { return -2 * radius(d); })
        .attr("dy", "1.3em")
        .text(d3.format(".1s"));


}

// asynchronously fetch county + state aggregate data
const asyncCounties = async () => {
    return d3.csv('./files/inventory_clean.csv')
    // return d3.csv('https://raw.githubusercontent.com/ids-digi/nagpra/main/files/inventory_clean.csv?token=GHSAT0AAAAAACASYJVWQ74VP3TUMYLGTSHOZCF54CQ')
}
const asyncStates = async () => {
    return d3.csv('./files/state_df.csv')
    // return d3.csv('https://raw.githubusercontent.com/ids-digi/nagpra/main/files/state_df.csv?token=GHSAT0AAAAAACASYJVWGGILIYOJKFQQZO5AZCF54KA')
}
const asyncAlbers = async () => {
    return d3.json('./files/albers.json')
    // return d3.json('https://raw.githubusercontent.com/ids-digi/nagpra/main/files/albers.json?token=GHSAT0AAAAAACASYJVXTDKEW73VHGDHLOA4ZCF53YA')
}
    // once promises return, run the map drawing function
    ; (async () => {
        drawMap(await asyncCounties(), await asyncStates(), await asyncAlbers())
    })()