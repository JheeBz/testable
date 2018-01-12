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
import { withFormik } from 'formik'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { SET_TOKEN } from '../actions'
import Yup from 'yup'
import AuthenticationService from '../services/AuthenticationService'

const LoginForm = (props) => {
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
                {/* @todo refactor className conditional logic. Potentially a function. */}
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
        <CardText className="text-center">Don't have an account? You'll need to <NavLink to="/register">register</NavLink>.</CardText>
      </CardBody>
    </Card>
  )
}

const Login = compose(
  connect(),
  withFormik({
    mapPropsToValues ({ email, password }) {
      return {
        email: '',
        password: ''
      }
    },
    /**
     * @todo Grab access token from response once implemented.
     * @todo Make password requirements identical to API requirements.
     */
    handleSubmit (values, { props, setSubmitting, setStatus, setErrors }) {
      login({
        email: values.email,
        password: values.password
      }, { props, setStatus, setErrors, setSubmitting })
    },
    validationSchema: Yup.object().shape({
      email: Yup
        .string()
        .email('Email address is not valid.')
        .required('Email address is required.'),
      password: Yup
        .string()
        .required('Password is required.')
    })
  })
)(LoginForm)

const login = async (credentials, { props, setStatus, setErrors, setSubmitting }) => {
  try {
    setSubmitting(true)
    const res = await AuthenticationService.login({
      email: credentials.email,
      password: credentials.password
    })
    if (res.status === 201) {
      props.dispatch({
        type: SET_TOKEN,
        token: res.data.token
      })
      setStatus({
        message: 'Successfully logged in! Redirecting...'
      })
    }
  } catch (error) {
    const errKeys = Object.keys(error.response.data.error)

    switch (errKeys[0]) {
      case 'email':
        setErrors({
          email: error.response.data.error[errKeys[0]]
        })
        break
      case 'password':
        setErrors({
          password: error.response.data.error[errKeys[0]]
        })
        break
      default:
        setStatus({
          error: error.response.data.error
        })
    }
  } finally {
    setSubmitting(false)
  }
}

export default Login
