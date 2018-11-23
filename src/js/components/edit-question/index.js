import React from "react";
import { InputText } from '../form-fields';
import formFieldValidators from '../form-field-validators';
import Modal from '../modal';

const EditQuestion = ( { hideEditQuestion, handleCloserClick, handleStepCompletion, inError, errorMessage, value } ) => {
    if( hideEditQuestion ) {
      return null;
    }
    return (
      <Modal
        handleCloserClick = { handleCloserClick }
      >
        <div className="zippypoll__entry-block">
          <div className="zippypoll__edit-question-form zippypoll__form-step zippypoll__active-form-step">
            <InputText
              buttonLabel = "Go"
              label = "Edit question"
              name="pollquestion"
              placeholder="Poll Question"
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

export default EditQuestion;
