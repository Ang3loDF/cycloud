import React, { useState } from "react";
import axios from "axios";
import qs from "qs";
import { useHistory } from "react-router-dom";

/* 
The register form component. It contains a username, email and password field. It sends the register
request to backend API, get the Authorization token and save it in localStorage. Then redirect to /dasboard
*/
export default function Register(props) {
	const history = useHistory();
	// values of the form
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// when the form is submitted
	const handleSubmit = (event) => {
		event.preventDefault();
		// body of the request
		const body = qs.stringify({
			email,
			password,
			username,
		});

		// send the register request
		axios
			.post(process.env.REACT_APP_BASE_URL + "register", body)
			.then((res) => {
				// save the authentication token
				localStorage.setItem("Authorization", res.data.token);
				// raise the event
				props.onAuthenticationChange();
				// redirect
				history.push("/dashboard");
			})
			.catch((err) => {
				console.log(err.response.data.message);
			});
	};

	return (
		<div>
			<h1>Register</h1>
			<form>
				<input
					type="text"
					name="username"
					placeholder="email"
					value={username}
					onChange={(e) => {
						setUsername(e.target.value);
					}}
				/>
				<br />
				<input
					type="text"
					name="email"
					placeholder="email"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				<br />
				<input
					type="password"
					name="password"
					placeholder="password"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
				<br />
				<button onClick={(event) => handleSubmit(event)}>Submit</button>
			</form>
		</div>
	);
}
