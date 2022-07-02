import * as React from "react";
import type { ErrorIconProps } from "./ErrorIcon.types";

const ErrorIcon = ({ theme }: ErrorIconProps) => {
  switch (theme) {
    case "filled":
      return (
        <svg className="Toastice__toast__icon Toastice__toast__icon--error" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M17.5 2.5L23 12l-5.5 9.5h-11L1 12l5.5-9.5h11zM11 15v2h2v-2h-2zm0-8v6h2V7h-2z" />
        </svg>
      );
    default:
      return (
        <svg className="Toastice__toast__icon Toastice__toast__icon--error" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M17.5 2.5L23 12l-5.5 9.5h-11L1 12l5.5-9.5h11zm-1.153 2H7.653L3.311 12l4.342 7.5h8.694l4.342-7.5-4.342-7.5zM11 15h2v2h-2v-2zm0-8h2v6h-2V7z" />
        </svg>
      );
  }
};

export default ErrorIcon;
