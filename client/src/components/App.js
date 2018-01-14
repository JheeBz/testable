import React, { Component } from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'
// import AuthorisedRoute from './AuthorisedRoute'
import Authentication from './Authentication'
import Home from './Home'

class App extends Component {
  render () {
    return (
      <div className="App h-100">
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route path="/" component={Authentication} />
          {/* <AuthorisedRoute path="/app" component={Home} /> */}
        </Switch>
      </div>
    )
  }
}

export default App
