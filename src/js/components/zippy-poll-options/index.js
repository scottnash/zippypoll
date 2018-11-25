import React from "react";
if (process.env.BROWSER) {
  require('./zippy-poll-options.scss');
}

const renderEdit = ( option, nickname, showAddPollOption ) => {
  if( ( !option.nicknames || option.nicknames.length === 0 ) && nickname === option.optioncreator ) {
    return <span onClick = { (e)=> { e.stopPropagation(); showAddPollOption( e, option ) } } className="zippypoll_edit">Edit</span>
  }
  return null;
}

const renderOptions = ( options, nickname, optionClicked, showAddPollOption ) => {
  return options.map( ( option, index ) => {
    const nicknames = option.nicknames ? option.nicknames.split(',') : [];
    const addOrSubtract = nicknames.indexOf(nickname);
    const addOrSubtractClass = addOrSubtract < 0 ? 'zippypoll__add-option' : 'zippypoll__subtract-option';
    const hideVotingClass = nickname ? '' : 'zippypoll__hide-voting';
    return (
      <li key={ option.id } onClick = { ()=> { optionClicked( option.id, addOrSubtract ) } }>
        <div className={ `zippypoll__option ${ addOrSubtractClass } ${ hideVotingClass }` }>{ option.option }{ renderEdit( option, nickname, showAddPollOption ) }</div>
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


const ZippyPollOptions =  ( { options, nickname, optionClicked, showAddPollOption } ) => {
  return (
    <ul className="zippypoll__options-holder">
      { renderOptions( options, nickname, optionClicked, showAddPollOption )}
    </ul>
  )
};

export default ZippyPollOptions;
