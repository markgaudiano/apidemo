import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
// import Home from "./pages/home";
import Dashboard from "./pages/dashboard";
import Header from "./components/header";
import "bootstrap/dist/css/bootstrap-grid.min.css";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTY4MjU0ODE4LCJleHAiOjE1NzA4NDY4MTh9.IlDmDemq3-Sc-0MlEk3rxnlqbwr1pQwcEx_I58cAnQE";
class App extends React.Component {
  render() {
    console.log(this);

    return (
      <div className="app container">
        <Router>
          <Header />
          <Route test="test" path="/" exact component={Home} />
          <Route path="/dashboard" component={Dashboard} />
        </Router>
      </div>
    );
  }
}

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      users: [],
      username: "",
      password: "",
      admin: "",
      adminpass: "",
      match: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleData = this.handleData.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:1337/users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        // Handle success.

        this.setState({ users: response.data });
      })
      .catch(error => {
        // Handle error.
        console.log("An error occurred:", error);
      });

    axios
      .post("http://localhost:1337/auth/local", {
        identifier: "markgaudiano",
        password: "09327815880"
      })
      .then(response => {
        // Handle success.
        this.setState({ admin: "markgaudiano", adminpass: "09327815880" });
        console.log("Well done!");
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
      })
      .catch(error => {
        // Handle error.
        console.log("An error occurred:", error);
      });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleData(e) {
    e.preventDefault();
    this.state.username === this.state.admin &&
    this.state.password === this.state.adminpass
      ? this.setState({ match: true })
      : this.setState({ match: false });
    // console.log(this.state.username);
    // console.log(this.state.password);
    // console.log(this.state);
  }

  renderRedirect(e) {
    if (this.state.match) {
      return <Redirect to="/dashboard" />;
    }
  }
  render() {
    console.log(this.state.users);
    return (
      <div>
        <form onSubmit={this.handleData}>
          <input
            className="form-group"
            type="text"
            placeholder="username"
            name="username"
            onChange={this.handleChange}
          />
          <input
            className="form-group"
            type="password"
            placeholder="password"
            name="password"
            onChange={this.handleChange}
          />
          <button type="submit" onClick={this.renderRedirect}>
            submit
          </button>
        </form>
        {this.renderRedirect()}
      </div>
    );
  }
}
export default App;
