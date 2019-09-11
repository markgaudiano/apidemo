import React from "react";
// import logo from "./logo.svg";
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: []
    };
  }
  componentDidMount() {
    fetch("http://localhost:1337/users")
      .then(result => result.json())
      .then(resultJSON => {
        this.setState({
          users: resultJSON
        });
      });
  }
  render() {
    console.log(this.state);
    return (
      <div
        style={{
          textAlign: "center",
          maxWidth: "80%",
          height: "auto",
          width: "100%"
        }}
      >
        {this.state.users.map(user => (
          <ul key={user.id}>
            <li>{user.username}</li>
          </ul>
        ))}
      </div>
    );
  }
}

export default App;
