export const scroll_parent_to_child = (
  parent: Element,
  child: Element
): void => {
  // Where is the parent on page
  const parent_rect = parent.getBoundingClientRect()
  // What can you see?
  const parent_viewable_area = {
    height: parent.clientHeight,
    width: parent.clientWidth,
  }

  // Where is the child
  const child_rect = child.getBoundingClientRect()
  // Is the child viewable?
  const is_viewable =
    child_rect.top >= parent_rect.top &&
    child_rect.top <= parent_rect.top + parent_viewable_area.height

  // if you can't see the child try to scroll parent
  if (!is_viewable) {
    // scroll by offset relative to parent
    parent.scrollTop = child_rect.top + parent.scrollTop - parent_rect.top
  }
}
