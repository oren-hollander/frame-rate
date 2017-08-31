import React from 'react'
import { render } from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const root = document.getElementById('root')

const renderApp = () => {
  render(<App />, root)
  requestAnimationFrame(renderApp)
}

requestAnimationFrame(renderApp)
registerServiceWorker()
