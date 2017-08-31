import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { RateMonitor } from './frame/RateMonitor'

class App extends Component {
  constructor() {
    super()
    this.state = {
      active: false
    }

    this.toggleActive = this.toggleActive.bind(this)
  }

  toggleActive() {
    this.setState({active: !this.state.active})
  }

  render() {
    if(this.state.active){
      const stop = performance.now() + 50
      while(performance.now() < stop){
      }
    }
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.toggleActive}>{this.state.active ? 'Stop' : 'Start'}</button>
        {/* <RateMonitor/> */}
      </div>
    )
  }
}

export default App
