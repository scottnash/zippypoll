import React from "react";

const renderOptions = ( options ) => {
  return options.map( ( option, index ) => {
    return <li key={ option.optionid }>{ option.option }</li>
  });
};


const ZippyPollOptions =  ( { options } ) => {
  if( !options.length ) { return null };
  return (
    <ul className="zippypoll__options-holder">
      { renderOptions( options )}
    </ul>
  )
};

export default ZippyPollOptions;
