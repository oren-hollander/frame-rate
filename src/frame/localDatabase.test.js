import LocalDatabase from './localDatabase'
import {animationFrameEvent} from './events'

const appId = 'my-app'
const sessionId = 'my-session'

describe('Local Database', () => {
  let localDatabase = undefined

  beforeEach(() => {
    localDatabase = LocalDatabase()
  })
  
  test('start', () => {
    localDatabase.startSession(appId, sessionId, 0)
    expect(localDatabase.getSession(appId, sessionId)).toEqual({
        appId: appId,
        sessionId: sessionId,
        startTime: 0,
        events: [],
        done: false
      })
  })
  
  test('end', () => {
    localDatabase.startSession(appId, sessionId, 0)
    localDatabase.endSession(appId, sessionId)
    expect(localDatabase.getSession(appId, sessionId)).toEqual({
        appId: appId,
        sessionId: sessionId,
        startTime: 0,
        events: [],
        done: true
      })
  })
  
  test('add events', () => {
    localDatabase.startSession(appId, sessionId, 0)
    localDatabase.addEvent(appId, sessionId, animationFrameEvent(0))
    localDatabase.addEvent(appId, sessionId, animationFrameEvent(1))
  
    localDatabase.endSession(appId, sessionId)
    expect( localDatabase.getSession(appId, sessionId)).toEqual({
        appId: appId,
        sessionId: sessionId,
        startTime: 0,
        events: [animationFrameEvent(0), animationFrameEvent(1)],
        done: true
      })
  })
})