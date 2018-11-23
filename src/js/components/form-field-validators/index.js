const requiredValidator = ( value ) => {
  if( !value || value.length === 0 ){
    return 'Can not be blank';
  }
}

const nopunctuation = ( value ) => {
  const alphanumeric = /^[a-z0-9]+$/i;
  if( !(alphanumeric.test(value)) ){
    return 'Can not be blank and must contain letters and numbers only.';
  }
}

export default { requiredValidator, nopunctuation };
