import React from "react";
import axios from "axios";

class Forgot extends React.Component {
	constructor() {
		super();
		this.state = {
			username: "",
			email: "",
			success: false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({
			[name]: value
		});
	}

	handleSubmit(e) {
		console.log(this.state);
		axios
			.post("https://react-apidemo.herokuapp.com/auth/forgot-password", {
				identif: this.state.username,
				email: this.state.email,
				url:
					"https://react-apidemo.herokuapp.com/admin/plugins/users-permissions/auth/reset-password"
			})
			.then(response => {
				// Handle success.
				console.log("Your user received an email");
				this.setState({ success: true });
			})
			.catch(error => {
				// Handle error.
				console.log("An error occurred:", error);
			});
		e.preventDefault();
	}
	render() {
		console.log(this.state);
		return (
			<div>
				{this.state.success ? (
					<p>please check your email</p>
				) : (
					<form onSubmit={this.handleSubmit}>
						<input
							type="text"
							name="username"
							placeholder="username"
							onChange={this.handleChange}
						/>
						<input
							type="email"
							name="email"
							placeholder="email"
							onChange={this.handleChange}
						/>
						<button type="submit">reset password</button>
					</form>
				)}
			</div>
		);
	}
}

export default Forgot;
