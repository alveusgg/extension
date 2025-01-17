/**
 * Finds overlay element that is visible under the cursor
 * Uses the center of the target element if triggered by keyboard
 *
 * @param e Mouse event containing cursor position
 * @returns Element if one is visible under the cursor, null otherwise
 */
export function visibleUnderCursor(e: MouseEvent) {
  let { clientX: x, clientY: y } = e;

  // If the click event was triggered by a keyboard (e.g. 'Enter')
  // Then use the center of the target element as the position of the click
  if (e.detail === 0 && e.target instanceof HTMLElement) {
    const box = e.target.getBoundingClientRect();
    x = box.left + box.width / 2;
    y = box.top + box.height / 2;
  }

  // Get all the elements under the click
  const elements = document.elementsFromPoint(x, y);

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
