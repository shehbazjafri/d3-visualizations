import React, { useEffect } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import "./ChoroplethMap.css";

export default function ChoroplethMap() {
  const drawChart = () => {
    //Sets dimensions
    const margin = { top: 0, left: 0, bottom: 0, right: 0 },
      width = 1200 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

    //Tells the map how to draw the paths
    const path = d3.geoPath();

    // Create svg canvas
    const svg = d3
      .select("#choropleth")
      .append("svg")
      .attr("width", width)
      .attr("height", height);

    // Create group container on svg that will contain the map
    const g = svg.append("g").attr("transform", `translate(${0},${0})`);

    // Data files
    const eduData =
      "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/for_user_education.json";
    const countyData =
      "https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json";
    const files = [eduData, countyData];

    // Create and add legend
    const xScale = d3
      .scaleLinear()
      .domain([2.6, 75.1])
      .rangeRound([600, 860]);

    const color = d3
      .scaleThreshold()
      .domain(d3.range(2.6, 75.1, (75.1 - 2.6) / 8))
      .range(d3.schemeGreens[9]);

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

    // Define the div for the tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip")
      .attr("id", "tooltip")
      .style("opacity", 0);

    // Get data and render map
    Promise.all(files.map(url => d3.json(url))).then(function(values) {
      // Education data
      const edu = values[0];
      // US Counties
      const us = values[1];

      // Mouseover tooltip event
      const mouseover = function(d) {
        tooltip
          .style("opacity", 0.9)
          .html(function() {
            const result = edu.filter(function(obj) {
              return obj.fips === d.id;
            });
            if (result[0]) {
              return (
                result[0]["area_name"] +
                ", " +
                result[0]["state"] +
                ": " +
                result[0].bachelorsOrHigher +
                "%"
              );
            }
            //could not find a matching fips id in the data
            return 0;
          })
          .attr("data-education", function() {
            const result = edu.filter(function(obj) {
              return obj.fips === d.id;
            });
            if (result[0]) {
              return result[0].bachelorsOrHigher;
            }
            //could not find a matching fips id in the data
            return 0;
          })
          .style("left", d3.event.pageX + 10 + "px")
          .style("top", d3.event.pageY - 28 + "px");
      };

      const mouseout = function(d) {
        tooltip.style("opacity", 0);
      };

      // Draw counties
      const counties = topojson.feature(us, us.objects.counties).features;
      g.selectAll("path")
        .data(counties)
        .enter()
        .append("path")
        .attr("class", "county")
        .attr("data-fips", function(d) {
          return d.id;
        })
        .attr("data-education", function(d) {
          var result = edu.filter(function(obj) {
            return obj.fips === d.id;
          });
          if (result[0]) {
            return result[0].bachelorsOrHigher;
          }
          //could not find a matching fips id in the data
          console.log("could find data for: ", d.id);
          return 0;
        })
        .attr("fill", function(d) {
          var result = edu.filter(function(obj) {
            return obj.fips === d.id;
          });
          if (result[0]) {
            return color(result[0].bachelorsOrHigher);
          }
          //could not find a matching fips id in the data
          return color(0);
        })
        .attr("d", path)
        .on("mouseover", mouseover)
        .on("mouseout", mouseout);

      // Overlay state lines over counties
      const states = topojson.mesh(us, us.objects.states, function(a, b) {
        return a !== b;
      });

      g.append("path")
        .datum(states)
        .attr("class", "state")
        .attr("d", path);
    });
  };

  useEffect(() => {
    drawChart();
  }, []);

  return (
    <div className="container">
      <header>
        <span>Choropleth Map</span>
      </header>
      <h1 id="title">United States Educational Attainment</h1>
      <div id="description">
        Percentage of adults age 25 and older with a bachelor's degree or higher
        (2010-2014)
      </div>
      <div id="choropleth"></div>
    </div>
  );
}
