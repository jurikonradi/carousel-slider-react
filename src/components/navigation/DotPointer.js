import React from "react";
import "./DotPointer.sass";

function DotPointer(props) {
  const isTouchScreen = props.isTouchScreen;
  let className = "dot-pointer";
  if (!props.activeDot) {
    className += " dot-transparent";
  }

  if (isTouchScreen) {
    return <div className={className}></div>;
  } else {
    return (
      <button
        onClick={() => props.goToElement(props.number)}
        type="button"
        className="button-dot"
      >
        <div className={className}></div>
      </button>
    );
  }
}

export default DotPointer;
