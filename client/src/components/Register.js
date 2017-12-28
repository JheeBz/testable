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
import React, { Component } from 'react'
import Api from '../services/Api'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      password: null
    }
  }
  
  render() {
    return (
      <Card className="Register">
        <CardBody>
          <CardTitle className="text-center">Register</CardTitle>
          <Form onSubmit={() => this.register()}>
            <FormGroup>
              <Input 
                type="email" 
                name="email" 
                id="LoginEmail" 
                placeholder="Email" />
            </FormGroup>
            <FormGroup>
              <Input 
                type="password" 
                name="password" 
                id="LoginPassword" 
                placeholder="Password" />
              <FormText muted>
                Must be at least 8 characters long, contain 1 number and 1
                UPPERCASE letter.
              </FormText>
            </FormGroup>
          </Form>
          <Button 
            color="success" 
            className="d-block mx-auto">
            Register
          </Button>
        </CardBody>
      </Card>
    )
  }

  handleRegister(e) {
    // Api().
  }

  handleChange() {

  }
}

// const Register = ({ history }) => (
//   <Card className="Register">
//     <CardBody>
//       <CardTitle className="text-center">Register</CardTitle>
//       <Form>
//         <FormGroup>
//           <Input
//             type="email"
//             name="email"
//             id="LoginEmail"
//             placeholder="Email"
//           />
//         </FormGroup>
//         <FormGroup>
//           <Input
//             type="password"
//             name="password"
//             id="LoginPassword"
//             placeholder="Password"
//           />
//           <FormText muted>Must be at least 8 characters long, contain 1 number and 1 UPPERCASE letter.</FormText>
//         </FormGroup>
//       </Form>
//       <Button color="success" className="d-block mx-auto">
//         Register
//       </Button>
//     </CardBody>
//   </Card>
// )

export default Register
