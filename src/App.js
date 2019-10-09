import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BarChart from "./components/BarChart";
import ScatterplotGraph from "./components/ScatterplotGraph";
import HeatMap from "./components/HeatMap";
import ChoroplethMap from "./components/ChoroplethMap";
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
              </button>
              <button
                className="button"
                onClick={() => openVis("scatterplot-graph")}
              >
                Scatterplot Graph
              </button>
              <button className="button" onClick={() => openVis("heat-map")}>
                Heat Map
              </button>
              <button
                className="button"
                onClick={() => openVis("choropleth-map")}
              >
                Choropleth Map
              </button>
            </div>
          </React.Fragment>
        )}
      />
      <Route path="/bar-chart" render={props => <BarChart />} />
      <Route path="/scatterplot-graph" render={props => <ScatterplotGraph />} />
      <Route path="/heat-map" render={props => <HeatMap />} />
      <Route path="/choropleth-map" render={props => <ChoroplethMap />} />
    </div>
  );
}

export default () => (
  <Router basename="/d3-visualizations">
    <Route component={App} />
  </Router>
);
