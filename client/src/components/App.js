import React, { Component } from 'react'
import {
  Switch,
  Route
} from 'react-router-dom'
import styled, { injectGlobal } from 'styled-components'

import withLoading from './hoc/withLoading'

injectGlobal`
  html, body, #root {
    height: 100%;
  }
`

const AppStyle = styled.div`
  height: 100%;
  position: relative;
`

const LoadableHome = withLoading({
  loader: () => import('./Home')
})

const LoadableAuthentication = withLoading({
  loader: () => import('./Authentication')
})

class App extends Component {
  render () {
    return (
      <AppStyle>
        <Switch>
          <Route exact path="/home" component={LoadableHome} />
          <Route path="/" component={LoadableAuthentication} />
        </Switch>
      </AppStyle>
    )
  }
}

export default App
