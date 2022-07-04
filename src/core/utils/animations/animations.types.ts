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
  options?: "in" | "out",
  onFinish?: (ev: AnimationPlaybackEvent) => void
) => Animation;
