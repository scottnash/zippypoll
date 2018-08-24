import React from "react";
import { Link } from "react-router-dom";

if (process.env.BROWSER) {
  require('./headerlinks.scss');
}

export default class HeaderLinks extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <ul className="zippypoll__header-links">
          <Link to="/about">About</Link>
      </ul>
    );
  }
}
