import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import {useNavigate} from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

export default class Login extends Component {

    constructor(props) {
    super(props)

    // Setting up functions
    this.onChangeStudentEmail = this.onChangeStudentEmail.bind(this);
    this.onChangeStudentPassword = this.onChangeStudentPassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // Setting up state
    this.state = {
        email: '',
        password: '',
    }
    }


    onChangeStudentEmail(e) {
        this.setState({ email: e.target.value })
    }

    onChangeStudentPassword(e) {
        this.setState({ password: e.target.value })
    }

  onSubmit(e) {
    e.preventDefault()
    axios.get('http://localhost:4000/students/login/' + this.state.email)
      .then(res => {
        if(bcrypt.compareSync(this.state.password, res.data.password)){
            console.log('Login successful');
            this.props.history.push('/register');
        } else {
            console.log('Login failed');
        }
      })
      .catch((error) => {
        console.log(error);
      })
  }

  render() {
    return (<div className="form-wrapper">
    <Form onSubmit={this.onSubmit}>
        <Form.Group controlId="Email">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" value={this.state.email} onChange={this.onChangeStudentEmail} />
        </Form.Group>

        <Form.Group controlId="Password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={this.state.password} onChange={this.onChangeStudentPassword} />
        </Form.Group>
        <Button variant="danger" size="lg" block="block" type="submit" className="mt-4 col-4">
            Login
        </Button>
        <Link to="/register" style={{ marginLeft: '30%' }} >
            <Button
              variant="danger"
              size="lg"
              block="block"
              type="button"
              className="mt-4 col-4"
            >
              Register
            </Button>
          </Link>
      </Form>
    </div>);
  }
}