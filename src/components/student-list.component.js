import React, { Component } from "react";
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import StudentTableRow from './StudentTableRow';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'


export default class StudentList extends Component {

  constructor(props) {
    super(props)
    this.state = {
      students: []
    };
  }


  onSubmit(e) {
    console.log('here');
    window.location.href = 'http://localhost:4000/index.html';
  }

  componentDidMount() {
    axios.get('http://localhost:4000/students/')
      .then(res => {
        this.setState({
          students: res.data
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  DataTable() {
    return this.state.students.map((res, i) => {
      return <StudentTableRow obj={res} key={i} />;
    });
  }


  render() {
    return (<div className="table-wrapper">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {this.DataTable()}
        </tbody>
      </Table>
      <Button variant="danger" size="lg" block="block" type="submit" className="mt-4 col-4">
          Back
      </Button>
      <Link to="/register" style={{ marginLeft: '30%' }} >
            <Button
              variant="danger"
              size="lg"
              block="block"
              type="button"
              className="mt-4 col-4"
            >
              Create User
            </Button>
          </Link>
    </div>);
  }
}