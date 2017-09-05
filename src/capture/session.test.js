import { reduce, concat } from 'lodash/fp'
import { newSession, startInteraction, endInteraction, animationFrame, Interaction, eventsToInteractions } from './session'

const apply = (v, f) => f(v)

test('Session', () => {
  const interactionId = 'interaction-1'
  const appId = 'app-1'
  const sessionId = 'session-1'

  const events = reduce(apply, [], [
    startInteraction(interactionId, 'drag', 10),
    animationFrame(),
    animationFrame(),
    endInteraction(interactionId, 20)
  ])

  expect(eventsToInteractions(events)).toEqual([
    Interaction(interactionId, 'drag', {}, 10, 20, 2),
  ])
})