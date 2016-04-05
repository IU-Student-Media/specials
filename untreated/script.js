var buildLegend = {
    legendItemCount: 0,
    base: function(chart, legendItemSpacing) {
      this.legendItemSpacing = legendItemSpacing;
      this.legend = chart.shotChart.append('g')
        .attr("class","legend")
        .attr("transform", "translate(" + (chart.width - 100) + "," + (-chart.margins[0] + 30) + ")");
    },
    addItem: function(team, xFactor, data) {
      this.legend.append("rect")
        .attr('class', team)
        .attr("height", 13)
        .attr("width", 25)
        .attr("x", (xFactor * this.legendItemCount)) // 0, 63
        .attr("y", 0)
        .attr("rx", 2)
        .attr("ry", 2)

      this.legend.append("text")
        .attr("class", "total_shots")
        .attr("x", (xFactor * (1 + this.legendItemCount))) // 7, 70
        .attr("y", 10).text(function(d, i) { return data["shot_count"]});

      this.legend.append("text")
        .attr("x", (xFactor * (4 + this.legendItemCount))) // 28, 91
        .attr("y", 10).text(function(d, i) { return data["abbr"]});
        this.legendItemCount = this.legendItemCount + this.legendItemSpacing;
    }
  }
  
    var buildStrengthAreas = function(chart, strength) {
    var area = d3.svg.area()
    .interpolate("strength")
    .x0(chart.width)
    .x1(0)
    .y0(chart.height)
    .y1(function(d) { return 0 });

    var areaData = [];
    for (var i = 0; i < strength.length; i++) {
      areaData.push({ "start_time": strength[i].start_time, "end_time": strength[i].end_time, "team": strength[i].advantage })
    }

    $.each(areaData, function(i, d) {
      d3.select('.strength-area').append("rect")
        .datum(d)
        .attr("d", area)
        .attr("height", chart.height)
        .attr("x", chart.x(d.start_time))
        .attr("width", chart.x((d.end_time || d3.max(data, function(d) { return parseGameTime(d.time_expired)})) - d.start_time))
        .attr("class", function(d) { return "area " + d.team });
    });
  }
    
  var parseGameTime = function(timeElapsed) {
    var time_expired = timeElapsed.split(':'),
    minutes = parseInt(time_expired[0] * 60),
    seconds = parseInt(time_expired[1]);
    time_expired = minutes + seconds;
    return time_expired;
  }
  
  var plotPoints = function(chart, team, data) {
      chart.shotChart.selectAll(".linedot." + team + "_team")
      .data(data.shot_events)
      .enter().append("circle")
        .attr("class", function(d) { return "linedot " + team + "_team " + d.shot_type })
        .attr("cy", function(d, i) { return chart["y"](i + 1) })
        .attr("cx", function(d) { return chart["x"](parseGameTime(d.time_expired)) })
        .attr("r", function(d) { return (d.shot_type === "GOAL") ? 6 : 4 })
        .on("mouseover", function(d, i) {
          var circle = d3.select(this);
          handleMouseEvents.over(circle, d, team, chart);
        })
        .on("mouseleave", function(d, i) {
          var circle = d3.select(this);
          handleMouseEvents.leave(circle, function(d) { return (d.shot_type === "GOAL") ? 6 : 4 });
        })
        .on("click", function(d, i) {
          var circle = d3.select(this);
          handleMouseEvents.showDetail(circle, d);
        })
   }
    
  
  var handleMouseEvents = {

    createToolTipDiv: function(duration) {
      this.transitionDuration = duration;
      var tooltip = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);
    },


    /**
     * Handle the mouseover event for circles
     * @param {object} elem - The svg circle elem we are hovering on
     * @param {object} data - Data for the shot event
     * @param {string} team - away or home
     */
    over: function(elem, data, team, chart) {
      d3.select("body").style("cursor", "pointer");
      elem.transition().duration(200)
        .attr("r", (elem.attr("r") * 1.4));
      this.showToolTip(data, team);
      this.drawLinesToAxes(elem, "x", 0, team);
      this.drawLinesToAxes(elem, "y", chart.height, team);
    },


    /**
     * Handle the mouseleave event when exiting a circle
     * @param {object} elem - The svg circle elem we left
     * @param {int} r - The circle radius we want to revert to
     */
    leave: function(elem, r) {
      d3.select("body").style("cursor", "default");
      elem.transition().duration(200)
        .attr("r", r);
      d3.select('.tooltip').transition()
        .duration(this.transitionDuration)
        .style("opacity", 0);
      setTimeout(function() {
        d3.select(".tooltip").classed("hidden", true);
      }, this.transitionDuration)
      d3.selectAll(".line-helper").remove();
    },


    /**
     * Show tooltip when user is hovering on a circle
     * @param {object} data - Data for the shot event to populate the tooltip html
     * @param {string} team - away or home
     */
    showToolTip: function(data, team) {
      switch (data.shot_type) {
        case "SHOT":
          var shot_type = "Shot on goal";
          break;
        case "GOAL":
          var shot_type = "Goal";
          break;
        default:
          var shot_type = "Shot " + data.shot_type + "ed";
          break;
      }

      d3.select('.tooltip').classed("hidden", false).html("<b>" + shot_type.toUpperCase() + "</b><br />" + data.period_time_expired + ", Period " + data.period)
      .style("left", (d3.event.pageX + 10) + "px")
      .style("top", (d3.event.pageY - 40) + "px");
      d3.select('.tooltip').transition()
      .duration(this.transitionDuration)
      .style("opacity", 0.9)
      .attr("class", function() { return "tooltip " + team; });
    },


    /**
     * Show additional shot details on right-hand side when clicking a circle
     * @param {object} elem - The svg circle elem we clicked
     * @param {object} data - Data for the shot event to populate the html
     */
    showDetail: function(elem, data) {
      d3.selectAll(".linedot").classed("active", false);
      elem.classed("active", true)
      var html = "<h5>Shot Details</h5>";
      html += "<p><b>Player:</b> " + data.player + "<br /><b>Zone:</b> " + data.zone + "</p>";
      $('#shot-details').html(html);
    },


    /**
     * Draw helper lines from circle user is hovering on to the x & y axes
     * @param {object} elem - The svg circle elem we are hovering on
     * @param {string} axisToDraw - Which axis the line should extend to
     * @param {int} finalPos - The final position the line should animate to
     * @param {string} team - away or home
     */
    drawLinesToAxes: function(elem, axisToDraw, finalPos, team) {
      var offset = parseInt(elem.attr("r")) + 1;
      if (axisToDraw === "x") {
        var xPos = parseFloat(elem.attr("cx")) - offset,
            yPos = parseFloat(elem.attr("cy"));
      }
      else {
        var xPos = parseFloat(elem.attr("cx")),
            yPos = parseFloat(elem.attr("cy")) + offset;
      }
      d3.select("#shot-chart g").append("line")
        .attr("class", "line-helper " + axisToDraw + " " + team)
        .attr("x1", xPos)
        .attr("x2", xPos)
        .attr("y1", yPos)
        .attr("y2", yPos)
        .attr("stroke-dasharray", "3,3")
        .transition().duration(200).attr(axisToDraw + "1", finalPos)
    }
  }
  
    function Chart(margins, height, width, selector) {
    this.getMargins = function(margins) {
      console.log(typeof margins);
      if (typeof margins === "number") {
        return [margins, margins, margins, margins]
      }
      else if (margins instanceof Array) { return margins }
      else {
        console.log("Error: Chart margins should either be an integer or array of integers. You provided a " + typeof margins)
      }
    },
    this.margins = this.getMargins(margins),
    this.height = height - this.margins[0] - this.margins[2],
    this.width = width - this.margins[1] - this.margins[3],
    this.drawChartBase = function() {
      var svg = d3.select(selector).append("svg:svg");
      svg.attr("width", width)
        .attr("height", height)

      this.shotChart = svg.append("svg:g")
      this.shotChart.attr("transform", "translate(" + this.margins[3] + "," + this.margins[0] + ")");
    },
    this.config = function(opts) {
      if (opts.scales) { this.setupScales(opts.scales); }
      if (opts.xAxis) { this.setupHorizontalAxis(opts.xAxis.tickValues, opts.xAxis.tickFormat); }
      if (opts.yAxis) { this.setupVerticalAxis(opts.yAxis.ticks, opts.yAxis.orient); }
      if (opts.strengthAreas) { this.setupStrengthAreas(); }
      if (opts.legend) { buildLegend.base(this, opts.legend.itemSpacing) }
      if (opts.tooltip) { handleMouseEvents.createToolTipDiv(150); }
    },

    /* Draw paths if this is a line chart */
    this.drawPath = function(team, data) {
      var self = this,
          line = d3.svg.line()
            .x(function(d, i) { return self.x(parseGameTime(d.time_expired)); })
            .y(function(d, i) { return self.y(i + 1); }),

          newLine = this.shotChart.append("svg:path");
          newLine.attr("d", line(data.shot_events)).attr('class', team + '_team series');

        return newLine;
    },

    /* Handle Axis & Scales */
    this.setupScales = function(axesScales) {
      var self = this;
      $.each(axesScales, function(i, axisData) {
        self[axisData.axis] = d3.scale.linear().domain([0, axisData.domainMax]).range(axisData.range);
      });
    },
    this.setupHorizontalAxis = function(customTickVals, formatTicks) {
      var xAxis = d3.svg.axis().scale(this["x"]).tickSize(-this.height).tickSubdivide(true)
          .tickValues(customTickVals)
          .tickFormat(formatTicks);

      this.shotChart.append("svg:g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (this.height + 10) + ")")
            .call(xAxis);

      this.shotChart.selectAll(".x.axis .tick line")
          .attr("y1", -10)
          .attr("y2", -(this.height + 10))

    },
    this.setupVerticalAxis = function(tickCount, orientation) {
      var yAxis = d3.svg.axis().scale(this["y"]).ticks(tickCount).orient(orientation);

      this.shotChart.append("svg:g")
            .attr("class", "y axis")
            .attr("transform", "translate(0,0)")
            .call(yAxis);
    },

    /* Handle Strength Areas */
    this.setupStrengthAreas = function() {
      this.shotChart.append('g').attr('class', 'strength-area');
      this.strengthAreas = d3.selectAll('.strength-area');
    }
  }



    var chart = new Chart([80, 25, 80, 25], 500, 700, "#shot-chart");
    chart.drawChartBase();
    generateChart(data.teams, data.strength, data.game_end);


  /* shot data, strength data */
  function generateChart(teams, strength, game_end) {
    chart.config({
        "scales": [
          { "axis": "x", "domainMax": 3600, "range": [0, chart.width]},
          { "axis": "y", "domainMax": 75, "range": [chart.height, 0]}
        ],
        "xAxis": {
          "tickValues": [0, 1200, 2400, 3600],
          "tickFormat": function(d) {
              if (d === 0) { return "1st" }
              else if (d === 1200) { return "2nd" }
              else if (d === 2400) { return "3rd" }
              else if (d === 3600) { return "End" }
            }
        },
        "yAxis": {
          "ticks": 8,
          "orient": "left"
        },
        "legend": {
          "itemSpacing": 9
        },
        "strengthAreas": true,
        "tooltip": true
      });
    


    /* For both home & away teams: add a legend item, SVG path, and points on each line */
    $.each(teams, function(team) {
      buildLegend.addItem(team, 7, teams[team]);
      chart.drawPath(team, teams[team]);
      plotPoints(chart, team, teams[team]);
    });


    /* DOM events */
    $('#overlay-strength').change(function(e) {
      ($(e.currentTarget).is(":checked")) ? buildStrengthAreas(chart, strength) : chart.strengthAreas.selectAll("rect").remove();
    });

  };