const ANIMATION_FRAME = 'animation-frame'
const START_INTERACTION = 'start-interaction'
const END_INTERACTION = 'end-interaction'
const CONTEXT_PARAM = 'context-param'

export const isAnimationFrameEvent = event => event.type === ANIMATION_FRAME
export const isAfter = timestamp => event => event.timestamp > timestamp

export const animationFrameEvent = timestamp => ({type: ANIMATION_FRAME, timestamp})
export const startInteractionEvent = (interactionId, name, timestamp) => ({type: START_INTERACTION, name, timestamp})
export const endInteractionEvent = (interactionId, timestamp) => ({type: END_INTERACTION, name, timestamp})
export const setContextParamEvent = (param, value, timestamp) => ({type: CONTEXT_PARAM, param, value, timestamp})
