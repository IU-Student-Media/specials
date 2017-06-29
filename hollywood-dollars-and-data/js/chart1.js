
var margin = {top: 80, right: 40, bottom: 30, left: 40},
width = 800 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

var formatPercent = d3.format(",%");

const budgetMin = 10;
const budgetMax = 230;
const radiusMin = 4.5;
const radiusMax = 45;

var scaleRadius = d3.scale.sqrt().domain([budgetMin, budgetMax]).range([radiusMin, radiusMax])

var x = d3.scale.linear()
.range([0, width]);

var y = d3.scale.linear()
.range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
.scale(x)
.orient("bottom")
.tickFormat(formatPercent);

var yAxis = d3.svg.axis()
.scale(y)
.orient("left")
.tickFormat(function(d) {return '$' + d;});

var svg = d3.select("#area1").append("svg")
.classed("svg-container", true)
.attr("preserveAspectRatio", "xMinYMin meet")
.attr("viewBox", "0 0 800 500")
.classed("svg-content-responsive", true)
.append("g")
.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("summer_blockbuster_data.csv", function(error, data) {
  if (error) throw error;

  data.forEach(function(d) {
    d.rotten_tomatoes = +d.rotten_tomatoes;
    d.opening_gross = +d.opening_gross;
  });

  x.domain(d3.extent(data, function(d) { return d.rotten_tomatoes; })).nice();
  y.domain(d3.extent(data, function(d) { return d.opening_gross; })).nice();

  svg.append("g")
  .attr("class", "x axis")
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis)
  .append("text")
  .attr("class", "label")
  .attr("x", width)
  .attr("y", -6)
  .style("text-anchor", "end")
  .text("Rotten Tomatoes rating");

  svg.append("g")
  .attr("class", "y axis")
  .call(yAxis)
  .append("text")
  .attr("class", "label")
  .attr("transform", "rotate(-90)")
  .attr("y", 6)
  .attr("dy", ".71em")
  .style("text-anchor", "end")
  .text("Opening Gross (in millions)")

  svg.append("text")
  .attr("x", (width / 2))
  .attr("y", 0 - (margin.top / 2))
  .attr("text-anchor", "middle")
  .style("font-size", "16px")
  .style("text-decoration", "underline")
  .text("Rotten Tomatoes score by Opening Gross");

  svg.selectAll(".dot")
  .data(data)
  .enter().append("circle")
  .attr("class", "dot")
  .attr("r", function(d) {return scaleRadius(d.budget)})
  .attr("cx", function(d) { return x(d.rotten_tomatoes); })
  .attr("cy", function(d) { return y(d.opening_gross); })
  .style("fill", function(d) { return color(d.studio); })
  .style("fill-opacity", .5);

  svg.append("text")
  .attr("x", (width / 2))
  .attr("y", 0 - (margin.top / 2))
  .attr("text-anchor", "middle")
  .style("font-size", "16px")
  .style("text-decoration", "underline")
  .text("");

  var legend = svg.selectAll(".legend")
  .data(color.domain())
  .enter().append("g")
  .attr("class", "legend")
  .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
  .attr("x", width - 18)
  .attr("width", 18)
  .attr("height", 18)
  .style("fill", color);

  legend.append("text")
  .attr("x", width - 24)
  .attr("y", 9)
  .attr("dy", ".35em")
  .style("text-anchor", "end")
  .text(function(d) { return d; });

});