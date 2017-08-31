import { get, set, concat, filter, keys, map, assign, pick, find } from 'lodash/fp'

const FrameRateService = () => {
  const db = []

  const startSession = (appId, sessionId, startTime) => {
    const record = {appId, sessionId, startTime, events: [], done: false}
    db.push(record)
  }

  const endSession = (appId, sessionId) => {
    const record = find({appId, sessionId} , db)
    record.done = true
  }

  const addEvents = (appId, sessionId, events) => {
    find({appId, sessionId}, db).events.push(...events)
  }

  const getSession = async (appId, sessionId) => find({appId, sessionId}, db)

  const queryInteractions = async (appId, name) => {
  }

  return {
    startSession,
    endSession,
    addEvents,
    endSession,
    getSession,
    queryInteractions
  }
}

export default FrameRateService