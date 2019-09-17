import React from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap-grid.min.css";

// import { Redirect } from "react-router-dom";

class Login extends React.Component {
	constructor() {
		super();
		this.state = {
			username: "",
			password: "",
			success: false,
			error: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		// this.renderRedirect = this.renderRedirect.bind(this);
	}
	// componentDidMount() {
	// 	axios
	// 		.post("http://localhost:1337/auth/local", {
	// 			identifier: "markgaudiano",
	// 			password: "09327815880"
	// 		})
	// 		.then(response => {
	// 			// Handle success.
	// 			console.log("Well done!");
	// 			console.log("User profile", response.data.user);
	// 			console.log("User token", response.data.jwt);
	// 		})
	// 		.catch(error => {
	// 			// Handle error.
	// 			console.log("An error occurred:", error);
	// 			function test() {
	// 				return <p>error brad</p>;
	// 			}
	// 		});
	// }
	handleChange(e) {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	}
	handleSubmit(e) {
		console.log(this.state.username);
		axios
			.post("http://localhost:1337/auth/local", {
				identifier: this.state.username,
				password: this.state.password
			})
			.then(response => {
				// Handle success.
				console.log("Well done!");
				console.log("User profile", response.data.user);
				console.log("User token", response.data.jwt);

				this.setState({ success: true });
			})
			.catch(error => {
				// Handle error.
				console.log("An error occurred:", error);
				this.setState({ error: true });
			});
		e.preventDefault();
	}
	// renderRedirect(e) {
	// 	if (this.state.success) {
	// 		return <Redirect user="mark" to="/home" />;
	// 	}
	// }

	render() {
		console.log(this.state);
		return (
			<div>
				{this.state.success ? (
					<p>you're now login</p>
				) : (
					<div>
						<form onSubmit={this.handleSubmit}>
							<div className="form-group">
								<label htmlFor="username">Username:</label>
								<input
									type="text"
									className="form-control"
									id="username"
									placeholder="username"
									autoComplete="username"
									name="username"
									onChange={this.handleChange}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="password">Password:</label>
								<input
									type="password"
									className="form-control"
									id="password"
									placeholder="password"
									autoComplete="current-password"
									name="password"
									onChange={this.handleChange}
								/>
							</div>
							<button type="submit">Submit</button>
						</form>
						{this.state.error ? (
							<p className="text-danger">wrong credentials</p>
						) : null}
					</div>
				)}
			</div>
		);
	}
}

export default Login;
