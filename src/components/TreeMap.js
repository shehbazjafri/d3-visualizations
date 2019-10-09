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
