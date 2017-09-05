export const ANIMATION_FRAME = 'animation-frame'
export const START_INTERACTION = 'start-interaction'
export const END_INTERACTION = 'end-interaction'
export const SET_PARAMETER = 'set-parameter'
export const DELETE_PARAMETER = 'delete-parameter'

export const isAnimationFrameEvent = event => event.type === ANIMATION_FRAME
export const isAfter = timestamp => event => event.timestamp > timestamp

export const animationFrameEvent = () => ({type: ANIMATION_FRAME})
export const startInteractionEvent = (interactionId, name, timestamp) => ({type: START_INTERACTION, interactionId, name, timestamp})
export const endInteractionEvent = (interactionId, timestamp) => ({type: END_INTERACTION, interactionId, timestamp})
export const setParameterEvent = (parameter, value, timestamp) => ({type: SET_PARAMETER, parameter, value, timestamp})
export const deleteParameterEvent = (parameter, timestamp) => ({type: DELETE_PARAMETER, parameter, timestamp})
