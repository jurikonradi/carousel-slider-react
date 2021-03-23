let settings = {
  elementWidthDesktop: 600,
  elementMoveDuration: 0.35,
  longSwipe: 500,
};

export default settings;

// Explanation:

// elementWidthDesktop -
// must be the same as 'width' value at settings.sass
// sets carousel's width on big screens (desktop, that don't use swipe possibility)

//elementMoveDuration = duration of animation (movement) from one element(slide) to another, in seconds. 0.35 seconds recomended

// longSwipe = 500ms = 0.5sec (timer works with 200ms increment: 0,200,400,600...)
