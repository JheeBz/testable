import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Row,
  Col,
  Form,
  FormGroup,
  FormText,
  Input
} from 'reactstrap'
import React, { Component } from 'react'

export default class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

  handleSubmit = event => {
    event.preventDefault()
  }

  handleInputChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  validateForm() {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.confirmPassword.length > 0
    )
  }

  render() {
    return (
      <Card className="Register">
        <CardBody>
          <CardTitle className="text-center">Register</CardTitle>
          <Form onSubmit={this.handleSubmit}>
            <Row>
              <Col xs={10} className='mx-auto'>
                <FormGroup>
                  <Input
                    autoFocus
                    type="email"
                    name="email"
                    value={this.state.username}
                    onChange={this.handleInputChange}
                    id="email"
                    placeholder="Email"
                  />
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.handleInputChange}
                    id="password"
                    placeholder="Password"
                  />
                  <FormText muted>
                    Must be at least 8 characters long, contain 1 number and 1
                    UPPERCASE letter.
                  </FormText>
                </FormGroup>
                <FormGroup>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={this.state.confirmPassword}
                    onChange={this.handleInputChange}
                    id="confirmPassword"
                    placeholder="Confirm Password"
                  />
                </FormGroup>
              </Col>
            </Row>
          </Form>
          <Button
            color="success"
            className="d-block mx-auto"
            type="submit"
            disabled={!this.validateForm()}
          >
            Register
          </Button>
        </CardBody>
      </Card>
    )
  }
}
