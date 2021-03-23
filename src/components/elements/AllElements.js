import React from "react";
import "./AllElements.sass";

function AllElements(props) {
  const style = {
    transform: `translateX(${props.move}px)`,
    transition: `transform ${props.elementMoveDuration}s`,
  };

  return (
    <div className="all-elements" style={style}>
      {props.children}
    </div>
  );
}

export default AllElements;
