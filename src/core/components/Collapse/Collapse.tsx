import clsx from "clsx";
import * as React from "react";
import { CollapseProps } from "./Collapse.types";

const Collapse = ({
  children,
  collapsed,
  duration = 200,
  onCollapseEnd,
}: CollapseProps) => {
  const [height, setHeight] = React.useState(0);

  const collapseRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (collapsed) setHeight(0);
  }, [collapsed]);

  React.useEffect(() => {
    if (!collapsed && collapseRef.current) {
      const { scrollHeight } = collapseRef.current;

      setHeight(scrollHeight);
    }
  }, [collapsed, children]);

  const className = clsx("");

  return (
    <div
      ref={collapseRef}
      className={className}
      style={{ height: `${height}px`, transitionDuration: `${duration}ms` }}
      onTransitionEnd={onCollapseEnd}
    >
      {children}
    </div>
  );
};

export default Collapse;
