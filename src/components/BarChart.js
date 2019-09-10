import React, { useEffect } from "react";
import * as d3 from "d3";
import "./BarChart.css";

export default function BarChart() {
  const drawChart = () => {
    const padding = 200;
    const svgWidth = 800;
    const svgHeight = 600;
    const width = svgWidth - padding;
    const height = svgHeight - padding;

    // Create svg container
    const svg = d3
      .select("#barchart")
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);

    const xScale = d3
      .scaleBand()
      .range([0, width])
      .padding(0.4);

    const yScale = d3.scaleLinear().range([height, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    // Create group
    const g = svg.append("g").attr("transform", `translate(${100},${100})`);

    let tooltip = d3
      .select("#barchart")
      .append("div")
      .attr("class", "tooltip")
      .attr("id", "tooltip")
      .style("opacity", 0);

    d3.json(
      "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json"
    ).then(function(data) {
      xScale.domain(data.data.map(d => d[0]));
      yScale.domain([0, d3.max(data.data, d => d[1])]);

      const indicesBetweenPoints = Math.round(data.data.length / 14);
      g.append("g")
        .attr("id", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(
          xAxis
            .tickFormat(d => {
              const date = d.split("-");
              return date[0];
            })
            .tickValues(
              data.data
                .map((d, i) =>
                  i % indicesBetweenPoints === 0 ? d[0] : undefined
                )
                .filter(item => item)
            )
        );

      g.append("g")
        .attr("id", "y-axis")
        .call(
          yAxis
            .tickFormat(function(d) {
              return d;
            })
            .ticks(10)
        )
        .append("text")
        .attr("class", "ticks")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("value");

      g.selectAll(".bar")
        .data(data.data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("data-date", d => d[0])
        .attr("data-gdp", d => d[1])
        .attr("x", function(d) {
          return xScale(d[0]);
        })
        .attr("y", function(d) {
          return yScale(d[1]);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) {
          return height - yScale(d[1]);
        })
        .on("mouseover", function(d) {
          tooltip
            .transition()
            .duration(200)
            .style("opacity", 0.9);
          tooltip
            .html(d[0] + ": " + d[1])
            .style("left", d3.event.pageX + 20 + "px")
            .style("top", d3.event.pageY + 20 + "px");
          tooltip.attr("data-date", d[0]);
        })
        .on("mouseout", function(d) {
          tooltip
            .transition()
            .duration(400)
            .style("opacity", 0);
        });
    });
  };

  useEffect(() => {
    drawChart();
  }, []);
  return (
    <div className="container">
      <header id="title">
        <h1>Bar Chart</h1>
      </header>
      <div id="barchart"></div>
    </div>
  );
}
