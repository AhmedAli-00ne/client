import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import bcrypt from 'bcryptjs';

export default class CreateStudent extends Component {

  constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeStudentFirstName = this.onChangeStudentFirstName.bind(this);
    this.onChangeStudentLastName = this.onChangeStudentLastName.bind(this);
    this.onChangeStudentEmail = this.onChangeStudentEmail.bind(this);
    this.onChangeStudentPassword = this.onChangeStudentPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
      fName: '',
      lName: '',
      email: '',
      password: '',
    }
  }

  onChangeStudentFirstName(e) {
    this.setState({ fName: e.target.value })
  }

  onChangeStudentLastName(e) {
    this.setState({ lName: e.target.value })
  }

  onChangeStudentEmail(e) {
    this.setState({ email: e.target.value })
  }

  onChangeStudentPassword(e) {
    this.setState({ password: e.target.value })
  }

  onSubmit(e) {
    e.preventDefault()
    const psw = this.state.password
    const hashedPsw = bcrypt.hashSync(psw, '$2a$10$CwTycUXWue0Thq9StjUM0u');
    const studentObject = {
      fName: this.state.fName,
      lName: this.state.lName,
      email: this.state.email,
      password: hashedPsw
    };
    console.log(studentObject);
    axios.post('http://localhost:4000/students/register', studentObject)
      .then(res => console.log(res.data));

    this.setState({ fName: '', lName: '', email: '', password: '' })
  }

  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="fName">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" value={this.state.fName} onChange={this.onChangeStudentFirstName} />
        </Form.Group>

        <Form.Group controlId="lName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" value={this.state.lName} onChange={this.onChangeStudentLastName} />
        </Form.Group>

        <Form.Group controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={this.state.email} onChange={this.onChangeStudentEmail} />
        </Form.Group>

        <Form.Group controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control type="text" value={this.state.password} onChange={this.onChangeStudentPassword} />
        </Form.Group>

        <Button variant="danger" size="lg" block="block" type="submit" className="mt-4 col-4">
          Register
        </Button>
      </Form>
    </div>);
  }
}