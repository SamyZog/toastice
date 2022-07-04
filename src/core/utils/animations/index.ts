import {
  AnimateTo,
  ToasticeAnimationKeyframes,
  ToasticeAnimationOptions,
} from "./animations.types";

const animationOptions: ToasticeAnimationOptions = {
  in: {
    duration: 200,
    delay: 200,
    fill: "forwards",
    easing: "ease-in",
  },
  out: {
    duration: 200,
    fill: "forwards",
    easing: "ease-out",
  },
};

const animateTo: AnimateTo = (node, keyframes, options, onFinish) => {
  const animation = node.animate(
    keyframes,
    animationOptions[options || "in"],
  );

  if (typeof onFinish === "function") {
    animation.addEventListener("finish", (ev) => {
      onFinish(ev);
      animation.commitStyles();
      animation.cancel();
    });
  }

  return animation;
};

const keyframes: ToasticeAnimationKeyframes = {
  pop: {
    in: {
      transform: ["scale(0)", "scale(1.2)", "scale(1)"],
      opacity: [0, 1],
      visibility: "visible",
      offset: [0, 0.75, 1],
    },
    out: {
      transform: ["scale(1)", "scale(1.2)", "scale(0)"],
      opacity: [1, 0],
      offset: [0, 0.25, 1],
    },
  },
  fade: {
    in: {
      opacity: [0, 1],
      visibility: "visible",
    },
    out: {
      opacity: [1, 0],
      visibility: "visible",
    },
  },
  "top-left": {
    in: {
      visibility: "visible",
      transform: ["translateX(-100%)", "translateX(10%)", "translateX(0)"],
    },
    out: {
      visibility: "visible",
      transform: ["translateX(0)", "translateX(10%)", "translateX(-100%)"],
      opacity: [1, 0],
    },
  },
  "top-center": {
    in: {
      visibility: "visible",
      transform: ["translateY(-100%)", "translateY(10%)", "translateY(0)"],
      opacity: [0, 1],
    },
    out: {
      visibility: "visible",
      transform: ["translateY(0)", "translateY(-10%)", "translateY(-100%)"],
      opacity: [1, 0],
    },
  },
  "top-right": {
    in: {
      visibility: "visible",
      transform: ["translateX(100%)", "translateX(-10%)", "translateX(0)"],
    },
    out: {
      visibility: "visible",
      transform: ["translateX(0)", "translateX(-10%)", "translateX(100%)"],
      opacity: [1, 0],
    },
  },
  "bottom-left": {
    in: {
      visibility: "visible",
      transform: ["translateX(-100%)", "translateX(10%)", "translateX(0)"],
    },
    out: {
      visibility: "visible",
      transform: ["translateX(0)", "translateX(10%)", "translateX(-100%)"],
      opacity: [1, 0],
    },
  },
  "bottom-center": {
    in: {
      visibility: "visible",
      transform: ["translateY(100%)", "translateY(-10%)", "translateY(0)"],
      opacity: [0, 1],
    },
    out: {
      visibility: "visible",
      transform: ["translateY(0)", "translateY(-10%)", "translateY(100%)"],
      opacity: [1, 0],
    },
  },
  "bottom-right": {
    in: {
      visibility: "visible",
      transform: ["translateX(100%)", "translateX(-10%)", "translateX(0)"],
    },
    out: {
      visibility: "visible",
      transform: ["translateX(0)", "translateX(-10%)", "translateX(100%)"],
      opacity: [1, 0],
    },
  },

};

export { keyframes, animateTo };
