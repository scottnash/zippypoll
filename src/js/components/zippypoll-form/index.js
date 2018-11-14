import React from "react";

const ZippyPollForm =  ( { question, creatornickname, datecreated, nickname } ) => {
  return (
    <div className="zippypoll__form zippypoll__entry-block">
      <h1>{ question }</h1>
      <h3>{ nickname }</h3>

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
}

export default ZippyPollForm;
