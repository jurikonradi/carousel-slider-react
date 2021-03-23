import React from "react";
import DotPointer from "./DotPointer.js";
import "./DotsNavigation.sass";

function DotsNavigation(props) {
  let dotsItems = [];
  let i;
  let activeDot = false;
  for (i = 0; i < props.numberOfDots; i++) {
    if (i === props.activeDot) {
      activeDot = true;
    }
    dotsItems.push(
      <DotPointer
        activeDot={activeDot}
        goToElement={props.goToElement}
        number={i}
        key={i}
        isTouchScreen={props.isTouchScreen}
      />
    );
    activeDot = false;
  }

  return (
    <div className="dots-nav-container">
      <div className="dots-nav">{dotsItems}</div>
    </div>
  );
}

export default DotsNavigation;
