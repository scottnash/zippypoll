import React from "react";

export default ( { question, creatornickname, datecreated, nickname } ) => {
  return (
    <div className="zippypoll__form">
      <h1>{ question }</h1>
      <h3>{ nickname }</h3>
      <div>
        Created By: { creatornickname }
      </div>
      <div>
        Created On: { datecreated.toLocaleDateString("en-US") }
      </div>
    </div>
  )
}