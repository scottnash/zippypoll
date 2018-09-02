import React from "react";
import { connect } from 'react-redux';
import redux from '../../redux';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';
import { withRouter } from 'react-router-dom'
import formFields from '../form-fields';
import formFieldValidators from '../form-field-validators';
import axios from 'axios';

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
      <Field
        activeFormStep = { this.state.activeFormStep }
        component = { formFields.inputText }
        index = { 0 }
        label = "What's your qestion?"
        name="pollquestion"
        placeholder = "Poll question"
        handleStepCompletion = { this.handleStepCompletion }
        type="text"
        validate = { formFieldValidators.requiredValidator }
      />,
      <Field
        activeFormStep = { this.state.activeFormStep }
        component = { formFields.inputText }
        index = { 1 }
        label = { "Enter your initials/nickname" }
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
      <form>
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
        this.props.history.push(`/poll/${ response.data.urlhash }`);
      }
    });
  }
}

ZippyPollCreationForm = reduxForm({
  form: 'ZippyPollCreationForm'
})(ZippyPollCreationForm);


const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const mapStateToProps = (state) => {
  return {
    getZippyPollCreationFormValues: redux.selectors.getZippyPollCreationFormValues(state),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ZippyPollCreationForm));
