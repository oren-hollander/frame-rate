import { combineReducers } from 'redux'
import { omit, set, update, concat, add, identity, defaultTo, flow, curry } from 'lodash/fp'
import { ANIMATION_FRAME, START_INTERACTION, END_INTERACTION, SET_PARAMETER, DELETE_PARAMETER } from './actionTypes'

const defaultState = {
  interaction: {
    interactionIds: [], 
    parameters: {}, 
    startTimestamp: 0,
    endTimestamp: undefined, 
    frames: 0
  },
  interactions: []
}

const switchReducers = reducers => (state, action) => {
  const reducer = reducers[action.type]
  if(reducer) 
    return reducer(state, action)

  return state
}

const increase = add(1)

const concatIn = curry((path, values, object) => set(path, concat(get(path, object), values), object))
const withoutIn = curry((path, values, object) => set(path, without(values, get(path, object)), object))

const addInteraction = state => {...state, interactions: [...state.interactions, state.interaction]}
const setParameter = (parameter, value) => set(`interaction.parameters.${parameter}`, value)
const deleteParameter = parameter => omit([parameter])
const startInteraction = concatIn('interaction.interactionIds')
const endIteraction = withoutIn('interaction.interactionIds')
const animationFrame = update('interaction.frames', increase)

const setParameterReducer = flow(
  addInteraction,
  setParameter(action.parameter, action.value)
)

const deleteParameterReducer = flow(
  addInteraction,
  deleteParameter(action.parameter)
)

const startInteractionReducer = flow(
  addInteraction,
  startInteraction(action.interactionId)
)

const endIteractionReducer = flow(
  addInteraction,
  endIteraction(action.interactionId)
)

const actionReducers = {
  SET_PARAMETER: setParameterReducer,
  DELETE_PARAMETER: deleteParameterReducer,
  START_INTERACTION: startInteractionReducer,
  END_INTERACTION: endIteractionReducer,
  ANIMATION_FRAME: animationFrame
}

const getReducerByActionType = type => defaultTo(identity, actionReducers[type])
  
const reducer = (state = defaultState, action) => getReducerByActionType(action.type)(state)

export default reducer