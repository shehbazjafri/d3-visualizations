import React, { useEffect } from "react";
import * as d3 from "d3";
import "./BarChart.css";

export default function BarChart() {
  const drawChart = () => {};

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
