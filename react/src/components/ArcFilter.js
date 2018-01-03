import React from 'react';

const ArcFilter = (props) => {
  let clearFilter = () => {
    let clear = () => {
      return props.getArcs('')
    }
    return(
      <a className='util-button-dark' onClick={clear}>Clear Filter</a>
    )
  }
  return(
    <div className='grid-x'>
      <div className='cell' id='arc-filter'>
        <div className='filter'>Filter: {props.filter}</div> {props.filter != 'All' ? clearFilter() : null}
      </div>
    </div>
  )
}

export default ArcFilter;
