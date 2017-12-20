import React from 'react';

const AppContainer = (props) => {

  return(
    <div className='grid-x'>
      {props.children}
    </div>
  )
}

export default AppContainer;
