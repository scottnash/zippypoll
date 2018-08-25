import React from "react";

export default class About extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillUnmount() {
    this.props.turnOnEntryAnimation();
  }

  render() {
    return (
      <div className="zippypoll__maxwidth-content-holder">
        <h1>About ZippyPoll</h1>
      </div>
    );
  }

}
