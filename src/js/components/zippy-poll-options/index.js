import React from "react";

const renderOptions = ( options ) => {
  return options.map( ( option, index ) => {
    console.log(option);
    return (
      <li key={ option.optionid }>
        <div className="zippypoll__option">{ option.option }</div>
        <div className="zippypoll__votes">{ renderNicknames( option.nicknames ) }</div>
      </li>
    )
  });
};

const renderNicknames = ( nicknames ) => {
  const nickNameArray = nicknames.split(',');
  return nickNameArray.map( ( nickname, index ) => {
    return <div key={ index } className="zippypoll__nickname-vote">{ nickname }</div>;
  });
};


const ZippyPollOptions =  ( { options } ) => {
  return (
    <ul className="zippypoll__options-holder">
      { renderOptions( options )}
    </ul>
  )
};

export default ZippyPollOptions;
