import React from 'react'
import { Switch, Route } from 'react-router-dom'

import App from 'App'

const Routes = () => (
  <Switch>
    {/* <Route path='/' component={Dashboard} /> */}
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Register} />
  </Switch>
)

export default Routes
