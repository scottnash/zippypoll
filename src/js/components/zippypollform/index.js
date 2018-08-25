import React from "react";
import { connect } from 'react-redux';
import redux from '../../redux';
import { Field, reduxForm, formValueSelector, change } from 'redux-form';


if (process.env.BROWSER) {
  require('./ZippyPollForm.scss');
}

export default class ZippyPollForm extends React.Component {
  render() {
    return (
      <form>
        <label>What's your poll question?</label>
        <input name="pollquestion" type="text" placeholder="Poll question" />
      </form>
    );
  }
}
