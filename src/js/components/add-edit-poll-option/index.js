import React from "react";
import { InputText } from '../form-fields';
import formFieldValidators from '../form-field-validators';
import Modal from '../modal';

const AddPollOption = ( { hideAddPollOption, handleCloserClick, handleStepCompletion, inError, errorMessage, value } ) => {
    if( hideAddPollOption ) {
      return null;
    }
    let optionVerb = "Add";
    if( value ) {
      optionVerb = "Edit";
    }
    return (
      <Modal
        handleCloserClick = { handleCloserClick }
      >
        <div className="zippypoll__entry-block">
          <div className="zippypoll__add-user-form zippypoll__form-step zippypoll__active-form-step">
            <InputText
              buttonLabel = "Go"
              label = { `${ optionVerb } poll option` }
              name="polloption"
              placeholder="Poll Option"
              handleStepCompletion = { handleStepCompletion }
              type="text"
              validate = { formFieldValidators.requiredValidator }
              inError = { inError }
              errorMessage = { errorMessage }
              value = { value }
            />
          </div>
        </div>
      </Modal>
    )
};

export default AddPollOption;
