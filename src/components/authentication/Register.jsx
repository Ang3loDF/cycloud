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

	const [error, setError] = useState(null);

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
				if (!err.response || !err.response.data.message)
					return setError({
						code: 0,
						message: "Error in communicating with the server.",
					});
				if (err.response.status === 400) {
					return setError({
						code: 400,
						message: err.response.data.message,
					});
				}
				if (err.response.status === 500) {
					return setError({
						code: 500,
						message: err.response.data.message,
					});
				}
			});
	};

	return (
		<div>
			<h1>Register</h1>
			<form>
				<input
					type="text"
					name="username"
					placeholder="username"
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

				{error ? <p>{error.message}</p> : ""}
			</form>
		</div>
	);
}
