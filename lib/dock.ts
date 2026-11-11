/** Shared measurements for the bottom dock, so Mini Violet's bubble and chat line up with her slot. */
export const DOCK = {
  slot: 48,
  pad: 8,
  divider: 17,
  height: 56,
  bottom: 24,
  navItems: 3,
}

/** Total dock width: nav slots, a divider, then Mini Violet's slot. */
export const dockWidth = () => DOCK.pad * 2 + DOCK.slot * (DOCK.navItems + 1) + DOCK.divider

/** Horizontal center of Mini Violet's slot, measured from the dock's center. */
export const miniOffsetFromCenter = () => dockWidth() / 2 - DOCK.pad - DOCK.slot / 2

export const MINI_OPEN_EVENT = "violet-gpt:open"
export const MINI_UNREAD_EVENT = "violet-gpt:unread"
