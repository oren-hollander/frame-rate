import { map, reduce, groupBy, forEach, assign, compose, set, get, find, omitBy, omit } from 'lodash/fp'
import { 
  animationFrameEvent, startInteractionEvent, endInteractionEvent, setParameterEvent, 
  ANIMATION_FRAME, START_INTERACTION, END_INTERACTION, SET_PARAMETER, DELETE_PARAMETER
} from './events'

export const Session = (appId, sessionId, time, timestamp) => ({
  appId, sessionId, time, timestamp
})

export const startInteraction = (interactionId, name, timestamp) => events => [...events, startInteractionEvent(interactionId, name, timestamp)]

export const endInteraction = (interactionId, timestamp) => events => [...events, endInteractionEvent(interactionId, timestamp)]

export const setParameter = (parameter, value, timestamp) => events => [...events, setParameterEvent(parameter, value, timestamp)]

export const deleteParameter = (parameter, timestamp) => events => [...events, deleteParameterEvent(parameter, timestamp)]

export const animationFrame = () => events => [...events, animationFrameEvent()]

export const Interaction = (interactionId, name, parameters, startTimestamp, endTimestamp, frames) => ({
  interactionId, name, parameters, startTimestamp, endTimestamp, frames
})

const increaseFrames = interaction => set('frames', get('frames', interaction) + 1, interaction)
const setEndTimestamp = set('endTimestamp')

export const eventsToInteractions = events => {
  let parameters = {}
  let interactions = []
  let closedInteractions = []

  forEach(event => {
    switch(event.type){
      case SET_PARAMETER:
        parameters = {...parameters, [event.parameter]: event.value}
        break
      case START_INTERACTION: 
        interactions = [...interactions, Interaction(event.interactionId, event.name, parameters, event.timestamp, undefined, 0)]
        break
      case ANIMATION_FRAME:
        interactions = map(increaseFrames, interactions)
        break
      case END_INTERACTION:
        closedInteractions = [
          ...closedInteractions, 
          setEndTimestamp(event.timestamp, find(interaction => interaction.interactionId === event.interactionId, interactions))
        ]
        interactions = omitBy(interaction => interaction.interactionId === event.interactionId, interactions)
        break
    }
  }, events)

  return closedInteractions
}

export const Segment = (interactionIds, parameters, startTimestamp, endTimestamp, frames) => ({
  interactionIds, parameters, startTimestamp, endTimestamp, frames
})

export const eventsToSegmets = events => {
  let parameters = {}
  let segment = Segment([], {}, 0, undefined, 0)
  let closedSegments = []

  forEach(event => {
    switch(event.type){
      case SET_PARAMETER:
        parameters = {...parameters, [event.parameter]: event.value}
        closedSegment = [...closedSegments, setEndTimestamp(event.timestamp, segment)]
        segment = Segment(segment.interactionIds, parameters, event.timestamp, undefined, 0)
        break
      case START_INTERACTION: 
        closedSegment = [...closedSegments, setEndTimestamp(event.timestamp, segment)]
        segment = Segment([...segment.interactionIds, event.interactionId], parameters, event.timestamp, undefined, 0)
        break
      case ANIMATION_FRAME:
        segment = increaseFrames(segment)
        break
      case END_INTERACTION:
        closedSegment = [...closedSegments, setEndTimestamp(event.timestamp, segment)]
        segment = Segment(omit(event.interactionId, segment.interactionIds), segment.parameters, event.timestamp, undefined, 0)
      break
    }
  }, events)

  return closedInteractions
}