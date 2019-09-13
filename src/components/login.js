import React, { Component } from "react";
import axios from "axios";

export class Login extends Component {
  componentDidMount() {
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
    return <div> test</div>;
  }
}
