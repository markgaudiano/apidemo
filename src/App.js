import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Login from "./pages/login";
import Home from "./pages/home";
import Test from "./pages/test";
// import Dashboard from "./pages/dashboard";
// import Header from "./components/header";
import "bootstrap/dist/css/bootstrap-grid.min.css";

import { BrowserRouter as Router, Route } from "react-router-dom";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      allusers: [],
      isFetching: true
    };
  }

  componentDidMount() {
    fetch("http://localhost:1337/users")
      .then(response => response.json())
      .then(users =>
        this.setState({
          allusers: users,
          isFetching: false
        })
      );
  }
  render() {
    console.log(this.state);
    return (
      <div className="container py-5">
        <Router>
          {this.state.isFetching
            ? null
            : this.state.allusers.map(user => (
                <Route
                  key={user.id}
                  path={`/user/${user.id}`}
                  render={props => <Test data1="DATA" />}
                />
              ))}
          <Route path="/" test={"test"} exact component={Index} />
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
        </Router>
      </div>
    );
  }
}

class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      isFetching: true,
      username: "",
      password: "",
      email: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:1337/users")
      .then(response => response.json())
      .then(users =>
        this.setState({
          users: users,
          isFetching: false
        })
      );
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = e => {
    const newUser = e.target.querySelector("input").value;
    console.log(newUser);
    e.target.querySelector("input").value = "";

    axios
      .post("http://localhost:1337/users", {
        username: newUser,
        email: newUser,
        password: newUser
      })
      .then(response => response.data)
      .then(adduser =>
        this.setState({
          users: [
            ...this.state.users,
            {
              username: adduser.username,
              password: adduser.password,
              email: adduser.email
            }
          ]
        })
      );

    e.preventDefault();
  };

  handleDelete(id) {
    axios
      .delete("http://localhost:1337/users/" + id)
      .then(response => response.data)
      .then(deleteUser => {
        this.setState({
          users: this.state.users.filter(user => user.id !== deleteUser.id)
        });
        window.location.reload();
      });
  }

  render() {
    return (
      <div data={this.state.users}>
        <h2>Users List</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            className="form-group"
            type="text"
            placeholder="username"
            name="username"
            onChange={this.handleChange}
          />
          <br />
          <input
            className="form-group"
            type="email"
            placeholder="email"
            name="email"
            onChange={this.handleChange}
          />
          <br />
          <input
            className="form-group"
            type="password"
            placeholder="password"
            name="password"
            onChange={this.handleChange}
          />
          <br />
          <button type="submmit">submit</button>
        </form>

        {this.state.isFetching ? (
          <p>Getting the users.</p>
        ) : (
          <ul>
            {this.state.users.map(user => (
              <li key={user.id}>
                {user.username}{" "}
                <button onClick={e => this.handleDelete(user.id)}>x</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
export default App;
