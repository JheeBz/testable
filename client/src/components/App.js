import React, { Component } from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'

// import './App.css'

import Authentication from './Authentication'

class App extends Component {
  render () {
    return (
      <div className="App h-100">
        <Switch>
          <Route path="/" component={Authentication} />
          {/* <Redirect to='/' /> */}
        </Switch>
      </div>
    )
  }
}

export default App
