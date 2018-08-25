import * as constants from './constants';
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';


const ZippyPollData = ( state = {}, action) => {
  switch (action.type){
    default:
      return state;
  }
}

export default combineReducers({
  ZippyPollData,
  form
});
