import React from 'react'
import {
  Container,
  Navbar,
  NavbarBrand,
  NavItem
} from 'reactstrap'
import { connect } from 'react-redux'

const Home = props => (
  <Container fluid>
    <Navbar className="justify-content-between">
      <NavbarBrand>TrackSuite</NavbarBrand>
      <NavItem>
        Hello, anonymous
      </NavItem>
    </Navbar>
    <div>
      {props.token ? <span>It seems you're logged in</span> : <span>You're not logged in, boo.</span>}
    </div>
  </Container>
)

/**
 * @todo Temporarily checking if user is logged in in this component.
 * Should probably move it to a different component in the future.
 */
const mapStateToProps = state => {
  return {
    token: state.token.token // <- This seems to be necessary for some reason :(
  }
}

export default connect(mapStateToProps)(Home)
