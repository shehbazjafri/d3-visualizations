import React, { useEffect } from "react";
import * as d3 from "d3";
import "./TreeMap.css";

export default function TreeMap() {
  const drawChart = () => {
    //Sets dimensions
    const margin = { top: 0, left: 0, bottom: 0, right: 0 },
      width = 1300 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    // Create svg canvas
    const svg = d3
      .select("#treemap")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Define treemap
    const treemap = d3
      .treemap()
      .size([width, height])
      .paddingInner(1);

    const fader = function(color) {
      return d3.interpolateRgb(color, "#fff")(0.1);
    };

    const color = d3.scaleOrdinal(d3.schemeSet3.map(fader));

    const url =
      "https://cdn.rawgit.com/freeCodeCamp/testable-projects-fcc/a80ce8f9/src/data/tree_map/video-game-sales-data.json";

    d3.json(url).then(function(data) {
      // Root
      const root = d3
        .hierarchy(data)
        .eachBefore(function(d) {
          d.data.id = (d.parent ? d.parent.data.id + "." : "") + d.data.name;
        })
        .sum(function(d) {
          return d.value;
        })
        .sort(function(a, b) {
          return b.height - a.height || b.value - a.value;
        });

      // Computes the position of each element in the hierarchy
      treemap(root);

      // Add containers
      const cell = svg
        .selectAll("g")
        .data(root.leaves())
        .enter()
        .append("g")
        .attr("class", "group")
        .attr("transform", function(d) {
          return "translate(" + d.x0 + "," + d.y0 + ")";
        });

      //  ALternatively, rects can be added without using g containers by appending rects with root.leaves() data and using x and y properties
      // instead of using transform for g containers

      // Add rects
      cell
        .append("rect")
        .attr("class", "tile")
        .attr("data-name", function(d) {
          return d.data.name;
        })
        .attr("data-category", function(d) {
          return d.data.category;
        })
        .attr("data-value", function(d) {
          return d.data.value;
        })
        .attr("width", function(d) {
          return d.x1 - d.x0;
        })
        .attr("height", function(d) {
          return d.y1 - d.y0;
        })
        .style("stroke", "black")
        .style("fill", function(d) {
          return color(d.data.category);
        });

      // Add text
      cell
        .append("text")
        .attr("class", "tile-text")
        .selectAll("tspan")
        .data(function(d) {
          return d.data.name.split(/(?=[A-Z][^A-Z])/g);
        })
        .enter()
        .append("tspan")
        .attr("x", 4)
        .attr("y", function(d, i) {
          return 13 + i * 10;
        })
        .text(function(d) {
          return d;
        });
    });
  };

  useEffect(() => {
    drawChart();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Tree Map</h1>
      </header>
      <h1 id="title">Video Game Sales</h1>
      <div id="description">
        Top 100 Most Sold Video Games Grouped by Platform
      </div>
      <div id="treemap"></div>
    </div>
  );
}
