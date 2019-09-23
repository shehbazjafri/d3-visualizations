import React, { useEffect } from "react";
import * as d3 from "d3";

export default function HeatMap() {
  const drawChart = () => {
    const padding = 200;
    const svgWidth = 1000;
    const svgHeight = 600;
    const width = svgWidth - padding;
    const height = svgHeight - padding;

    const svg = d3
      .select("#heatmap")
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    const xScale = d3.scaleLinear().range([0, width]);

    const yScale = d3.scaleLinear().range([0, height]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    const g = svg.append("g").attr("transform", `translate(${100},${100})`);

    d3.json(
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json"
    ).then(function(data) {
      const years = data.monthlyVariance.map(d => d.year);
      xScale.domain([d3.min(years) - 1, d3.max(years) + 1]);

      yScale.domain([1, 12]);

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
        .data(data.data)
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
