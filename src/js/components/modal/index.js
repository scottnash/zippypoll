import React, { Component } from "react";
if (process.env.BROWSER) {
  require('./modal.scss');
}

export default class Modal extends Component {

  componentDidMount() {
    document.addEventListener( 'keydown', this.closeOnEscape );
  }

  componentWillUnmount() {
    document.removeEventListener( 'keydown', this.closeOnEscape );
  }

  closeOnEscape = ( e ) => {
    if (e.keyCode === 27) {
      e.preventDefault();
      this.props.handleCloserClick( e, true );
    }
  }

  render() {
    const { children, handleCloserClick } = this.props;
    return (
      <div
        className="zippypoll__modal-background"
        onClick={ handleCloserClick }
        >
        <div className="zippypoll__modal-holder">
          <div className="zippypoll__modal-closer" onClick={ handleCloserClick }></div>
          { children }
        </div>
      </div>
    );
  }
}
