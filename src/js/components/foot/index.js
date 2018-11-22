import React, { Fragment } from "react";
import { Link } from "react-router-dom";

if (process.env.BROWSER) {
  require('./footer.scss');
}

export default class Footer extends React.Component {
  constructor(props){
    super(props);
  }

  renderParticipatingPolls = () => {
    return this.props.participatingPolls.map( ( poll, index ) => {
      if( !poll.question ) {
        return null;
      }
      return (
        <li key={ index }><Link to={ `/poll/${ poll.hash }` }>{ poll.question }</Link></li>
      )
    });
  }

  render() {
    return (
      <Fragment>
        <div>
          <ul>
            { this.renderParticipatingPolls() }
          </ul>
        </div>
        <ul className="zippypoll__header-links">
            <Link to="/about">About</Link>
        </ul>
      </Fragment>
    );
  }
}
