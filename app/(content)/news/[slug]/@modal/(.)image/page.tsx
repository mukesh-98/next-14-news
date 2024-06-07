"use client";
import React from "react";
import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

function Modal() {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <div className="modal-backdrop">
      <dialog
        ref={dialogRef}
        className="modal"
        onClose={onDismiss}
      >
        <img
          src={`https://fastly.picsum.photos/id/134/200/300.jpg?hmac=KN18cCDft4FPM0XJpr7EhZLtUP6Z4cZqtF8KThtTvsI`}
          alt={"test"}
        />
        <button
          onClick={onDismiss}
          className="close-button"
        />
      </dialog>
    </div>,
    document.getElementById("modal-root")!
  );
}

export default Modal;
