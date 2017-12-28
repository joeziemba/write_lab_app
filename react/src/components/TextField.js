import React from 'react';

const TextField = (props) => {
  return(
    <label htmlFor={props.fieldName}>{props.label}
      <input type='text' name={props.fieldName} value={props.value} onChange={props.onChange}/>
    </label>
  )
}

export default TextField;
