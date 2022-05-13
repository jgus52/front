import React from 'react'
import { Link } from 'react-router-dom'

import './Button.scss'

const Button = (props) => {

  let buttonComponent ='';

  if(props.link) {
    buttonComponent =(
      <Link 
        to={props.link}
        className="button-container" 
        onClick={props.onClick}  
        style={{ 
          color: props.color,
          fontSize: props.size,
        }}>
          {props.text}
      </Link>
    )
  } else {
    buttonComponent = (
      <button 
        className="button-container" 
        onClick={props.onClick}
        type={props.type? props.type : "button"}
        style={{ 
          color: props.color,
          fontSize: props.size,
        }}>
          {props.text}
      </button>
    )
  }

  return (
    <>
      {buttonComponent}
    </>
    
  )
}

export default Button