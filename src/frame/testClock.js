import { forEach } from 'lodash/fp'

const TestClock = () => {

  let subscribers = []
  let timestamp = 0
  let time = 0

  const tick = currentTimestamp => {
    timestamp = currentTimestamp
    forEach(subscriber => subscriber(timestamp), subscribers)
    subscribers = []
  }

  const requestAnimationFrame = f => {
    subscribers.push(f)
  }

  const performanceNow = () => timestamp

  const setNow = currentTime => time = currentTime
  const now = () => time

  return {
    setNow,
    tick,
    requestAnimationFrame,
    performance: {
      now: performanceNow
    },
    now
  }
}

export default TestClock