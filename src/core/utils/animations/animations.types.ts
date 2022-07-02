import type { ToasticeProps } from "../../components/Toastice/Toastice.types";

export type ToasticeAnimationOptions = {
  in: KeyframeAnimationOptions;
  out: KeyframeAnimationOptions;
}

type AnimationTypes = Exclude<ToasticeProps["position"] | ToasticeProps["animation"], undefined | "slide">

export type ToasticeAnimationKeyframes = Record<AnimationTypes, {
  in: PropertyIndexedKeyframes;
  out: PropertyIndexedKeyframes;
}>

export type AnimateTo = (
  node: HTMLElement,
  keframes: PropertyIndexedKeyframes | Keyframe[] | null,
  options?: number | KeyframeAnimationOptions,
  onFinish?: (ev: AnimationPlaybackEvent) => void
) => Animation;
