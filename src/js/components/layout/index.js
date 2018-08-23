import React from "react";
import { Link, Switch, Route } from "react-router-dom";
import Home from "../../pages/home";
import About from "../../pages/about";
import Logo from "../logo";

export default class Layout extends React.Component {
    render() {
        return (
            <div>
              <div className="layout__header-holder">
                <header>
                  <Logo />
                  <div>
                      <Link to="/">Home</Link>
                      <Link to="/about">About</Link>
                  </div>
                </header>
              </div>
                <Switch>
                    <Route path="/about" exact component={ About } />
                    <Route component={ Home } />
                </Switch>
            </div>
        );
    }
}
