import React from "react";
import axios from "axios";

export default function Login() {
	const handleSubmit = (event) => {
		event.preventDefault();
		axios.post(process.env.REACT_APP_BASE_URL + "login", {}).then((res) => {
			console.log(res);
			console.log(res.data);
		});
	};

	return (
		<div>
			<h1>Login</h1>
			<form>
				<input type="text" name="email" placeholder="email" />
				<br />
				<input type="password" name="password" placeholder="password" />
				<br />
				<button onClick={(event) => handleSubmit(event)}>Submit</button>
			</form>
		</div>
	);
}
