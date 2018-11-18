import React from "react";
import { InputText } from '../form-fields';
import formFieldValidators from '../form-field-validators';
import Modal from '../modal';

const AddPollOption = ( { hideAddPollOption, handleCloserClick, handleStepCompletion, inError, errorMessage } ) => {
    if( hideAddPollOption ) {
      return null;
    }
    return (
      <Modal
        handleCloserClick = { handleCloserClick }
      >
        <div className="zippypoll__entry-block">
          <div className="zippypoll__add-user-form zippypoll__form-step zippypoll__active-form-step">
            <InputText
              buttonLabel = "Go"
              label = { "Add a poll option" }
              name="polloption"
              placeholder="Poll Option"
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
};

export default AddPollOption;
