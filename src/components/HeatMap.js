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

    const colorbrewer = {
      RdYlBu: {
        3: ["#fc8d59", "#ffffbf", "#91bfdb"],
        4: ["#d7191c", "#fdae61", "#abd9e9", "#2c7bb6"],
        5: ["#d7191c", "#fdae61", "#ffffbf", "#abd9e9", "#2c7bb6"],
        6: ["#d73027", "#fc8d59", "#fee090", "#e0f3f8", "#91bfdb", "#4575b4"],
        7: [
          "#d73027",
          "#fc8d59",
          "#fee090",
          "#ffffbf",
          "#e0f3f8",
          "#91bfdb",
          "#4575b4"
        ],
        8: [
          "#d73027",
          "#f46d43",
          "#fdae61",
          "#fee090",
          "#e0f3f8",
          "#abd9e9",
          "#74add1",
          "#4575b4"
        ],
        9: [
          "#d73027",
          "#f46d43",
          "#fdae61",
          "#fee090",
          "#ffffbf",
          "#e0f3f8",
          "#abd9e9",
          "#74add1",
          "#4575b4"
        ],
        10: [
          "#a50026",
          "#d73027",
          "#f46d43",
          "#fdae61",
          "#fee090",
          "#e0f3f8",
          "#abd9e9",
          "#74add1",
          "#4575b4",
          "#313695"
        ],
        11: [
          "#a50026",
          "#d73027",
          "#f46d43",
          "#fdae61",
          "#fee090",
          "#ffffbf",
          "#e0f3f8",
          "#abd9e9",
          "#74add1",
          "#4575b4",
          "#313695"
        ]
      },
      RdBu: {
        3: ["#ef8a62", "#f7f7f7", "#67a9cf"],
        4: ["#ca0020", "#f4a582", "#92c5de", "#0571b0"],
        5: ["#ca0020", "#f4a582", "#f7f7f7", "#92c5de", "#0571b0"],
        6: ["#b2182b", "#ef8a62", "#fddbc7", "#d1e5f0", "#67a9cf", "#2166ac"],
        7: [
          "#b2182b",
          "#ef8a62",
          "#fddbc7",
          "#f7f7f7",
          "#d1e5f0",
          "#67a9cf",
          "#2166ac"
        ],
        8: [
          "#b2182b",
          "#d6604d",
          "#f4a582",
          "#fddbc7",
          "#d1e5f0",
          "#92c5de",
          "#4393c3",
          "#2166ac"
        ],
        9: [
          "#b2182b",
          "#d6604d",
          "#f4a582",
          "#fddbc7",
          "#f7f7f7",
          "#d1e5f0",
          "#92c5de",
          "#4393c3",
          "#2166ac"
        ],
        10: [
          "#67001f",
          "#b2182b",
          "#d6604d",
          "#f4a582",
          "#fddbc7",
          "#d1e5f0",
          "#92c5de",
          "#4393c3",
          "#2166ac",
          "#053061"
        ],
        11: [
          "#67001f",
          "#b2182b",
          "#d6604d",
          "#f4a582",
          "#fddbc7",
          "#f7f7f7",
          "#d1e5f0",
          "#92c5de",
          "#4393c3",
          "#2166ac",
          "#053061"
        ]
      }
    };

    // Get data from api
    const url =
      "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

    d3.json(url).then(function(data) {
      // Format data
      data.monthlyVariance.forEach(d => {
        d.month -= 1;
      });
      // Add heading to svg
      const heading = g.append("text");
      heading
        .attr("id", "title")
        .attr("x", width / 3)
        .attr("y", 0 - padding / 3)
        .text("Monthly Global Land-Surface Temperature");

      g.append("text")
        .attr("id", "description")
        .attr("x", width / 3)
        .attr("y", 0 - padding / 4)
        .html(
          data.monthlyVariance[0].year +
            " - " +
            data.monthlyVariance[data.monthlyVariance.length - 1].year +
            ": base temperature " +
            data.baseTemperature +
            "&#8451;"
        );

      // Create tooltip
      const tooltipDiv = d3
        .select("body")
        .append("div")
        .attr("class", "tooltip")
        .attr("id", "tooltip")
        .style("opacity", 0);

      // Create x and y scales
      const xScale = d3
        .scaleBand()
        .domain(data.monthlyVariance.map(d => d.year))
        .range([0, width]);

      const yScale = d3
        .scaleBand()
        .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
        .range([0, height]);

      // Create x and y axis
      const xAxis = d3
        .axisBottom(xScale)
        .tickValues(
          xScale.domain().filter(function(year) {
            //set ticks to years divisible by 10
            return year % 10 === 0;
          })
        )
        .tickFormat(function(year) {
          const date = new Date(0);
          date.setUTCFullYear(year);
          return d3.timeFormat("%Y")(date);
        })
        .tickSize(10, 1);

      const yAxis = d3
        .axisLeft(yScale)
        .tickValues(yScale.domain())
        .tickFormat(function(month) {
          const date = new Date(0);
          date.setUTCMonth(month);
          return d3.timeFormat("%B")(date);
        })
        .tickSize(10, 1);
      // Call x axis
      g.append("g")
        .attr("id", "x-axis")
        .attr("transform", "translate(" + -1 + "," + height + ")")
        .call(xAxis);
      // Call y axis
      g.append("g")
        .attr("id", "y-axis")
        .attr("transform", "translate(" + -1 + "," + 0 + ")")
        .call(yAxis);
      // Create and add legend
      const legendColors = colorbrewer.RdYlBu[11].reverse();
      const legendWidth = 400;
      const legendHeight = 300 / legendColors.length;

      const variance = data.monthlyVariance.map(function(val) {
        return val.variance;
      });
      const minTemp = data.baseTemperature + Math.min.apply(null, variance);
      const maxTemp = data.baseTemperature + Math.max.apply(null, variance);

      const legendThreshold = d3
        .scaleThreshold()
        .domain(
          (function(min, max, count) {
            const array = [];
            const step = (max - min) / count;
            const base = min;
            for (let i = 1; i < count; i++) {
              array.push(base + i * step);
            }
            return array;
          })(minTemp, maxTemp, legendColors.length)
        )
        .range(legendColors);

      const legendX = d3
        .scaleLinear()
        .domain([minTemp, maxTemp])
        .range([0, legendWidth]);

      const legendXAxis = d3
        .axisBottom(legendX)
        .tickSize(10, 0)
        .tickValues(legendThreshold.domain())
        .tickFormat(d3.format(".1f"));

      const fontSize = 16;
      const spacing = {
        left: 9 * fontSize,
        right: 9 * fontSize,
        top: 1 * fontSize,
        bottom: 10 * fontSize
      };

      const legend = svg
        .append("g")
        .classed("legend", true)
        .attr("id", "legend")
        .attr(
          "transform",
          "translate(" +
            spacing.left +
            "," +
            (spacing.top + height + spacing.bottom - 2 * legendHeight) +
            ")"
        );

      legend
        .append("g")
        .selectAll("rect")
        .data(
          legendThreshold.range().map(function(color) {
            const d = legendThreshold.invertExtent(color);
            if (d[0] == null) d[0] = legendX.domain()[0];
            if (d[1] == null) d[1] = legendX.domain()[1];
            return d;
          })
        )
        .enter()
        .append("rect")
        .style("fill", function(d, i) {
          return legendThreshold(d[0]);
        })
        .attr({
          x: function(d, i) {
            return legendX(d[0]);
          },
          y: 0,
          width: function(d, i) {
            return legendX(d[1]) - legendX(d[0]);
          },
          height: legendHeight
        });

      legend
        .append("g")
        .attr("transform", "translate(" + 0 + "," + legendHeight + ")")
        .call(legendXAxis);

      // Create the heat map with rects
      g.selectAll()
        .data(data.monthlyVariance)
        .enter()
        .append("rect")
        .attr("class", "cell")
        .attr("data-month", function(d) {
          return d.month;
        })
        .attr("data-year", function(d) {
          return d.year;
        })
        .attr("data-temp", function(d) {
          return data.baseTemperature + d.variance;
        })
        .attr("x", function(d) {
          return xScale(d.year);
        })
        .attr("y", function(d) {
          return yScale(d.month);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", yScale.bandwidth())
        .style("fill", function(d, i) {
          return legendThreshold(data.baseTemperature + d.variance);
        })
        .on("mouseover", function(d) {
          tooltipDiv
            .style("opacity", 0.9)
            .attr("data-year", d.year)
            .html(
              "<span class='date'>" +
                d3.timeFormat("%Y - %B")(new Date(d.year, d.month)) +
                "</span>" +
                "<br />" +
                "<span class='temperature'>" +
                d3.format(".1f")(data.baseTemperature + d.variance) +
                "&#8451;" +
                "</span>" +
                "<br />" +
                "<span class='variance'>" +
                d3.format("+.1f")(d.variance) +
                "&#8451;" +
                "</span>"
            )
            .style("left", d3.event.pageX + "px")
            .style("top", d3.event.pageY - 28 + "px");
        })
        .on("mouseout", function(d) {
          tooltipDiv.style("opacity", 0);
        });
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
