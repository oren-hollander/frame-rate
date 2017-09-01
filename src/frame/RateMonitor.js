import React from 'react'
import { filter, flow, last } from 'lodash/fp'

import { isAnimationFrameEvent, isAfter } from './session'

const getLastSecond = ({measurements}) => {
  const lastSecond = flow(
    filter(isAnimationFrameEvent),
    filter(isAfter(last(measurements).timestamp - 1000))
  )(measurements)
  return lastSecond.length
}

export const RateMonitor = () => 
  <div> { getLastSecond() } </div>