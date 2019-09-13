import React, { Component } from "react";

class Home extends Component {
	render() {
		return (
			<div>
				<form action="/dasboard">
					<input type="text" placeholder="username" name="username" />
					<input type="email" placeholder="email" name="email" />
					<input type="password" placeholder="password" name="password" />
					<button type="submit">submit</button>
				</form>
			</div>
		);
	}
}

export default Home;
