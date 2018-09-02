const requiredValidator = ( value ) => {
  if( !value || value.length === 0 ){
    return 'Can not be blank';
  }
}

export default { requiredValidator };
