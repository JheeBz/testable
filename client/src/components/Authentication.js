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

import LoginContainer from '../containers/LoginContainer'
import RegisterContainer from '../containers/RegisterContainer'

const Authentication = () => (
  <Jumbotron fluid className="h-100 mb-0 align-items-center d-flex ts-jumbotron">
    <Container>
      <Row>
        <Col md={8} lg={6} className="mx-auto">
          <h1 className="text-white text-center">Traqsuite</h1>
          <Switch>
            <Route path="/login" component={LoginContainer} />
            <Route path="/register" component={RegisterContainer} />
            <Redirect to="/login" />
          </Switch>
        </Col>
      </Row>
    </Container>
  </Jumbotron>
)

export default Authentication
