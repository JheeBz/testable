import React, { Component } from 'React'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class AuthorisedRoute extends Component {
  componentWillMount() {
    getAuthenticatedUser()
  }

  render() {
    const { component: Component, pending, loaded, logged, ...rest } = this.props

    return (
      <Route { ...rest } render={props => {
        if (pending) return <div>Loading...</div>
        return logged
          ? <Component { ...props } />
          : <Redirect to="login" />
      }} />
    )
  }

}

const mapStateToProps = ({ loggedUserState }) => ({
  pending: loggedUserState.pending,
  logged: loggedUserState.logged
})

export default connect(mapStateToProps)(AuthorisedRoute)
