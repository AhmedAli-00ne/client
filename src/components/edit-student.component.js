import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';


export default class EditStudent extends Component {

  constructor(props) {
    super(props)

    this.onChangeStudentFirstName = this.onChangeStudentFirstName.bind(this);
    this.onChangeStudentLastName = this.onChangeStudentLastName.bind(this);
    this.onChangeStudentEmail = this.onChangeStudentEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // State
    this.state = {
      fName: '',
      lName: '',
      email: '',
      password: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:4000/students/edit-student/' + this.props.match.params.id)
      .then(res => {
        this.setState({
          fName: res.data.fName,
          lName: res.data.lName,
          email: res.data.email,
          password: res.data.password
        });
      })
      .catch((error) => {
        console.log(error);
      })
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

  onSubmit(e) {
    e.preventDefault()
    console.log(this.state.password)
    const studentObject = {
      fName: this.state.fName,
      lName: this.state.lName,
      email: this.state.email,
      password: this.state.password
    };

    axios.put('http://localhost:4000/students/update-student/' + this.props.match.params.id, studentObject)
      .then((res) => {
        console.log(res.data)
        console.log('Student successfully updated')
        window.location.reload();
      }).catch((error) => {
        console.log(error)
      })

    // Redirect to Student List 
    this.props.history.push('/student-list')
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

        <Button variant="danger" size="lg" block="block" type="submit">
          Update Student
        </Button>
      </Form>
    </div>);
  }
}