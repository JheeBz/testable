import React from 'react'
import {
  Container,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from 'reactstrap'
import { connect } from 'react-redux'
import propTypes from 'prop-types'
import Sidebar from './Sidebar'

const Home = props => (
  <Container fluid className="h-100">
    <Navbar className="justify-content-between">
      <NavbarBrand>TrackSuite</NavbarBrand>
      <Nav>
        <NavItem>
          <NavLink href="/home">Home</NavLink>
        </NavItem>
      </Nav>
    </Navbar>
    <Row className="h-100">
      <Col >
        <div>
          {props.token ? <span>It seems you're logged in</span> : <span>You're not logged in, boo.</span>}
        </div>
      </Col>
    </Row>
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

Home.propTypes = {
  token: propTypes.string
}

export default connect(mapStateToProps)(Home)
