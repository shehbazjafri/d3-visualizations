import React, { useEffect } from "react";
import * as d3 from "d3";

export default function TreeMap() {
  const drawChart = () => {
    //Sets dimensions
    const margin = { top: 0, left: 0, bottom: 0, right: 0 },
      width = 1200 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // Create svg canvas
    const svg = d3
      .select("#treemap")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Create group container on svg that will contain the map
    const g = svg.append("g").attr("transform", `translate(${0},${0})`);

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

      // Add rectangles
      g.selectAll("rect")
        .data(root.leaves())
        .enter()
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
        .attr("x", function(d) {
          return d.x0;
        })
        .attr("y", function(d) {
          return d.y0;
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
