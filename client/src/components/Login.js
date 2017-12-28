import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input
} from 'reactstrap'
import React from 'react'

const Login = ({ history }) => (
  <Card className="Login">
    <CardBody>
      <CardTitle className="text-center">Log In</CardTitle>
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
        </FormGroup>
      </Form>
      <Button color="success" className="d-block mx-auto">
        Log in
      </Button>
    </CardBody>
  </Card>
)

export default Login
