import React, { useState } from "react";
import axios from "axios";

export default function Register() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		axios
			.post(process.env.REACT_APP_BASE_URL + "register", {})
			.then((res) => {
				console.log(res);
				console.log(res.data);
			});
	};

	return (
		<div>
			<h1>Register</h1>
			<form>
				<input type="text" name="username" placeholder="username" />
				<br />
				<input type="text" name="email" placeholder="email" />
				<br />
				<input type="password" name="password" placeholder="password" />
				<br />
				<button onClick={(event) => handleSubmit(event)}>Submit</button>
			</form>
		</div>
	);
}
