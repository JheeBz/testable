import React from 'react'
import {
  Nav,
  NavItem,
  NavLink,
  Navbar
} from 'reactstrap'
// import { connect } from 'react-redux'
// import propTypes from 'prop-types'

const styles = {
  backgroundColor: 'cyan'
}

const Sidebar = props => (
  <Navbar className="h-100 pl-0 pr-0">
    <Nav vertical style={styles} className="h-100">
      <NavItem>
        <NavLink href="#">
          Test
        </NavLink>
      </NavItem>
    </Nav>
  </Navbar>
)

export default Sidebar
