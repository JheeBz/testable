import {
  Alert,
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Row,
  Col,
  Form,
  FormGroup,
  FormFeedback,
  Input
} from 'reactstrap'
import React from 'react'
import { NavLink } from 'react-router-dom'

// const hasError = ({ touched, status, errors }) => {
//   if (touched) {
//   }
// }

const Login = props => {
  const {
    values,
    errors,
    status,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting
  } = props
  return (
    <Card className="Login">
      <CardBody>
        <CardTitle className="text-center">Login</CardTitle>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col xs={10} className="mx-auto">
              {status && status.error ? (
                <Alert color="danger">{status.error}</Alert>
              ) : (
                status && status.message && <Alert>{status.message}</Alert>
              )}
              <FormGroup>
                <Input
                  autoFocus
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="email"
                  className={touched.email && ((status && status.email) || errors.email) ? 'is-invalid' : null}
                  placeholder="Email"
                />
                {status && status.email ? (
                  <FormFeedback>{status.email}</FormFeedback>
                ) : (
                  errors.email && touched.email && <FormFeedback>{errors.email}</FormFeedback>
                )}
              </FormGroup>
              <FormGroup>
                <Input
                  type="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  id="password"
                  className={touched.password && ((status && status.password) || errors.password) ? 'is-invalid' : null}
                  placeholder="Password"
                />
                {status && status.password ? (
                  <FormFeedback>{status.password}</FormFeedback>
                ) : (
                  errors.password && touched.password && <FormFeedback>{errors.password}</FormFeedback>
                )}
              </FormGroup>
              <Button
                color="success"
                className="d-block mx-auto"
                type="submit"
                disabled={isSubmitting}>
                  Sign In
              </Button>
            </Col>
          </Row>
        </Form>
        <CardText className="text-right">Don't have an account? You'll need to <NavLink to="/register">register</NavLink>.</CardText>
      </CardBody>
    </Card>
  )
}

export default Login
