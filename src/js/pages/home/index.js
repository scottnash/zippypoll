import React from "react";
import ZippyPollCreationForm from "../../components/zippypollcreationform";

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
        <ZippyPollCreationForm />
      </div>
    );
  }

}
