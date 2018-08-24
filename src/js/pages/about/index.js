import React from "react";

export default class About extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount() {
    window.setTimeout( ()=> {
      this.props.turnOnEntryAnimation();
    }, 250);
  }

  render() {
    return (
      <div className="zippypoll__maxwidth-content-holder">
        <h1>About ZippyPoll</h1>
      </div>
    );
  }

}
