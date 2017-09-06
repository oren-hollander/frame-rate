export const isAnimationFrameEvent = event => event.type === ANIMATION_FRAME
export const isAfter = timestamp => event => event.timestamp > timestamp
