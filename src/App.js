import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import BarChart from "./components/BarChart";
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
            </div>
          </React.Fragment>
        )}
      />
      <Route path="/bar-chart" render={props => <BarChart />} />
    </div>
  );
}

export default () => (
  <Router basename="/d3-visualizations">
    <Route component={App} />
  </Router>
);
