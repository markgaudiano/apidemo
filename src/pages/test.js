import React, { Component } from "react";

class Test extends Component {
	render() {
		console.log(this);
		return (
			<div>
				<p>test {this.props.data1}</p>
			</div>
		);
	}
}

export default Test;
