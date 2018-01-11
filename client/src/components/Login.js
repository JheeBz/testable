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
  Input
} from 'reactstrap'
import React from 'react'
import { withFormik } from 'formik'
import Yup from 'yup'
import AuthenticationService from '../services/AuthenticationService'

const LoginForm = ({
  values,
  errors,
  status,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  isSubmitting
}) => (
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
    </CardBody>
  </Card>
)

const Login = withFormik({
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
  handleSubmit (values, { setSubmitting, setStatus, setErrors }) {
    setSubmitting(true)
    login({
      email: values.email,
      password: values.password
    }, { setStatus, setErrors })
    setSubmitting(false)
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
})(LoginForm)

const login = async (credentials, { setStatus, setErrors }) => {
  try {
    const res = await AuthenticationService.login({
      email: credentials.email,
      password: credentials.password
    })
    if (res.status === 201) {
      setStatus({
        message: 'Successfully logged in!'
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
  }
}

export default Login
