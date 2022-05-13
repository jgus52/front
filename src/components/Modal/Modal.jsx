import Block from '../Block/Block'
import Button from '../Button/Button'

import './Modal.scss'

const Modal = (props) => {
  return (
    <div className={["modal-container", props.modalOpen].join(' ')}>
      <Block>
        <div className="modal-children">
          { props.children }
        </div>
        <div className="modal-buttons">
          <Button 
            text={props.buttonText} 
            color="#4d76a4" 
            size={props.buttonSize}
            onClick={props.onClick}
            />
          {props.isCancleAllowed &&
          <Button 
            text="취소" 
            color="#E99497" 
            size={props.buttonSize}
            onClick={props.onCancleClick}
            />
          }
        </div>
      </Block>
    </div>
  )
}

export default Modal
