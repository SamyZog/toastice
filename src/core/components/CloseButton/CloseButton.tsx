import * as React from "react";
import { CloseButtonProps } from "./CloseButton.types";

const CloseButton = ({ onClick }: CloseButtonProps) => (
  <button className="Toastice__toast__close-button" onClick={onClick}>
    <svg className="Toastice__toast__icon Toastice__toast__icon--close" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95L7.05 5.636z" />
    </svg>
  </button>
);

export default CloseButton;
