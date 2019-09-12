import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTY4MjU0ODE4LCJleHAiOjE1NzA4NDY4MTh9.IlDmDemq3-Sc-0MlEk3rxnlqbwr1pQwcEx_I58cAnQE";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
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
        console.log("Well done!");
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
      })
      .catch(error => {
        // Handle error.
        console.log("An error occurred:", error);
      });
  }
  render() {
    console.log(this.state.users);

    return (
      <div
        style={{
          textAlign: "center",
          maxWidth: "80%",
          height: "auto",
          width: "100%"
        }}
      >
        <ul>
          {this.state.users.map(user => (
            <li key={user.id}>{user.username}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
