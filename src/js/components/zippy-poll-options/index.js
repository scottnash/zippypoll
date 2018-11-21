import React from "react";

const renderOptions = ( options, nickname, optionClicked ) => {
  return options.map( ( option, index ) => {
    const nicknames = option.nicknames ? option.nicknames.split(',') : [];
    const addOrSubtract = nicknames.indexOf(nickname);
    const addOrSubtractClass = addOrSubtract ? 'zippypoll__add-option' : 'zippypoll__subtract-option';
    console.log(option);
    return (
      <li key={ option.id } onClick = { ()=> { optionClicked( option.id, addOrSubtract ) } }>
        <div className={ `zippypoll__option ${ addOrSubtractClass }` }>{ option.option }</div>
        <div className="zippypoll__votes">{ renderNicknames( nicknames ) }</div>
      </li>
    )
  });
};

const renderNicknames = ( nicknames ) => {
  return nicknames.map( ( nickname, index ) => {
    return <div key={ index } className="zippypoll__nickname-vote">{ nickname }</div>;
  });
};


const ZippyPollOptions =  ( { options, nickname, optionClicked } ) => {
  return (
    <ul className="zippypoll__options-holder">
      { renderOptions( options, nickname, optionClicked )}
    </ul>
  )
};

export default ZippyPollOptions;
