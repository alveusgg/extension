/**
 * Finds overlay element that is visible under the cursor
 *
 * @param {MouseEvent} e Mouse event containing cursor position
 * @returns {Element|null} Element if one is visible under the cursor, null otherwise
 */
export function visibleUnderCursor(e: MouseEvent): Element | null {
  // Get all the elements under the mouse
  const elements = document.elementsFromPoint(e.clientX, e.clientY);

  // For each element, if it has a background then assume it is part of the overlay and return it
  for (const element of elements) {
    if (element === document.body) break;

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
