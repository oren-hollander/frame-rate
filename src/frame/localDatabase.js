import { get, set, concat, filter, keys, map, assign, pick, find } from 'lodash/fp'
import { NewSession, Session} from './session'

const LocalDatabase = () => {
  const db = []

  const startSession = (appId, sessionId, startTime) => {
    db.push(NewSession(appId, sessionId, startTime))
  }

  const endSession = (appId, sessionId) => {
    const session = find({appId, sessionId} , db)
    session.done = true
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