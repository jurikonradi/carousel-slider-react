// Written by Jurijs Konradi 2021

import React, { useState, useEffect, useRef } from "react";
import "./Carousel.sass";
import Chevron from "./navigation/Chevron";
import DotsNavigation from "./navigation/DotsNavigation";
import AllElements from "./elements/AllElements";

let startX = 0;
let deltaX = 0;
const isTouchScreen = "ontouchstart" in document.documentElement;
let elementMoveDuration = 0;
let elementIndex = 0;
let swipeTime;
let timerIsOn = false;
let timerID;
let deltaXAbsolute = 0;
let elementWidth;
let minimalMouseSwipe = 30; // minimal swipe on mouse (pixels) to go to next element/slide

function Carousel(props) {
  const [moveValue, setMoveValue] = useState(0);
  const prevMoveValue = usePrevious(moveValue);

  // console.log("carousel renders");

  // let [mobileConsole, setMobileConsole] = useState(""); // for debugging

  function usePrevious(value) {
    const ref = useRef();

    useEffect(() => {
      ref.current = value;
    }, [value]);

    return ref.current;
  }

  let elementSources = props.elementSources;
  let numberOfElements = elementSources.length;

  isTouchScreen
    ? (elementWidth = window.screen.width)
    : (elementWidth = props.settings.elementWidthDesktop);

  const swipeTimer = () => {
    swipeTime += 200;
    timerID = setTimeout(swipeTimer, 200); //counts 0.2 seconds (200 ms)
  };
  const startSwipeTimer = () => {
    if (!timerIsOn) {
      timerIsOn = true;
      swipeTimer();
    }
  };
  const stopSwipeTimer = () => {
    clearTimeout(timerID);
    timerIsOn = false;
  };

  // Desktop, button (chevron) pressed w/ mouse:
  const moveElementLeft = () => {
    elementMoveDuration = props.settings.elementMoveDuration;
    setMoveValue(moveValue - elementWidth);
    elementIndex++;
  };
  const moveElementRight = () => {
    elementMoveDuration = props.settings.elementMoveDuration;
    setMoveValue(moveValue + elementWidth);
    elementIndex--;
  };
  const goToElement = (number) => {
    setMoveValue(number * elementWidth * -1);
    elementIndex = number;
  };

  // Desktop, mouse/trackpad swipe:
  const onMouseSwipe = (e) => {
    // e.preventDefault();
    console.log("deltaX: ", e.deltaX, "prevMoveValue:", prevMoveValue);
    elementMoveDuration = 0;
    setMoveValue((e.deltaX + elementIndex * elementWidth) * -1);
    // swipe left:
    if (e.deltaX > minimalMouseSwipe) {
      elementMoveDuration = props.settings.elementMoveDuration;
      setMoveValue(moveValue - elementWidth);
      if (elementIndex !== numberOfElements - 1) {
        elementIndex++;
      }
    }
    // swipe right:
    if (e.deltaX < minimalMouseSwipe * -1) {
      elementMoveDuration = props.settings.elementMoveDuration;
      setMoveValue(moveValue - elementWidth);
      if (elementIndex !== 0) {
        elementIndex--;
      }
    }
    // if (e.deltaX < minimalMouseSwipe * -1)
  };

  // Touch-screens, swiped:
  const onSwipeStart = (e) => {
    // e.preventDefault(); Error (Chrome): Unable to preventDefault inside passive event listener invocation.
    elementMoveDuration = 0;
    deltaX = 0; // if only touch, no swipe
    swipeTime = 0;
    startSwipeTimer();
    startX = e.touches[0].clientX;
  };
  const onSwipeMove = (e) => {
    // e.preventDefault(); Error (Chrome): Unable to preventDefault inside passive event listener invocation.
    deltaX = startX - e.touches[0].clientX;
    setMoveValue((deltaX + elementIndex * elementWidth) * -1);

    // setMobileConsole((mobileConsole += ", d: " + deltaX));
    //     ', start: ' + startX +
    //     ', m: ' + moveValue +
    //     ", indx(m): " + elementIndex +
  };
  const onSwipeEnd = () => {
    stopSwipeTimer();
    elementMoveDuration = props.settings.elementMoveDuration;
    deltaXAbsolute = Math.abs(deltaX);
    if (
      deltaXAbsolute > elementWidth / 2 ||
      (swipeTime > 0 &&
        swipeTime < props.settings.longSwipe &&
        deltaXAbsolute > 30)
    ) {
      if (
        deltaX > 0 && // swipe left
        elementIndex !== numberOfElements - 1
      ) {
        elementIndex++;
      } else if (
        deltaX < 0 && // swipe right
        elementIndex !== 0
      ) {
        elementIndex--;
      }
    }
    setMoveValue(elementIndex * elementWidth * -1);
  };

  return (
    <div className="outer-container">
      <div
        className="carousel"
        // works, touch only inside element:
        onTouchStart={onSwipeStart}
        onTouchMove={onSwipeMove}
        onTouchEnd={onSwipeEnd}
        onTouchCancel={onSwipeEnd}
        onWheel={onMouseSwipe}
      >
        <AllElements
          // doesn't work if placed here:
          // onTouchStart={onSwipeStart}
          // onTouchMove={onSwipeMove}
          // onTouchEnd={onSwipeEnd}
          move={moveValue}
          elementMoveDuration={elementMoveDuration}
        >
          {elementSources}
        </AllElements>
        <DotsNavigation
          activeDot={elementIndex}
          numberOfDots={numberOfElements}
          goToElement={goToElement}
          isTouchScreen={isTouchScreen}
        />

        {/* show right chevron on desktop only: */}
        {!isTouchScreen &&
        moveValue >= (numberOfElements - 2) * elementWidth * -1 ? (
          <Chevron moveFunction={moveElementLeft} isRight={true} />
        ) : (
          <div></div>
        )}

        {/* show left chevron on desktop only: */}
        {!isTouchScreen && moveValue < 0 ? (
          <Chevron moveFunction={moveElementRight} isRight={false} />
        ) : (
          <div></div>
        )}
      </div>
      <p>
        isTouchScreen: {isTouchScreen.toString()}, elementWidth: {elementWidth}
      </p>
      {/* <p>{mobileConsole}</p> */}
      <p>elementMoveDuration: {elementMoveDuration}</p>
      {/* <p>{mobileConsole}, i(r): {elementIndex}, m(r): {moveValue}</p> */}
    </div>
  );
}

export default Carousel;
