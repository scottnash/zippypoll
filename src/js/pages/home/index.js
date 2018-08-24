import React from "react";

export default class Home extends React.Component {
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
        <h1>ZippyPoll</h1>
      </div>
    );
  }

}
