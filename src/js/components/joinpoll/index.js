import React from "react";
import { InputText } from '../form-fields';
import formFieldValidators from '../form-field-validators';
import Modal from '../Modal';

const JoinPoll = ( { nickname, hideJoinPoll, poll,  handleCloserClick } ) => {
  if( nickname || hideJoinPoll ){
    return null;
  } else {
    return (
      <Modal
        handleCloserClick = { handleCloserClick }
      >
        <div className="zippypoll__entry-block">
          <form className="zippypoll__add-user-form zippypoll__form-step zippypoll__active-form-step">
            <InputText
              activeFormStep = { 0 }
              buttonLabel = "Go"
              index = { 1 }
              label = { "Enter your initials or a nickname to participate in this poll" }
              name="nickname"
              placeholder="Nickname"
              handleStepCompletion = { handleStepCompletion }
              type="text"
              validate = { formFieldValidators.requiredValidator }
            />
          </form>
        </div>
      </Modal>
    )
  }

  const handleStepCompletion = () => {
    console.log( 'complete');
  }
}

export default JoinPoll;
