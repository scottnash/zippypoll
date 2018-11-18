import React from "react";

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


const ZippyPollForm =  ( { question, creatornickname, datecreated, nickname, showAddPollOption } ) => {
  return (
    <div className="zippypoll__form zippypoll__entry-block">
      <h1>{ question }</h1>
      <h3>{ nickname }</h3>

      { renderAddOption( nickname, showAddPollOption ) }
      <div className="zippypoll__form-footer">
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
