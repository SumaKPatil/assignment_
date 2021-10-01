import React from "react";
import "./modal.css";
export const Modal = ({ children }) => {
  return (
    <div className="modal-wrapper">
      <div class="modal-content">{children}</div>
    </div>
  );
};
