import React from "react";
import ZippyPollCreationForm from "../../components/zippypollcreationform";

if (process.env.BROWSER) {
  require('./home.scss');
}

export default class Home extends React.Component {
  constructor(props){
    super(props);
  }

  componentWillMount = () => {
    if (process.env.BROWSER) {
      document.querySelector('body').setAttribute('data-page', 'home');
    }
  }

  componentWillUnmount() {
    this.props.turnOnEntryAnimation();
  }

  render() {
    return (
      <div className="zippypoll__maxwidth-content-holder zippypoll__home">
        <div className="zippypoll__home__entry-block  zippypoll__entry-block">
          <h1>Find Out What People Really Think</h1>
          <h2>Create your poll in  a zippy!</h2>
          <ZippyPollCreationForm />
        </div>
      </div>
    );
  }

}
