import React from "react";
import ZippyPollForm from "../../components/zippypollform";

export default class Home extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillUnmount() {
    this.props.turnOnEntryAnimation();
  }

  render() {
    return (
      <div className="zippypoll__maxwidth-content-holder">
        <h1>Gather a group's opinion on anything</h1>
        <ZippyPollForm />
      </div>
    );
  }

}
