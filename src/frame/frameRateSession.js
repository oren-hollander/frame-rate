import { isEmpty } from 'lodash/fp'
import FrameRateService from './frameRateService'

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

export const Session = (appId, sessionId) => {
  let startTime 
  let startTick
  let events = []
  let state = PENDING
  let nextInteractionId = 1

  const frameRateService = FrameRateService()

  const tick = timestamp => {
    events.push(animationFrameEvent(timestamp - startTick))
    
    if(events.length > 10000)
      report()
    
    if(state === ACTIVE)
      requestAnimationFrame(tick)
  }

  const report = () => {
    frameRateService.addEvents(appId, sessionId, events)
    events = []  
  } 

  const start = () => {
    if(state !== PENDING)
      throw new Error(`Session couldn't start since it's ${state}`)

    startTime = Date.now()
    startTick = performance.now()
    state = ACTIVE

    frameRateService.startSession(appId, sessionId, startTime).then(() => {
      requestAnimationFrame(tick)      
    })
  }

  const stop = () => {
    if(state !== ACTIVE)
      throw new Error(`Session couldn't stop since it's ${state}`)

    state = STOPPED

    if(!isEmpty(events)) 
      report()
    frameRateService.endSession(appId, sessionId)
  }

  const startInteraction = name => {
    interactionId = nextInteractionId
    nextInteractionId++
    events.push(startInteractionEvent(interactionId, name, performance.now() - startTick))
    return interactionId
  } 

  const endInteraction = interactionId => {
    events.push(endInteractionEvent(interactionId, performance.now() - startTick))
  } 

  const setContextParam = (param, value) => events.push(setContextParamEvent(param, value, performance.now() - startTick))

  return { start, stop, startInteraction, endInteraction, setContextParam }
}