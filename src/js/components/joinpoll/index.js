import React from "react";
import { InputText } from '../form-fields';
import formFieldValidators from '../form-field-validators';
import Modal from '../modal';

const JoinPoll = ( { nickname, hideJoinPoll, poll,  handleCloserClick, handleStepCompletion, inError, errorMessage } ) => {
  if( nickname || hideJoinPoll ){
    return null;
  } else {
    return (
      <Modal
        handleCloserClick = { handleCloserClick }
      >
        <div className="zippypoll__entry-block">
          <div className="zippypoll__add-user-form zippypoll__form-step zippypoll__active-form-step">
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
              inError = { inError }
              errorMessage = { errorMessage }
            />
          </div>
        </div>
      </Modal>
    )
  }


}

export default JoinPoll;
