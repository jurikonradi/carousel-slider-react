import React from "react";
import "./Chevron.sass";

function Chevron(props) {
  let classNameButton = "chevron-button-";
  let classNameIcon = "chevron chvr-";
  if (props.isRight) {
    classNameButton += "right";
    classNameIcon += "right";
  } else {
    classNameButton += "left";
    classNameIcon += "left";
  }
  return (
    <button
      onMouseDown={props.moveFunction}
      type="button"
      className={classNameButton}
    >
      <div className={classNameIcon}></div>
    </button>
  );
}

export default Chevron;
