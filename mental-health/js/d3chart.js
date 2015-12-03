 // anxiety no doctor
 var data = [{
    "diagnoses": "1439",
    "year": "2012"
}, {
    "diagnoses": "1706",
    "year": "2013"
}, {
    "diagnoses": "1824",
    "year": "2014"
}, {
    "diagnoses": "1867",
    "year": "2015"
}];

// anxiety doc
var data2 = [{
    "diagnoses": "398",
    "year": "2012"
}, {
    "diagnoses": "408",
    "year": "2013"
}, {
    "diagnoses": "454",
    "year": "2014"
}, {
    "diagnoses": "388",
    "year": "2015"
}];

// depression
var data3 = [{
    "diagnoses": "1570",
    "year": "2012"
}, {
    "diagnoses": "1744",
    "year": "2013"
}, {
    "diagnoses": "1877",
    "year": "2014"
}, {
    "diagnoses": "1872",
    "year": "2015"
}];

// depression no doc
var data4 = [{
    "diagnoses": "653",
    "year": "2012"
}, {
    "diagnoses": "708",
    "year": "2013"
}, {
    "diagnoses": "741",
    "year": "2014"
}, {
    "diagnoses": "600",
    "year": "2015"
}];

var vis = d3.select("#chart"),
    WIDTH = 800,
    HEIGHT = 500,
    MARGINS = {
        top: 20,
        right: 20,
        bottom: 20,
        left: 50
    },

xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([2012, 2015]),

yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0, 1867]),

xAxis = d3.svg.axis()
    .scale(xScale),
  
yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left");  

vis.append("svg:g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
  .call(xAxis);

vis.append("svg:g")
  .attr("class", "y axis")
    .attr("transform", "translate(" + (MARGINS.left) + ",0)")
    .call(yAxis);

var lineGen = d3.svg.line()
  .x(function(d) {
    return xScale(d.year);
  })
  .y(function(d) {
    return yScale(d.diagnoses);
  });

vis.append('svg:path')
  .attr('d', lineGen(data))
  .attr('stroke', '#991C26')
  .attr('stroke-width', 4)
  .attr('fill', 'none');

vis.append('svg:path')
  .attr('d', lineGen(data2))
  .attr('stroke', '#C1767C')
  .attr('stroke-width', 4)
  .attr('fill', 'none');

vis.append('svg:path')
  .attr('d', lineGen(data3))
  .attr('stroke', '#1F5B83')
  .attr('stroke-width', 4)
  .attr('fill', 'none');

vis.append('svg:path')
  .attr('d', lineGen(data4))
  .attr('stroke', '#8fadc1')
  .attr('stroke-width', 4)
  .attr('fill', 'none');



