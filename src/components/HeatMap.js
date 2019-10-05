import React, { useEffect } from "react";
import * as d3 from "d3";

export default function HeatMap() {
  const drawChart = () => {
    // Settings for svg canvas size
    const padding = 200;
    const svgWidth = 900;
    const svgHeight = 600;
    // Actual width and height of the graph spaced using padding
    const width = svgWidth - padding;
    const height = svgHeight - padding;

    // Create svg canvas
    const svg = d3
      .select("#heatmap")
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    // Create group container on svg that will contain axes and graph
    const g = svg.append("g").attr("transform", `translate(${100},${100})`);

    // Get data from api
    const url =
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

    d3.json(url).then(function(data) {
      // Format data
      data.monthlyVariance.forEach(d => {
        d.month -= 1;
      });
      // Add heading to svg
      const heading = g.append("text");
      heading
        .attr("id", "title")
        .attr("x", width / 3)
        .attr("y", 0 - padding / 3)
        .text("Monthly Global Land-Surface Temperature");

      g.append("text")
        .attr("id", "description")
        .attr("x", width / 3)
        .attr("y", 0 - padding / 4)
        .html(
          data.monthlyVariance[0].year +
            " - " +
            data.monthlyVariance[data.monthlyVariance.length - 1].year +
            ": base temperature " +
            data.baseTemperature +
            "&#8451;"
        );

      // Create tooltip
      const tooltipDiv = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip")
        .attr("id", "tooltip")
        .style("opacity", 0);

      // Create x and y scales
      const xScale = d3
        .scaleBand()
        .domain(data.monthlyVariance.map(d => d.year))
        .range([0, width]);

      const yScale = d3
        .scaleBand()
        .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
        .range([0, height]);

      // Create x and y axis
      const xAxis = d3
        .axisBottom(xScale)
        .tickValues(
          xScale.domain().filter(function(year) {
            //set ticks to years divisible by 10
            return year % 10 === 0;
          })
        )
        .tickFormat(function(year) {
          var date = new Date(0);
          date.setUTCFullYear(year);
          return d3.timeFormat("%Y")(date);
        })
        .tickSize(10, 1);

      const yAxis = d3
        .axisLeft(yScale)
        .tickValues(yScale.domain())
        .tickFormat(function(month) {
          const date = new Date(0);
          date.setUTCMonth(month);
          return d3.timeFormat("%B")(date);
        })
        .tickSize(10, 1);
      // Call x axis
      g.append("g")
        .attr("id", "x-axis")
        .attr("transform", "translate(" + -1 + "," + height + ")")
        .call(xAxis);
      // Call y axis
      g.append("g")
        .attr("id", "y-axis")
        .attr("transform", "translate(" + -1 + "," + 0 + ")")
        .call(yAxis);
      // Create and add legend
      // Create the heat map with rects
      g.selectAll()
        .data(data.monthlyVariance)
        .enter()
        .append("rect")
        .attr("class", "cell")
        .attr("data-month", function(d) {
          return d.month;
        })
        .attr("data-year", function(d) {
          return d.year;
        })
        .attr("data-temp", function(d) {
          return data.baseTemperature + d.variance;
        })
        .attr("x", function(d) {
          return xScale(d.year);
        })
        .attr("y", function(d) {
          return yScale(d.month);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", yScale.bandwidth())
        .style("fill", "skyblue");
    });
  };

  useEffect(() => {
    drawChart();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Heat Map</h1>
      </header>
      <div id="heatmap"></div>
    </div>
  );
}
