import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BarChart from "./components/BarChart";
import ScatterplotGraph from "./components/ScatterplotGraph";
import HeatMap from "./components/HeatMap";
import ChoroplethMap from "./components/ChoroplethMap";
import TreeMap from "./components/TreeMap";
import barChartIcon from "./assets/barchart.svg";
import scatterplotIcon from "./assets/scatterplot.svg";
import heatMapIcon from "./assets/heatmap.svg";
import globeIcon from "./assets/globe.svg";
import treemapIcon from "./assets/treemap.svg";
import "./App.css";

function App(props) {
  const openVis = vis => {
    props.history.push(`/${vis}`);
  };

  return (
    <div className="App">
      <Route
        exact
        path="/"
        render={props => (
          <React.Fragment>
            <header>D3 Visualizations</header>
            <div className="visualization-selectors">
              <button className="button" onClick={() => openVis("bar-chart")}>
                Bar Chart
                <img
                  src={barChartIcon}
                  width="100"
                  height="100"
                  alt="bar chart icon"
                />
              </button>
              <button
                className="button"
                onClick={() => openVis("scatterplot-graph")}
              >
                Scatterplot Graph
                <img
                  src={scatterplotIcon}
                  width="100"
                  height="100"
                  alt="scatterplot icon"
                />
              </button>
              <button className="button" onClick={() => openVis("heat-map")}>
                Heat Map
                <img
                  src={heatMapIcon}
                  width="100"
                  height="100"
                  alt="heatmap icon"
                />
              </button>
              <button
                className="button"
                onClick={() => openVis("choropleth-map")}
              >
                Choropleth Map
                <img
                  src={globeIcon}
                  width="100"
                  height="100"
                  alt="globe icon"
                />
              </button>
              <button
                className="button"
                onClick={() => openVis("treemap-diagram")}
              >
                Tree Map
                <img
                  src={treemapIcon}
                  width="100"
                  height="100"
                  alt="treemap icon"
                />
              </button>
            </div>
          </React.Fragment>
        )}
      />
      <Route path="/bar-chart" render={props => <BarChart />} />
      <Route path="/scatterplot-graph" render={props => <ScatterplotGraph />} />
      <Route path="/heat-map" render={props => <HeatMap />} />
      <Route path="/choropleth-map" render={props => <ChoroplethMap />} />
      <Route path="/treemap-diagram" render={props => <TreeMap />} />
    </div>
  );
}

export default () => (
  <Router basename="/d3-visualizations">
    <Route component={App} />
  </Router>
);
