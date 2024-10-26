/**
 * Finds overlay element that is visible under the cursor
 *
 * @param e Mouse event containing cursor position
 * @returns Element if one is visible under the cursor, null otherwise
 */
export function visibleUnderCursor(e: MouseEvent) {
  // Get all the elements under the mouse
  const elements = document.elementsFromPoint(e.clientX, e.clientY);

  // For each element, if it has a background then assume it is part of the overlay and return it
  for (const element of elements) {
    if (element === document.body) break;

    // Sometimes we want a transparent element to be clickable still
    if (element instanceof HTMLElement && element.dataset.transparentClicks)
      return element;

    const style = getComputedStyle(element);
    if (
      style.backgroundImage !== "none" ||
      style.backgroundColor !== "rgba(0, 0, 0, 0)"
    ) {
      return element;
    }
  }

  return null;
}

/**
 * Creates a copy of a DOMRect with the properties being mutable
 *
 * @param rect DOMRect to make mutable
 * @returns Mutable DOMRect
 */
export function mutableDOMRect(rect: DOMRect) {
  const mutable = DOMRect.fromRect(rect);
  const props = {
    x: rect.x,
    y: rect.y,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  };
  Object.entries(props).forEach(([key, value]) => {
    Object.defineProperty(mutable, key, {
      writable: true,
      value,
    });
  });
  return mutable as typeof rect & typeof props;
}
