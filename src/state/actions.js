import { ANIMATION_FRAME, START_INTERACTION, END_INTERACTION, SET_PARAMETER, DELETE_PARAMETER } from './actionTypes'

export const animationFrame = () => ({type: ANIMATION_FRAME})
export const startInteraction = (interactionId, name, timestamp) => ({type: START_INTERACTION, interactionId, name, timestamp})
export const endInteraction = (interactionId, timestamp) => ({type: END_INTERACTION, interactionId, timestamp})
export const setParameter = (parameter, value) => ({type: SET_PARAMETER, parameter, value})
export const deleteParameter = (parameter) => ({type: DELETE_PARAMETER, parameter})
