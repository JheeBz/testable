import { withFormik } from 'formik'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import Yup from 'yup'
import AuthenticationService from '../services/AuthenticationService'
import { setToken } from '../actions'
import Login from '../components/Login'

const mapDispatchToProps = dispatch => {
  return {
    setToken: token => dispatch(setToken(token))
  }
}

const LoginContainer = compose(
  withRouter,
  connect(null, mapDispatchToProps),
  withFormik({
    mapPropsToValues ({ email, password }) {
      return {
        email: '',
        password: ''
      }
    },
    handleSubmit (values, props) {
      login({
        email: values.email,
        password: values.password
      }, { ...props })
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
)(Login)

const login = async (credentials, { setSubmitting, setErrors, setStatus, props }) => {
  try {
    setSubmitting(true)
    const res = await AuthenticationService.login({
      email: credentials.email,
      password: credentials.password
    })
    if (res.status === 201) {
      setToken(res.data.token)
      setStatus({
        message: 'Successfully logged in! Redirecting...'
      })
      props.history.push('/home')
    }
  } catch (error) {
    if (error.response.data.error) {
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
  } finally {
    setSubmitting(false)
  }
}

export default LoginContainer
