import React, { Component } from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'
import styled, { injectGlobal } from 'styled-components'
// import AuthorisedRoute from './AuthorisedRoute'
import Authentication from './Authentication'
import Home from './Home'

injectGlobal`
  html, body, #root {
    height: 100%;
  }
`

const AppStyle = styled.div`
  height: 100%;
`

class App extends Component {
  render () {
    return (
      <AppStyle>
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route path="/" component={Authentication} />
          {/* <AuthorisedRoute path="/app" component={Home} /> */}
        </Switch>
      </AppStyle>
    )
  }
}

export default App
