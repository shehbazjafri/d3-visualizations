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

      // Add heading to svg
      const heading = svg.append("heading");
      heading
        .append("h1")
        .attr("id", "title")
        .text("Monthly Global Land-Surface Temperature");
      heading
        .append("h3")
        .attr("id", "description")
        .html(
          data.monthlyVariance[0].year +
            " - " +
            data.monthlyVariance[data.monthlyVariance.length - 1].year +
            ": base temperature " +
            data.baseTemperature +
            "&#8451;"
        );
      // Create tooltip with d3.tip
      // Create x and y scales
      // Create x and y axis
      // Call x axis
      // Call y axis
      // Create and add legend
      // Create the heat map with rects
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
