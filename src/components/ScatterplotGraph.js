import React, { useEffect } from "react";
import * as d3 from "d3";
import "./ScatterplotGraph.css";

export default function ScatterplotGraph() {
  const drawChart = () => {
    const padding = 200;
    const svgWidth = 900;
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

    const color = d3.scaleOrdinal(d3.schemeCategory10);

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

      const tooltipDiv = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip")
        .attr("id", "tooltip")
        .style("opacity", 0);

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
        .attr("r", 6)
        .style("fill", function(d) {
          return color(d.Doping !== "");
        })
        .on("mouseover", function(d) {
          tooltipDiv.style("opacity", 0.9);
          tooltipDiv.attr("data-year", d.Year);
          tooltipDiv
            .html(
              d.Name +
                ": " +
                d.Nationality +
                "<br/>" +
                "Year: " +
                d.Year +
                ", Time: " +
                formatTime(d.Time) +
                (d.Doping ? "<br/><br/>" + d.Doping : "")
            )
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY - 28 + "px");
        })
        .on("mouseout", function(d) {
          tooltipDiv.style("opacity", 0);
        });

      const legend = svg
        .selectAll(".legend")
        .data(color.domain())
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("id", "legend")
        .attr("transform", function(d, i) {
          return "translate(0," + (height / 2 - i * 20) + ")";
        });

      legend
        .append("rect")
        .attr("x", width - 18)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

      legend
        .append("text")
        .attr("x", width - 24)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function(d) {
          if (d) return "Riders with doping allegations";
          else {
            return "No doping allegations";
          }
        });
    });
  };

  useEffect(() => {
    drawChart();
  }, []);

  return (
    <div className="container">
      <header>
        <span>Scatterplot Graph</span>
      </header>
      <h1 id="title"> Doping in Professional Bicycle Racing</h1>
      <h3 id="description"> 35 Fastest times up Alpe d'Huez </h3>
      <div id="scatterplot"></div>
    </div>
  );
}
