import SessionCollector from './sessionCollector'
import LocalDatabase from './localDatabase'
import TestClock from './testClock'
import { Session, NewSession } from './Session'

describe.skip('Session', () => {
  
  const appId = 'app'
  const sessionId = 'session'

  let clock = TestClock()
  let sessionCollector = undefined
  let db = undefined 

  beforeEach(() => {
    db = LocalDatabase()
    sessionCollector = SessionCollector(db, clock, appId, sessionId)
  })

  test('Start session', () => {
    sessionCollector.start()

    const session = db.getSession(appId, sessionId)
    expect(session).toEqual(NewSession(appId, sessionId, 0))
  })

  test('End session', () => {
    sessionCollector.start()
    sessionCollector.stop()
    const session = db.getSession(appId, sessionId)
    expect(session).toEqual(Session(appId, sessionId, 0, [], true))
  })

  test('Start interaction', () => {
    sessionCollector.start()
    clock.tick(10)
    clock.tick(11)
    clock.tick(12)
    sessionCollector.startInteraction('drag')
    sessionCollector.stop()

    const session = db.getSession(appId, sessionId)
    expect(session).toEqual(Session(appId, sessionId, 0, [], true))
  })
})