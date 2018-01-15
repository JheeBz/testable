import { withFormik } from 'formik'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom'
import Yup from 'yup'
import AuthenticationService from '../services/AuthenticationService'
import { setToken } from '../actions'
import Register from '../components/Register'

const mapDispatchToProps = dispatch => {
  return {
    setToken: token => dispatch(setToken(token))
  }
}

const RegisterContainer = compose(
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
      register({
        email: values.email,
        password: values.password
      }, { ...props })
    },
    /**
     * @todo Make password requirements identical to API requirements.
     */
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
)(Register)

const register = async (credentials, { setSubmitting, setErrors, setStatus, props }) => {
  const { setToken } = props
  try {
    setSubmitting(true)
    const res = await AuthenticationService.register({
      email: credentials.email,
      password: credentials.password
    })
    if (res.status === 201) {
      setToken(res.data.token)
      setStatus({
        message: 'Successfully registered! Redirecting...'
      })
      /**
       * @todo remove .001 second delay. React will complain about updating an
       *       unmounted component without it. Requires investigation. 
       */
      setTimeout(() => {
        props.history.push('/home')
      }, 1)
    }
  } catch (error) {
    /**
     * @todo figure out the best way to do this to still
     * get the default case. Need to check for the existence
     * of lower level errors or check if error is string?
     */
    // if (error.response.data.hasOwnProperty('error')) {
    //   const errKeys = error.response.data.error
    //   Object.keys(errKeys).forEach(key => {
    //     switch (key) {
    //       case 'email':
    //       case 'password':
    //         setErrors({
    //           [key]: errKeys[key]
    //         })
    //         break
    //       default:
    //         setStatus({
    //           error: error.response.data.error
    //         })
    //     }
    //   })
    // }
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

export default RegisterContainer
