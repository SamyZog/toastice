import { PropsWithChildren, TransitionEventHandler } from "react";

export type CollapseProps = {
  collapsed: boolean;
  onCollapseEnd?: TransitionEventHandler<HTMLDivElement>;
  duration?: number;
} & PropsWithChildren
