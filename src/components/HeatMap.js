import React, { useEffect } from "react";
import * as d3 from "d3";

export default function HeatMap() {
  const drawChart = () => {
    const padding = 200,
      svgWidth = 1000,
      svgHeight = 600,
      width = svgWidth - padding,
      height = svgHeight - padding,
      months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];

    // Create svg canvas
    const svg = d3
      .select("#heatmap")
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    // Append group container to svg that will contain axes and graph
    const g = svg.append("g").attr("transform", `translate(${100},${100})`);

    // Create x and y scales
    const xScale = d3.scaleTime().range([0, width]);
    const yScale = d3.scaleBand().range([0, height]);

    // Create x and y axis that will be called on group element later
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // const colorScale = d3.scale.quantize().range(color);
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    d3.json(
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json"
    ).then(function(data) {
      data = data.monthlyVariance;

      const timeFormat = d3.timeFormat("%Y");

      data.forEach(function(d) {
        d.month = months[d.month - 1];
        // d.year = timeFormat(d.year);
      });

      const years = data.map(d => d.year);
      xScale.domain(
        d3.extent(data, function(d) {
          return d.year;
        })
      );

      yScale.domain(months);

      //   title
      svg
        .append("text")
        .attr("id", "title")
        .attr("x", width / 2)
        .attr("y", 0 - padding / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "30px")
        .text("Monthly Global Land-Surface Temperature");

      //subtitle
      svg
        .append("text")
        .attr("id", "description")
        .attr("x", width / 2)
        .attr("y", 0 - padding / 2 + 25)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .text("1753 - 2015: base temperature 8.66℃");

      g.append("g")
        .attr("id", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(xAxis);

      g.append("g")
        .attr("id", "y-axis")
        .call(yAxis);

      g.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "cell");
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
