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

    const xScale = d3
      .scaleBand()
      .range([0, width])
      .padding(0.4);

    const yScale = d3.scaleLinear().range([height, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    const g = svg.append("g").attr("transform", `translate(${100},${100})`);

    d3.json(
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
    ).then(function(data) {
      const formatTime = d3.timeFormat("%M:%S"),
        formatMinutes = function(m, s = 0) {
          return formatTime(new Date(2012, 0, 1, 0, m, s));
        },
        getDate = function(m, s) {
          return new Date(2012, 0, 1, 0, m, s);
        };

      xScale.domain(data.map(d => d.Year));

      yScale.domain([
        0,
        d3.max(data, d => {
          const time = d.Time.split(":");
          return Number(time[0]);
        })
      ]);

      // const indicesBetweenPoints = Math.round(data.data.length / 14);
      g.append("g")
        .attr("id", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(xAxis);

      g.append("g")
        .attr("id", "y-axis")
        .call(
          yAxis.tickFormat(d => {
            return formatMinutes(d);
          })
        )
        .append("text")
        .attr("class", "ticks")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("value");

      g.selectAll("circle")
        .data(data)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("data-xvalue", d => d.Year)
        .attr("data-yvalue", d => {
          const hhMM = d.Time.split(":");
          const time = getDate(hhMM[0], hhMM[1]);
          return time;
        })
        .attr("cx", function(d) {
          return xScale(d.Year);
        })
        .attr("cy", function(d) {
          const hhMM = d.Time.split(":");
          const time = getDate(hhMM[0], hhMM[1]);
          return height - yScale(time.getMinutes() - time.getSeconds());
        })
        .attr("r", 6)
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) {
          const hhMM = d.Time.split(":");
          const time = getDate(hhMM[0], hhMM[1]);
          return height - yScale(time.getMinutes());
        });
    });
  };

  useEffect(() => {
    drawChart();
  }, []);

  return (
    <div className="container">
      <header id="title">
        <h1>Scappterplot Graph</h1>
      </header>
      <div id="scatterplot"></div>
    </div>
  );
}
