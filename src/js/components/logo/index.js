import React from "react";
import { Link } from "react-router-dom";
import { helloWorld } from './test';
if (process.env.BROWSER) {
  require('./ZippyLogo.scss');
}


export default class Logo extends React.Component {
  render() {
    return (
      <div className="scene">
        <div className="card">
          <div className="card__face card__face--front">
            <Link to="/" className="layout__logo">
              <h1>Zippy Poll</h1>
            </Link>
          </div>
          <div className="card__face card__face--back">
            <Link to="/" className="layout__logo">
              <h1>Zippy Poll</h1>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
