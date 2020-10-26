import React, { useState } from "react";
import axios from "axios";
import qs from "qs";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";

const useStyles = makeStyles(() => ({
	container: {
		maxWidth: 500,
		margin: "5vh auto auto auto",
		paddingLeft: 10,
		paddingRight: 10,
	},
	textField: {
		marginBottom: 10,
	},
}));

/* 
 * The login form component. It contains an email and password field. It sends the login request
   to backend API, get the Authorization token and save it in localStorage. Then redirect to /dasboard
 * props required:
	- onAuthenticationChange (func) - raise when the Authorization token changes
*/
export default function Login(props) {
	const classes = useStyles();

	const history = useHistory();
	const [error, setError] = useState(null);
	// values of the form
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// when the form is submitted
	const handleSubmit = (event) => {
		event.preventDefault();
		// body of the request
		const body = qs.stringify({
			email,
			password,
		});

		// send the login request
		axios
			.post(process.env.REACT_APP_BASE_URL + "login", body)
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
		<div className={classes.container}>
			<h1>Login</h1>
			<form>
				<TextField
					type="text"
					name="email"
					label="email"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					variant="outlined"
					size="small"
					fullWidth
					className={classes.textField}
				/>
				<br />
				<TextField
					type="password"
					name="password"
					label="password"
					value={password}
					onChange={(e) => {
						setPassword(e.target.value);
					}}
					variant="outlined"
					size="small"
					fullWidth
					className={classes.textField}
				/>
				<br />
				<Button
					onClick={(event) => handleSubmit(event)}
					fullWidth
					variant="contained"
					color="primary"
				>
					Submit
				</Button>

				{error ? <p>{error.message}</p> : ""}
			</form>
		</div>
	);
}
