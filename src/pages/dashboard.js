import React, { Component } from "react";
import axios from "axios";

const token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTY4MjU0ODE4LCJleHAiOjE1NzA4NDY4MTh9.IlDmDemq3-Sc-0MlEk3rxnlqbwr1pQwcEx_I58cAnQE";
class Dashboard extends Component {
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
	}
	render() {
		console.log(this.state.users);
		return (
			<div>
				<h1>Welcome Admin</h1>
				<h3>Users</h3>
				<ul className="list-unstyled">
					{this.state.users.map(user => (
						<li key={user.id}>{user.username}</li>
					))}
				</ul>
			</div>
		);
	}
}

export default Dashboard;
