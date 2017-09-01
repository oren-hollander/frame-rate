import { isEmpty } from 'lodash/fp'
import LocalDatabase from './localDatabase'

const ANIMATION_FRAME = 'animation-frame'
const START_INTERACTION = 'start-interaction'
const END_INTERACTION = 'end-interaction'
const CONTEXT_PARAM = 'context-param'

export const isAnimationFrameEvent = event => event.type === ANIMATION_FRAME
export const isAfter = timestamp => event => event.timestamp > timestamp

const animationFrameEvent = timestamp => ({type: ANIMATION_FRAME, timestamp})
const startInteractionEvent = (interactionId, name, timestamp) => ({type: START_INTERACTION, name, timestamp})
const endInteractionEvent = (interactionId, timestamp) => ({type: END_INTERACTION, name, timestamp})
const setContextParamEvent = (param, value, timestamp) => ({type: CONTEXT_PARAM, param, value, timestamp})

const PENDING = 'pending'
const ACTIVE = 'active'
const STOPPED = 'stopped'

export const Session = (localDatabase, appId, sessionId) => {
  let startTime 
  let startTick
  let state = PENDING
  let nextInteractionId = 1

  const tick = timestamp => {
    localDatabase.addEvent(appId, sessionId, animationFrameEvent(timestamp - startTick))
    if(events.length > 10000)
      report()
    
    if(state === ACTIVE)
      requestAnimationFrame(tick)
  }

  const start = () => {
    if(state !== PENDING)
      throw new Error(`Session couldn't start since it's ${state}`)

    startTime = Date.now()
    startTick = performance.now()
    state = ACTIVE

    localDatabase.startSession(appId, sessionId, startTime)
    requestAnimationFrame(tick)      
  }

  const stop = () => {
    if(state !== ACTIVE)
      throw new Error(`Session couldn't stop since it's ${state}`)

    state = STOPPED

    localDatabase.endSession(appId, sessionId)
  }

  const startInteraction = name => {
    interactionId = nextInteractionId
    nextInteractionId++
    localDatabase.addEvent(startInteractionEvent(interactionId, name, performance.now() - startTick))
    return interactionId
  } 

  const endInteraction = interactionId => {
    localDatabase.addEvent(endInteractionEvent(interactionId, performance.now() - startTick))
  } 

  const setContextParam = (param, value) => {
    localDatabase.addEvent(setContextParamEvent(param, value, performance.now() - startTick))
  } 

  return { 
    start, 
    stop, 
    startInteraction, 
    endInteraction, 
    setContextParam 
  }
}