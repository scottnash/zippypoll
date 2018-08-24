import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import Home from "../../pages/home";
import About from "../../pages/about";
import Logo from "../logo";
import HeaderLinks from "../headerlinks";

export default class Layout extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      animating: false,
      entryAnimation: null
    }
  }

  turnOnEntryAnimation = ( ) => {
    this.setState( { animating: !this.state.animating }, () => {
      const animationClass = this.state.animating ? 'entry-animation' : null;
      this.setState( { entryAnimation: animationClass } );
    } )
  }

  render() {
    return (
        <div className={ this.state.entryAnimation }>
          <div className="layout__header-holder">
            <header>
              <Logo />
              <HeaderLinks />
            </header>
          </div>
          <div className="layout__body-holder">
            <Switch>
                <Route path="/about" exact render= { (props) => <About {...props} turnOnEntryAnimation = { this.turnOnEntryAnimation }/> } />
                <Route render= { (props) => <Home {...props} turnOnEntryAnimation = { this.turnOnEntryAnimation }/> } />
            </Switch>
          </div>
          <div className="layout__footer-holder">

          </div>
        </div>
    );
  }
}
