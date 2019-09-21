import React, { useEffect } from "react";
import * as d3 from "d3";
import "./ScatterplotGraph.css";

export default function ScatterplotGraph() {
  const drawChart = () => {
    const padding = 200;
    const svgWidth = 800;
    const svgHeight = 600;
    const width = svgWidth - padding;
    const height = svgHeight - padding;

    const svg = d3
      .select("#scatterplot")
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    const xScale = d3.scaleLinear().range([0, width]);

    const yScale = d3.scaleTime().range([0, height]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    const g = svg.append("g").attr("transform", `translate(${100},${100})`);

    d3.json(
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
    ).then(function(data) {
      const formatTime = d3.timeFormat("%M:%S");

      data.forEach(function(d) {
        d.Place = +d.Place;
        var parsedTime = d.Time.split(":");
        d.Time = new Date(1970, 0, 1, 0, parsedTime[0], parsedTime[1]);
      });

      const years = data.map(d => d.Year);
      xScale.domain([d3.min(years) - 1, d3.max(years) + 1]);

      yScale.domain(
        d3.extent(data, function(d) {
          return d.Time;
        })
      );

      g.append("g")
        .attr("id", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(xAxis.tickFormat(d3.format("d")))
        .append("text")
        .attr("class", "x-axis-label")
        .attr("x", width)
        .attr("y", -6)
        .style("text-anchor", "end")
        .text("Year");

      g.append("g")
        .attr("id", "y-axis")
        .call(yAxis.tickFormat(formatTime))
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Best Time (minutes)");

      g.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("data-xvalue", d => d.Year)
        .attr("data-yvalue", d => {
          return d.Time.toISOString();
        })
        .attr("cx", function(d) {
          return xScale(d.Year);
        })
        .attr("cy", function(d) {
          return yScale(d.Time);
        })
        .attr("r", 6);
    });
  };

  useEffect(() => {
    drawChart();
  }, []);

  return (
    <div className="container">
      <header id="title">
        <h1>Scatterplot Graph</h1>
      </header>
      <div id="scatterplot"></div>
    </div>
  );
}
