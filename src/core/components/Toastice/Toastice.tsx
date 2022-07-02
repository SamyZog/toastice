import * as React from "react";
import clsx from "clsx";
import {
  animate,
  linear,
  PlaybackControls,
} from "popmotion";
import type { ToasticePropsWithContent } from "./Toastice.types";
import CloseButton from "../CloseButton";
import Icon from "../icons/Icon";
import Collapse from "../Collapse";
import { emit, subscribe } from "../../utils/eventManager";
import {
  animateTo,
  animationOptions,
  keyframes,
} from "../../utils/animations";

const Toastice = (props: ToasticePropsWithContent) => {
  const {
    id,
    role,
    position,
    pauseOnHover,
    content,
    animation,
    autoClose,
    closeOnClick,
    showCloseButton,
    showIcon,
    theme,
    type,
    elevated,
    onClose,
    onOpen,
    onProgress,
    compact,
  } = props;
  const [collapsed, setCollapsed] = React.useState(true);

  const toasticeRef = React.useRef<HTMLDivElement>(null);
  const progressBarRef = React.useRef<HTMLDivElement>(null);
  const progressControls = React.useRef<PlaybackControls>();
  const progressRate = React.useRef<number>(1);
  const startAnimation = React.useRef<Animation>();
  const endAnimation = React.useRef<Animation>();

  const playEndAnimation = React.useCallback(() => {
    progressControls.current?.stop();

    if (endAnimation.current?.playState === "running") return;

    if (toasticeRef.current && animation && position) {
      endAnimation.current = animateTo(
        toasticeRef.current,
        keyframes[animation === "slide" ? position : animation].out,
        animationOptions.out,
        () => setCollapsed(true),
      );
    }
  }, [animation, position]);

  const pauseProgressAnimation = React.useCallback(() => {
    if (!autoClose) return;

    if (progressControls.current) {
      progressControls.current.stop();
    }
  }, [autoClose]);

  const updateProgressAnimation = React.useCallback((value: number) => {
    progressRate.current = value;

    onProgress?.(Math.round(value * 100));

    if (progressBarRef.current) {
      progressBarRef.current.style.transform = `scaleX(${value})`;
    }
  }, [onProgress]);

  const startProgress = React.useCallback(() => {
    if (typeof autoClose !== "number") return;

    progressControls.current = animate({
      from: progressRate.current,
      to: 0,
      duration: progressRate.current ? progressRate.current * autoClose : autoClose,
      ease: linear,
      elapsed: -200,
      onComplete: playEndAnimation,
      onUpdate: updateProgressAnimation,
    });
  }, [autoClose, playEndAnimation, updateProgressAnimation]);

  const resumeProgressAnimation = React.useCallback(() => {
    startProgress();
  }, [startProgress]);

  const beginAnimationSequence = React.useCallback(() => {
    if (startAnimation.current?.playState === "running") return;

    if (toasticeRef.current && animation && position) {
      startAnimation.current = animateTo(
        toasticeRef.current,
        keyframes[animation === "slide" ? position : animation].in,
        animationOptions.in,
        () => { if (autoClose) startProgress(); },
      );
    }
  }, [animation, autoClose, position, startProgress]);

  const closeToastice = () => {
    if (collapsed) {
      onClose?.();
      emit("clear", id);
      emit("queue", position);
    }
  };

  React.useEffect(() => {
    onOpen?.(props);

    setCollapsed(false);
    beginAnimationSequence();

    const unsubscribeAnimateOut = subscribe("animateout", (toasticeId) => {
      if (toasticeId === id) {
        playEndAnimation();
      }
    });

    return () => {
      startAnimation.current?.cancel();
      endAnimation.current?.cancel();
      progressControls.current?.stop();
      unsubscribeAnimateOut();
    };
  }, []);

  React.useEffect(() => {
    if (progressControls.current) {
      progressControls.current.stop();
      progressRate.current = 1;

      startProgress();
    }
  }, [props, startProgress]);

  const toasticeClass = clsx(
    "Toastice__toast",
    closeOnClick && "Toastice__toast--close-on-click",
    elevated && "Toastice__toast--elevated",
    [`Toastice__toast--${theme}`],
    [`Toastice__toast--${theme}-${type}`],
    compact && "Toastice__toast--compact",
  );

  const progressBarClass = clsx(
    "Toastice__toast__progress-bar",
    [`Toastice__toast__progress-bar--${theme}`],
  );

  return (
    <Collapse
      collapsed={collapsed}
      onCollapseEnd={closeToastice}
    >
      <div
        {...(closeOnClick ? { onClick: playEndAnimation } : {})}
        onMouseEnter={pauseOnHover ? pauseProgressAnimation : undefined}
        onMouseLeave={pauseOnHover ? resumeProgressAnimation : undefined}
        ref={toasticeRef}
        className={toasticeClass}
      >
        <div className="Toastice__toast__content-box">
          {showIcon && <Icon theme={theme} type={type} />}
          <div role={role} className="Toastice__toast__content">{content}</div>
          {showCloseButton && <CloseButton onClick={playEndAnimation} />}
        </div>
        {autoClose && (
        <div ref={progressBarRef} className={progressBarClass} />
        )}
      </div>
    </Collapse>
  );
};

export default React.memo(Toastice);
