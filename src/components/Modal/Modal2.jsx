import Block from "../Block/Block";

import "./Modal2.scss";

const Modal2 = (props) => {
  return (
    <div
      className={"modal2-container"}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          props.onClose(event);
          console.log("container");
        }
      }}
    >
      <Block>
        <div className="modal-children">{props.children}</div>
        <div className="modal-buttons">
          <p>lala</p>
        </div>
      </Block>
    </div>
  );
};

export default Modal2;
