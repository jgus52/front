import React from 'react'
import { Link } from 'react-router-dom'

import './Button2.scss'

const Button2 = (props) => {

  let buttonComponent ='';

  if(props.link) {
    buttonComponent =(
      <Link 
        to={props.link}
        className="button-container2" 
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
        className="button-container2" 
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

export default Button2