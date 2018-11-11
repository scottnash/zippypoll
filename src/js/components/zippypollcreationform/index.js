import React from "react";
import { withRouter } from 'react-router-dom'
import { InputText } from '../form-fields';
import formFieldValidators from '../form-field-validators';
import axios from 'axios';
import * as cookies from '../../helpers/cookies.js';

if (process.env.BROWSER) {
  require('./ZippyPollCreationForm.scss');
}

class ZippyPollCreationForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      activeFormSection: 'pollquestion',
      activeFormStep: 0
    }
  }

  getFormSteps = () => {
    return [
      <InputText
        activeFormStep = { this.state.activeFormStep }
        buttonLabel = "Go"
        index = { 0 }
        label = "First, enter your qestion"
        name="pollquestion"
        placeholder = "Poll question"
        handleStepCompletion = { this.handleStepCompletion }
        type="text"
        validate = { formFieldValidators.requiredValidator }
      />,
      <InputText
        activeFormStep = { this.state.activeFormStep }
        buttonLabel = "Create Poll"
        index = { 1 }
        label = { "Then, enter your initials or a nickname" }
        name="nickname"
        placeholder="Nickname"
        handleStepCompletion = { this.handleStepCompletion }
        type="text"
        validate = { formFieldValidators.requiredValidator }
      />
    ]
  }


  render() {
    this.formSteps = this.getFormSteps();
    return (
      <form className="zippypoll__creation-form">
        { this.renderFormSteps () }
      </form>
    );
  }

  renderFormSteps = () => {
    return this.formSteps.map( ( formStep, index ) => {
      return (
        <div key={ index } className={ `zippypoll__form-step ${ this.getActiveFormStepClass( index ) } `}>
          { formStep }
        </div>
      )
    }  );
  }

  getActiveFormStepClass = ( index ) => {
    return index === this.state.activeFormStep ? 'zippypoll__active-form-step' : '';
  }

  handleStepCompletion = ( index ) => {
    if( index < this.formSteps.length ) {
      this.setState( { activeFormStep: index } );
    } else {
      this.setState( { activeFormStep: index }, this.createPoll );
    }
  }

  setActiveFormStep = ( index ) => {

  }

  createPoll = () => {
    axios.post('/api/createpoll', this.props.getZippyPollCreationFormValues, {
      headers: {
          'Content-Type': 'application/json'
      }
    }).then( (response) => {
      if(response.data.status === "success") {
        cookies.setCookie( response.data.urlhash, this.props.getZippyPollCreationFormValues.nickname );
        this.props.history.push(`/poll/${ response.data.urlhash }`);
      }
    });
  }
}


export default withRouter( ZippyPollCreationForm );
