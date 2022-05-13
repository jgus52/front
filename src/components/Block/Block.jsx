import React from 'react'

import './Block.scss'

const Block = (props) => {

  let blockComponent ='';

  blockComponent = 
    <div style={{backgroundColor: "#ffffff"}} className="items block-container">
      {props.children}
    </div>

  return (
    <>
      {blockComponent}
    </>
  )
}

export default Block