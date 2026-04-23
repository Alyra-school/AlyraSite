import { useEffect } from "react";

export function useDragScroll(trackRef, optionsOrOnScroll) {
  useEffect(() => {
    const container = trackRef.current;
    if (!container) return undefined;

    const options =
      typeof optionsOrOnScroll === "function" || optionsOrOnScroll == null
        ? { onScroll: optionsOrOnScroll }
        : optionsOrOnScroll;

    const {
      onScroll,
      itemSelector = null,
      enableSwipeSnap = true,
      swipeThreshold = 22,
      mobileOnlySnap = true,
    } = options;

    let activePointerId = null;
    let dragIntent = "idle";
    let pointerStartX = 0;
    let pointerStartY = 0;
    let pointerLastX = 0;
    let scrollStartLeft = 0;
    let didDrag = false;
    const DRAG_THRESHOLD = 6;

    const updateScroll = () => {
      if (onScroll) onScroll(container);
    };

    const getItemOffsets = () => {
      if (!itemSelector) return [];
      const items = Array.from(container.querySelectorAll(itemSelector));
      if (!items.length) return [];
      const containerLeft = container.getBoundingClientRect().left;
      return items.map((item) => item.getBoundingClientRect().left - containerLeft + container.scrollLeft);
    };

    const getNearestIndex = (offsets, value) => {
      if (!offsets.length) return -1;
      let nearest = 0;
      let minDelta = Number.POSITIVE_INFINITY;
      for (let i = 0; i < offsets.length; i += 1) {
        const delta = Math.abs(offsets[i] - value);
        if (delta < minDelta) {
          minDelta = delta;
          nearest = i;
        }
      }
      return nearest;
    };

    const shouldSnap = () => {
      if (!enableSwipeSnap || !itemSelector) return false;
      if (!mobileOnlySnap) return true;
      return window.matchMedia("(max-width: 900px)").matches;
    };

    const snapToCard = () => {
      if (!shouldSnap()) return;
      const offsets = getItemOffsets();
      if (!offsets.length) return;

      const startIndex = getNearestIndex(offsets, scrollStartLeft);
      if (startIndex < 0) return;

      const endLeft = container.scrollLeft;
      const dragDelta = endLeft - scrollStartLeft;
      let targetIndex = getNearestIndex(offsets, endLeft);

      if (Math.abs(dragDelta) >= swipeThreshold) {
        targetIndex = startIndex + (dragDelta > 0 ? 1 : -1);
      }

      targetIndex = Math.max(0, Math.min(offsets.length - 1, targetIndex));
      container.scrollTo({ left: offsets[targetIndex], behavior: "smooth" });
    };

    const handlePointerDown = (event) => {
      if (event.pointerType !== "touch" && event.button !== 0) return;
      activePointerId = event.pointerId;
      dragIntent = "pending";
      didDrag = false;
      pointerStartX = event.clientX;
      pointerStartY = event.clientY;
      pointerLastX = event.clientX;
      scrollStartLeft = container.scrollLeft;
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
        snapToCard();
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
  }, [trackRef, optionsOrOnScroll]);
}
