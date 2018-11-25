import React, { Component } from "react";

export class InputText extends Component {
  constructor( props ){
    super( props );

    this.state = {
      inputValue: this.props.value,
      inError: false,
      touched: false
    }
  }

   validateFieldValue = ( fieldValue ) => {
     const error = this.props.validate( fieldValue );
     if( error  ) {
      this.setState( { inError: true, errorMessage: error } );
    } else {
      this.setState( { inError: false, errorMessage: '' } );
    }
   }

   handleChange = ( el ) => {
     const fieldValue = el.target.value;
     this.setState( { inputValue: fieldValue }, () => {
       if( this.state.touched ) {
         this.validateFieldValue( fieldValue );
       }
     } );
   }

   handleSubmit = ( el ) => {
     if( !this.props.validate( this.state.inputValue ) ) {
       this.props.handleStepCompletion(  this.props.name, this.state.inputValue, this.props.index + 1 )
     } else {
       this.validateFieldValue( this.state.inputValue );
     }
   }

   render() {
     return (
       <div className = { `zippypoll__field ${ this.state.inError || this.props.inError ? 'zippypoll__field-inerror': ''}` }>
         <label>{ this.props.label }</label>
         <div className="zippypoll__input-button-holder">
             <input
              name={ this.props.name }
              maxLength={ this.props.maxLength || 10000 }
               onBlur = { el => this.validateFieldValue( el.target.value ) }
               onFocus = { ()=> { this.setState( { touched: true } ) } }
               onChange={ this.handleChange }
               className = { ((this.props.touched || this.props.submitting) && this.props.error) ? 'zippypoll__field-inerror': '' }
               autoFocus = { this.props.activeFormStep === this.props.index }
               value = { this.state.inputValue }
               placeholder={ this.props.placeholder }
               type={ this.props.type }
               onKeyUp = {
                 (e)=> {
                   if (e.keyCode === 13) {
                     e.preventDefault();
                     this.handleSubmit( e );
                   }
                 }
               }
             />
             <button
                className="colored-button"
                type="button"
                onClick= { this.handleSubmit }
             >{ this.props.buttonLabel }</button>
           </div>
           <div className="zippypoll__error-message">{ this.state.inError || this.props.inError ? <span>{ this.state.errorMessage || this.props.errorMessage }</span> : '' }</div>
       </div>
     );
   }
}
