import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  FormText,
  Input
} from 'reactstrap'
import React from 'react'
import Api from '../services/Api'

const Register = ({ history }) => (
  <Card className="Register">
    <CardBody>
      <CardTitle className="text-center">Register</CardTitle>
      <Form>
        <FormGroup>
          <Input
            type="email"
            name="email"
            id="LoginEmail"
            placeholder="Email"
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            name="password"
            id="LoginPassword"
            placeholder="Password"
          />
          <FormText muted>Must be at least 8 characters long, contain 1 number and 1 UPPERCASE letter.</FormText>
        </FormGroup>
      </Form>
      <Button color="success" className="d-block mx-auto">
        Log in
      </Button>
    </CardBody>
  </Card>
)

export default Register
