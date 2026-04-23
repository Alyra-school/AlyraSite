import { useEffect } from "react";

export function useDragScroll(trackRef, onScroll) {
  useEffect(() => {
    const container = trackRef.current;
    if (!container) return undefined;

    let activePointerId = null;
    let dragIntent = "idle";
    let pointerStartX = 0;
    let pointerStartY = 0;
    let pointerLastX = 0;
    let didDrag = false;
    const DRAG_THRESHOLD = 6;

    const updateScroll = () => {
      if (onScroll) onScroll(container);
    };

    const handlePointerDown = (event) => {
      if (event.pointerType !== "touch" && event.button !== 0) return;
      activePointerId = event.pointerId;
      dragIntent = "pending";
      didDrag = false;
      pointerStartX = event.clientX;
      pointerStartY = event.clientY;
      pointerLastX = event.clientX;
      if (container.setPointerCapture) {
        container.setPointerCapture(event.pointerId);
      }
    };

    const handlePointerMove = (event) => {
      if (activePointerId !== event.pointerId) return;

      const deltaX = event.clientX - pointerStartX;
      const deltaY = event.clientY - pointerStartY;

      if (dragIntent === "pending") {
        if (Math.abs(deltaX) < DRAG_THRESHOLD && Math.abs(deltaY) < DRAG_THRESHOLD) {
          return;
        }

        if (Math.abs(deltaX) >= Math.abs(deltaY)) {
          dragIntent = "horizontal";
          didDrag = true;
          container.classList.add("is-dragging");
        } else {
          dragIntent = "vertical";
          return;
        }
      }

      if (dragIntent !== "horizontal") return;

      const dx = event.clientX - pointerLastX;
      pointerLastX = event.clientX;
      if (Math.abs(dx) < 0.5) return;

      didDrag = true;
      if (event.cancelable) event.preventDefault();
      container.scrollLeft -= dx;
    };

    const releaseDrag = (event) => {
      if (activePointerId !== event.pointerId) return;
      if (dragIntent === "horizontal") {
        container.classList.remove("is-dragging");
        updateScroll();
      }
      activePointerId = null;
      dragIntent = "idle";
    };

    const handlePointerCancel = (event) => {
      if (activePointerId !== event.pointerId) return;
      container.classList.remove("is-dragging");
      activePointerId = null;
      dragIntent = "idle";
    };

    const handleLostPointerCapture = () => {
      container.classList.remove("is-dragging");
      activePointerId = null;
      dragIntent = "idle";
    };

    const handleClickCapture = (event) => {
      if (!didDrag) return;
      event.preventDefault();
      event.stopPropagation();
      didDrag = false;
    };

    container.addEventListener("pointerdown", handlePointerDown);
    container.addEventListener("pointermove", handlePointerMove, { passive: false });
    container.addEventListener("pointerup", releaseDrag);
    container.addEventListener("pointercancel", handlePointerCancel);
    container.addEventListener("lostpointercapture", handleLostPointerCapture);
    container.addEventListener("click", handleClickCapture, true);
    container.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();

    return () => {
      container.removeEventListener("pointerdown", handlePointerDown);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerup", releaseDrag);
      container.removeEventListener("pointercancel", handlePointerCancel);
      container.removeEventListener("lostpointercapture", handleLostPointerCapture);
      container.removeEventListener("click", handleClickCapture, true);
      container.removeEventListener("scroll", updateScroll);
    };
  }, [trackRef, onScroll]);
}
