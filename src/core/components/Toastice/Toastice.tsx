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
    fullWidth,
  } = props;

  const [collapsed, setCollapsed] = React.useState(true);

  const [customToasticeProgress, setCustomToasticeProgress] = React.useState(0);

  const toasticeRef = React.useRef<HTMLDivElement>(null);
  const progressBarRef = React.useRef<HTMLDivElement>(null);
  const progressControls = React.useRef<PlaybackControls>();
  const progressRate = React.useRef<number>(0);
  const startAnimation = React.useRef<Animation>();
  const endAnimation = React.useRef<Animation>();

  const isCustomContent = typeof content === "function";

  const playEndAnimation = React.useCallback(() => {
    if (endAnimation.current?.playState === "running") return;

    if (toasticeRef.current && position && animation) {
      endAnimation.current = animateTo(
        toasticeRef.current,
        keyframes[animation === "slide" ? position : animation].out,
        "out",
        () => setCollapsed(true),
      );
    }
  }, [animation, position]);

  const pauseProgressAnimation = React.useCallback(() => {
    if (progressControls.current) {
      progressControls.current.stop();
    }
  }, []);

  const startProgress = React.useCallback(() => {
    if (typeof autoClose !== "number") return;

    progressControls.current?.stop();

    progressControls.current = animate({
      from: progressRate.current,
      to: 0,
      duration: progressRate.current ? autoClose * progressRate.current : autoClose,
      elapsed: -300,
      ease: linear,
      onUpdate: (value) => {
        const roundedValue = Math.round(value * 100);

        if (isCustomContent) setCustomToasticeProgress(roundedValue);

        onProgress?.(roundedValue);

        progressRate.current = value;

        if (progressBarRef.current) {
          progressBarRef.current.style.transform = `scaleX(${value})`;
        }
      },
      onComplete: () => { playEndAnimation(); },
    });
  }, [autoClose, isCustomContent, onProgress, playEndAnimation]);

  const resumeProgressAnimation = React.useCallback(() => {
    startProgress();
  }, [startProgress]);

  React.useEffect(() => {
    if (autoClose) {
      progressRate.current = 1;

      startProgress();
    }

    return () => {
      pauseProgressAnimation();
    };
  }, [autoClose, pauseProgressAnimation, props, startProgress]);

  const beginAnimationSequence = React.useCallback(() => {
    if (toasticeRef.current && position && animation) {
      startAnimation.current = animateTo(
        toasticeRef.current,
        keyframes[animation === "slide" ? position : animation].in,
        "in",
        startProgress,
      );
    }
  }, [animation, position, startProgress]);

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
      unsubscribeAnimateOut();
      progressControls.current?.stop();
      startAnimation.current?.cancel();
      endAnimation.current?.cancel();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toasticeClass = clsx(
    "Toastice__toast",
    closeOnClick && "Toastice__toast--close-on-click",
    elevated && "Toastice__toast--elevated",
    [`Toastice__toast--${theme}`],
    [`Toastice__toast--${theme}-${type}`],
    fullWidth && "Toastice__toast--fullWidth",
  );

  const progressBarClass = clsx(
    "Toastice__toast__progress-bar",
    [`Toastice__toast__progress-bar--${theme}`],
  );

  const renderedContent = React.useMemo(() => {
    if (isCustomContent) {
      return content({
        ...props,
        progress: customToasticeProgress,
        Icon: showIcon ? Icon : undefined,
        close: () => {
          progressControls.current?.stop();
          playEndAnimation();
        },
      });
    }

    return null;
  }, [content, customToasticeProgress, isCustomContent, playEndAnimation, props, showIcon]);

  return (
    <Collapse
      collapsed={collapsed}
      onCollapseEnd={closeToastice}
    >
      {isCustomContent ? (
        <div
          onMouseEnter={pauseOnHover && autoClose ? pauseProgressAnimation : undefined}
          onMouseLeave={pauseOnHover && autoClose ? resumeProgressAnimation : undefined}
          ref={toasticeRef}
          className="invisible"
        >
          {renderedContent}
        </div>
      ) : (
        <div
          {...(closeOnClick ? { onClick: playEndAnimation } : {})}
          onMouseEnter={pauseOnHover && autoClose ? pauseProgressAnimation : undefined}
          onMouseLeave={pauseOnHover && autoClose ? resumeProgressAnimation : undefined}
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
      )}

    </Collapse>
  );
};

export default React.memo(Toastice);
