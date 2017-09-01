import { get, set, concat, filter, keys, map, assign, pick, find } from 'lodash/fp'

const LocalDatabase = () => {
  const db = []

  const startSession = (appId, sessionId, startTime) => {
    const record = {appId, sessionId, startTime, events: [], done: false}
    db.push(record)
  }

  const endSession = (appId, sessionId) => {
    const record = find({appId, sessionId} , db)
    record.done = true
  }

  const addEvent = (appId, sessionId, event) => {
    find({appId, sessionId}, db).events.push(event)
  }

  const getSession = (appId, sessionId) => find({appId, sessionId}, db)

  const queryInteractions = (appId, name) => {
  }

  return {
    startSession,
    endSession,
    addEvent,
    endSession,
    getSession,
    queryInteractions
  }
}

export default LocalDatabase