import {
  Alert,
  Button,
  Card,
  CardBody,
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
import { withFormik } from 'formik'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { SET_TOKEN } from '../actions'
import Yup from 'yup'
import AuthenticationService from '../services/AuthenticationService'

/**
 * @todo investigate how to use this
 */
const mapDispatchToProps = dispatch => {
  return {
    setToken: token => dispatch({
      type: SET_TOKEN,
      token
    })
  }
}

// const mapStateToProps = state => {

// }

const RegisterForm = (props) => {
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
      </CardBody>
    </Card>
  )
}

const Register = compose(
  connect(mapDispatchToProps),
  withFormik({
    mapPropsToValues({ email, password }) { 
      return {
        email: '', 
        password: ''
      }
    },
    handleSubmit(values, { props, setSubmitting, setStatus, setErrors }) {
      register({
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
        .min(8, 'Password must be at least 8 characters.')
        .required('Password is required.')
    })
  })
)(RegisterForm)

const register = async (credentials, { props, setStatus, setErrors, setSubmitting }) => {
  try {
    setSubmitting(true)
    const res = await AuthenticationService.register({
      email: credentials.email,
      password: credentials.password
    })
    if (res.status === 201) {
      props.dispatch({
        type: SET_TOKEN,
        token: res.data.token
      })
      setStatus({
        message: 'Successfully registered! Redirecting...'
      })
    }
  } catch (error) {
    if (error.response.data.hasOwnProperty('error')) {
      const errKeys = error.response.data.error
      Object.keys(errKeys).forEach(key => {
        switch (key) {
          case 'email':
          case 'password':
            setErrors({
              [key]: errKeys[key]
            })
          break
          default:
            setStatus({
              error: error.response.data.error
            })
        }
      })
    }
  } finally {
    setSubmitting(false)
  }
}

export default Register
