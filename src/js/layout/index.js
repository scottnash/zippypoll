import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import Home from "../pages/home";
import About from "../pages/about";
import Poll from "../pages/poll";
import Logo from "../components/logo";
import Foot from "../components/foot";
import * as cookies from '../helpers/cookies.js';

export default class Layout extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      animating: false,
      entryAnimation: null,
      participatingPolls: []
    }
  }

  componentDidMount() {
    this.updateFooterPolls();
  }

  turnOnEntryAnimation = ( ) => {
    this.setState( { animating: !this.state.animating }, () => {
      const animationClass = this.state.animating ? 'entry-animation' : null;
      this.setState( { entryAnimation: animationClass } );
    } )
  }

  updateFooterPolls = () => {
    this.setState( { participatingPolls: cookies.getAllPollCookies() } );
  }

  render() {
    return (
        <div className={ this.state.entryAnimation }>
          <div className="layout__header-holder">
            <header>
              <Logo />
            </header>
          </div>
          <div className="layout__body-holder">
            <Switch>
                <Route path="/poll/:id" render= { (props) => <Poll key={ props.location.key } {...props} turnOnEntryAnimation = { this.turnOnEntryAnimation }/> } updateFooterPolls = { this.updateFooterPolls }  />
                <Route path="/about" exact render= { (props) => <About {...props} turnOnEntryAnimation = { this.turnOnEntryAnimation }/> } />
                <Route render= { (props) => <Home {...props} turnOnEntryAnimation = { this.turnOnEntryAnimation } updateFooterPolls = { this.updateFooterPolls } /> } />
            </Switch>
          </div>
          <Foot participatingPolls = { this.state.participatingPolls } />
        </div>
    );
  }
}
