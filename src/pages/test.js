import React, { Component } from "react";

class Test extends Component {
	render() {
		console.log(this);
		const userArray = JSON.parse(this.props.data1);
		console.log(userArray);
		return (
			<div>
				<h2>User info</h2>
				<p>Username: {userArray.username}</p>
				<p>Password: {userArray.email}</p>
				<p>Provider: {userArray.provider}</p>
				<p>Role: {userArray.role.name}</p>
				<ul>
					{userArray.sites.map(site => (
						<li key={site.id}>{site.title}</li>
					))}
				</ul>
			</div>
		);
	}
}

export default Test;
