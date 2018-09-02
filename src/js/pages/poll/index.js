import React from "react";

export default class Poll extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillUnmount() {
    this.props.turnOnEntryAnimation();
  }

  render() {
    return (
      <div className="zippypoll__maxwidth-content-holder">
        <h1>This is where the magic will happen.</h1>
      </div>
    );
  }

}
