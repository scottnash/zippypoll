import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import Home from "../../pages/home";
import About from "../../pages/about";
import Logo from "../logo";

export default class Layout extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      entryAnimation: null
    }
  }

    componentDidMount() {
        this.setState( { entryAnimation: 'entry-animation' } );
    }

    render() {
        return (
            <div className={ this.state.entryAnimation }>
              <div className="layout__header-holder">
                <header>
                  <Logo />
                </header>
              </div>
              <div>
                  <Link to="/">Home</Link>
                  <Link to="/about">About</Link>
              </div>
                <Switch>
                    <Route path="/about" exact component={ About } />
                    <Route component={ Home } />
                </Switch>
            </div>
        );
    }
}
