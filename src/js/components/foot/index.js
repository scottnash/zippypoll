import React from "react";
import { Link } from "react-router-dom";

if (process.env.BROWSER) {
  require('./footer.scss');
}

export default class Footer extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      myPollsOpen: false
    }
  }

  renderParticipatingPolls = () => {
    if( this.props.participatingPolls.length === 0 ) {
      return <li>No Polls Found</li>;
    }
    return this.props.participatingPolls.map( ( poll, index ) => {
      if( !poll.question ) {
        return null;
      }
      return (
        <li key={ index }><Link to={ `/poll/${ poll.hash }` }>{ poll.question }</Link></li>
      )
    });
  }

  openMyPolls = () => {
    this.setState( { myPollsOpen: !this.state.myPollsOpen } );
  }

  render() {
    return (
      <footer className="layout__footer-holder">
        <div className="layout__inner-footer">
          <div className={ `zippypoll__participating-polls ${ this.state.myPollsOpen ? 'open': '' }` }>
            <label onClick = { this.openMyPolls }>My Polls</label>
            <ul>
              { this.renderParticipatingPolls() }
            </ul>
          </div>
          <div className="colored-button  button">
            <Link to="/">Create a Poll</Link>
          </div>
          <ul className="zippypoll__footer-links">
              <Link to="/about">About</Link>
          </ul>
        </div>
      </footer>
    );
  }
}
