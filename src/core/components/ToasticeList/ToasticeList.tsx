import * as React from "react";
import clsx from "clsx";
import { memo, useMemo } from "react";
import type { ToasticeListProps } from "./ToasticeList.types";
import Toastice from "../Toastice/Toastice";

const ToasticeList = ({
  position = "bottom-right",
  margin = "normal",
  toastices = [],
  compact,
}: ToasticeListProps) => {
  const toasticeList = useMemo(() => toastices
    .filter((toastice) => toastice.position === position), [position, toastices]);

  const className = clsx(
    "Toastice__list",
    [`Toastice__list--${position}`],
    [`Toastice__list--${position}-${margin}`],
    compact && `Toastice__list--${position}-compact`,
  );

  if (toasticeList.length === 0) return null;

  return (
    <div className={className}>
      {toasticeList.map((toastice) => (
        <Toastice key={toastice.id} {...toastice} />
      ))}
    </div>
  );
};

export default memo(ToasticeList);
