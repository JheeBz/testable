import React from 'react'
import { 
  Switch, 
  Route, 
  Redirect 
} from 'react-router-dom'
import {
  Col,
  Container,
  Row,
  Jumbotron
} from 'reactstrap'

import Login from './Login'
import Register from './Register'

const Authentication = () => (
  <Jumbotron fluid className="h-100 mb-0 align-items-center d-flex">
    <Container>
      <Row>
        <Col md={8} lg={6} className="mx-auto">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Redirect to="/login" />
          </Switch>
        </Col>
      </Row>
    </Container>
  </Jumbotron>
)

export default Authentication
