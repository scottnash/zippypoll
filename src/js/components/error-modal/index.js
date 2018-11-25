import React from "react";
import Modal from '../modal';

const ErrorModal = ( { hideErrorModal, handleCloserClick, errorMessage } ) => {
    if( hideErrorModal ) {
      return null;
    }

    return (
      <Modal
        handleCloserClick = { handleCloserClick }
      >
        <div className="zippypoll__entry-block">
          <h2>Error</h2>
          <p>{ errorMessage }</p>
        </div>
      </Modal>
    )
};

export default ErrorModal;
