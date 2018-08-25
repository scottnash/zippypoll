import React from "react";
import { Link } from "react-router-dom";

if (process.env.BROWSER) {
  require('./ZippyLogo.scss');
}

export default class Logo extends React.Component {
  render() {
    return (
      <Link to="/" className="scene">
        <div className="card">
          <div className="card__face card__face--front">
            <div className="layout__logo">
              <h1>Zippy Poll</h1>
            </div>
          </div>
          <div className="card__face card__face--back">
            <div className="layout__logo">
              <h1>Zippy Poll</h1>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}
