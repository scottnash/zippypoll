import React from "react";
import ZippyPollOptions from '../zippy-poll-options';

const renderAddOption = ( nickname, showAddPollOption ) => {
  if( !nickname ) {
    return null;
  }
  return (
    <div>
      <a onClick = { showAddPollOption }>Add Poll Option</a>
    </div>
  )
}


const ZippyPollForm =  ( { question, creatornickname, datecreated, nickname, showAddPollOption, pollOptions } ) => {
  return (
    <div className="zippypoll__form zippypoll__entry-block">
      <h1>{ question }</h1>

      <ZippyPollOptions
        options = { pollOptions }
      />
      { renderAddOption( nickname, showAddPollOption ) }
      <div className="zippypoll__form-footer">
        <div>Voting as: { nickname }</div>
        <div>
          Created By: { creatornickname }
        </div>
        <div>
          Created On: { datecreated.toLocaleDateString("en-US") }
        </div>
      </div>
    </div>
  )
};

export default ZippyPollForm;
