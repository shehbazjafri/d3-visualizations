import React, { useEffect } from "react";
import * as d3 from "d3";

export default function ChoroplethMap() {
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
      .select("#choropleth")
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    // Create group container on svg that will contain axes and graph
    const g = svg.append("g").attr("transform", `translate(${100},${100})`);

    const eduData =
      "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json";
    const countData =
      "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json";

    const xScale = d3
      .scaleLinear()
      .domain([2.6, 75.1])
      .rangeRound([600, 860]);

    const color = d3
      .scaleThreshold()
      .domain(d3.range(2.6, 75.1, (75.1 - 2.6) / 8))
      .range(d3.schemeGreens[9]);

    // Create and add legend
    const legend = svg
      .append("g")
      .attr("class", "key")
      .attr("id", "legend")
      .attr("transform", "translate(0,40)");

    legend
      .selectAll("rect")
      .data(
        color.range().map(function(d) {
          d = color.invertExtent(d);
          if (d[0] == null) d[0] = xScale.domain()[0];
          if (d[1] == null) d[1] = xScale.domain()[1];
          return d;
        })
      )
      .enter()
      .append("rect")
      .attr("height", 8)
      .attr("x", function(d) {
        return xScale(d[0]);
      })
      .attr("width", function(d) {
        return xScale(d[1]) - xScale(d[0]);
      })
      .attr("fill", function(d) {
        return color(d[0]);
      });

    legend
      .append("text")
      .attr("class", "caption")
      .attr("x", xScale.range()[0])
      .attr("y", -6)
      .attr("fill", "#000")
      .attr("text-anchor", "start")
      .attr("font-weight", "bold");

    legend
      .call(
        d3
          .axisBottom(xScale)
          .tickSize(13)
          .tickFormat(function(x) {
            return Math.round(x) + "%";
          })
          .tickValues(color.domain())
      )
      .select(".domain")
      .remove();
  };
  useEffect(() => {
    drawChart();
  }, []);

  return (
    <div className="container">
      <header>
        <h1>Choropleth Map</h1>
      </header>
      <div id="choropleth"></div>
    </div>
  );
}
