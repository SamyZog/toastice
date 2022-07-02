import * as React from "react";
import ErrorIcon from "../ErrorIcon";
import InfoIcon from "../InfoIcon";
import SuccessIcon from "../SuccessIcon";
import WarningIcon from "../WarningIcon";
import type { IconProps } from "./Icon.types";

const Icon = ({ theme, type }: IconProps) => {
  switch (type) {
    case "error":
      return <ErrorIcon theme={theme} />;
    case "info":
      return <InfoIcon theme={theme} />;
    case "success":
      return <SuccessIcon theme={theme} />;
    case "warning":
      return <WarningIcon theme={theme} />;
    default:
      return null;
  }
};

export default Icon;
