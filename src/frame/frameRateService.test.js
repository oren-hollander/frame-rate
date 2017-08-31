import FrameRateService from './frameRateService'
import {animationFrameEvent} from './events'

const appId = 'my-app'
const sessionId = 'my-session'

test('start', async () => {
  const frameRateService = FrameRateService()
  frameRateService.startSession(appId, sessionId, 0)
  expect(await frameRateService.getSession(appId, sessionId)).toEqual({
      appId: appId,
      sessionId: sessionId,
      startTime: 0,
      events: [],
      done: false
    })
})

test('end', async () => {
  const frameRateService = FrameRateService()
  frameRateService.startSession(appId, sessionId, 0)
  frameRateService.endSession(appId, sessionId)
  expect(await frameRateService.getSession(appId, sessionId)).toEqual({
      appId: appId,
      sessionId: sessionId,
      startTime: 0,
      events: [],
      done: true
    })
})

test('add events', async () => {
  const frameRateService = FrameRateService()
  frameRateService.startSession(appId, sessionId, 0)
  frameRateService.addEvents(appId, sessionId, [animationFrameEvent(0), animationFrameEvent(1)])
  frameRateService.endSession(appId, sessionId)
  expect(await frameRateService.getSession(appId, sessionId)).toEqual({
      appId: appId,
      sessionId: sessionId,
      startTime: 0,
      events: [animationFrameEvent(0), animationFrameEvent(1)],
      done: true
    })
})