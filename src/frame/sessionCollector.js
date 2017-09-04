import { isEmpty } from 'lodash/fp'
import LocalDatabase from './localDatabase'
import { animationFrameEvent, startInteractionEvent, endInteractionEvent, setContextParamEvent } from './events'

const PENDING = 'pending'
const ACTIVE = 'active'
const STOPPED = 'stopped'

const SessionCollector = (localDatabase, clock, appId, sessionId) => {
  let startTime 
  let startTick
  let state = PENDING
  let nextInteractionId = 1

  const tick = timestamp => {
    localDatabase.addEvent(appId, sessionId, animationFrameEvent(timestamp - startTick))
    
    if(state === ACTIVE)
      clock.requestAnimationFrame(tick)
  }

  const start = () => {
    if(state !== PENDING)
      throw new Error(`Session couldn't start since it's ${state}`)

    startTime = clock.now()
    startTick = clock.performance.now()
    state = ACTIVE

    localDatabase.startSession(appId, sessionId, startTime)
    clock.requestAnimationFrame(tick)      
  }

  const stop = () => {
    if(state !== ACTIVE)
      throw new Error(`Session couldn't stop since it's ${state}`)

    state = STOPPED

    localDatabase.endSession(appId, sessionId)
  }

  const startInteraction = name => {
    const interactionId = nextInteractionId
    nextInteractionId++
    localDatabase.addEvent(appId, sessionId, startInteractionEvent(interactionId, name, clock.performance.now() - startTick))
    return interactionId
  } 

  const endInteraction = interactionId => {
    localDatabase.addEvent(appId, sessionId, endInteractionEvent(interactionId, clock.performance.now() - startTick))
  } 

  const setContextParam = (param, value) => {
    localDatabase.addEvent(appId, sessionId, setContextParamEvent(param, value, clock.performance.now() - startTick))
  } 

  return { 
    start, 
    stop, 
    startInteraction, 
    endInteraction, 
    setContextParam 
  }
}

export default SessionCollector