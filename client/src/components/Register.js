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
  FormText,
  Input
} from 'reactstrap'
import React from 'react'
import { NavLink } from 'react-router-dom'

const Register = (props) => {
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
    <Card className="Register">
      <CardBody>
        <CardTitle className="text-center">Register</CardTitle>
        <Form
          onSubmit={handleSubmit}
          autoComplete="off">
          <Row>
            <Col xs={10} className="mx-auto">
              {status && status.error ? (
                <Alert color="danger">{status.error}</Alert>
              ) : (
                status && status.message && <Alert>{status.message}</Alert>
              )}
              <FormGroup>
                {/* @todo refactor className conditional logic. Potentially a function which returns a boolean. */}
                <Input
                  autoFocus
                  type="email"
                  name="email"
                  value={values.username}
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
                  autoComplete="new-password"
                />
                {status && status.password ? (
                  <FormFeedback>{status.password}</FormFeedback>
                ) : (
                  errors.password && touched.password && <FormFeedback>{errors.password}</FormFeedback>
                )}
                <FormText muted>
                  Must be at least 8 characters long, contain 1 number and 1
                  UPPERCASE letter.
                </FormText>
              </FormGroup>
              <Button
                color="success"
                className="d-block mx-auto"
                type="submit"
                disabled={isSubmitting}>
                Register
              </Button>
            </Col>
          </Row>
        </Form>
        <CardText className="text-right">Already registered? <NavLink to="/login">Log in</NavLink>.</CardText>
      </CardBody>
    </Card>
  )
}

export default Register
