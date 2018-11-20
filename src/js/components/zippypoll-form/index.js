import React, { Fragment } from "react";
import ZippyPollOptions from '../zippy-poll-options';

const renderAddOption = ( nickname, showAddPollOption ) => {
  if( !nickname ) {
    return null;
  }
  return <button className="zippypoll__add-option colored-button" onClick = { showAddPollOption }>Add Poll Option</button>;
}

const renderVotingAs = ( nickname, showJoinPoll ) => {
  if( nickname ) {
    return <Fragment>Voting as: { nickname }</Fragment>
  } else {
    return <button className="zippypoll__add-option colored-button" onClick = { showJoinPoll  }>Join Poll</button>;
  }
}


const ZippyPollForm =  ( { question, creatornickname, datecreated, nickname, showAddPollOption, pollOptions, showJoinPoll, optionClicked } ) => {
  return (
    <div className="zippypoll__form zippypoll__entry-block">
      <h1>{ question }</h1>

      <ZippyPollOptions
        options = { pollOptions }
        nickname = { nickname }
        optionClicked = { optionClicked }
      />
      { renderAddOption( nickname, showAddPollOption ) }
      <div className="zippypoll__form-footer">
        <div>{ renderVotingAs( nickname, showJoinPoll )}</div>
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
