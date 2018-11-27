import React from "react";
if (process.env.BROWSER) {
  require('./loader.scss');
}
const Loader = ( ) => {
  return  (
    <div className="loader-holder">
      <div className="loader"></div>
      <span>Loading</span>
    </div>
  )
}

export default Loader;
