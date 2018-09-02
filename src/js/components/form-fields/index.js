import React from "react";

const inputText = ( { input, label, placeholder, type, index, handleStepCompletion, activeFormStep, meta: props } ) => {
   const textInput = React.createRef();
     setTimeout( ()=> {
       if( textInput.current && index === activeFormStep ) {
         textInput.current.focus();
       }
     }, 0);
    return (
      <div>
        <label>{ label }</label>
          <input
            autoFocus = { activeFormStep === index }
            { ...input}
            placeholder={ placeholder }
            type={ type }
            onKeyUp = {
              (e)=> {
                if (e.keyCode === 13) {
                  e.preventDefault();
                  handleStepCompletion( index + 1 );
                }
              }
            }
            ref = { textInput }
          />
          <button
             type="button"
             onClick= { () => handleStepCompletion( index + 1 ) }
             disabled = { props.error }
          >Go</button>
          <div className="zippypoll__error-message">{ ((props.touched || props.submitting) && props.error) ? <span>{ props.error }</span> : '' }</div>
      </div>
    );
}

export default { inputText };
