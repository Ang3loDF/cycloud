import React, { useState } from "react";
import "../App.css";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import Landing from "./Landing";
import Navabar from "./Navbar";
import Dashboard from "./dashboard/Dashboard";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
	palette: {
		primary: {
			main: "#083D77",
		},
		secondary: {
			main: "#0000FF",
		},
	},
});

/* 
The app component. It sets up the app routes and manage the user's authenticatio
*/
function App() {
	// the user's authentication token
	const [authentication, setAuthentication] = useState(
		localStorage.getItem("Authorization")
	);

	// update the state when the authentication token changes
	const onAuthenticationChange = () => {
		setAuthentication(localStorage.getItem("Authorization"));
	};

	return (
		<MuiThemeProvider theme={theme}>
			<Router>
				<div className="App">
					<Navabar
						authentication={authentication}
						onAuthenticationChange={onAuthenticationChange}
					/>
					<Switch>
						<Route exact path="/">
							{authentication ? (
								<Redirect to="/dashboard" />
							) : (
								<Landing />
							)}
						</Route>
						<Route
							path="/login"
							component={() => (
								<Login
									onAuthenticationChange={
										onAuthenticationChange
									}
								/>
							)}
						></Route>
						<Route
							path="/register"
							component={() => (
								<Register
									onAuthenticationChange={
										onAuthenticationChange
									}
								/>
							)}
						></Route>
						<Route
							path="/dashboard"
							component={() => (
								<Dashboard authentication={authentication} />
							)}
						></Route>
					</Switch>
				</div>
			</Router>
		</MuiThemeProvider>
	);
}

export default App;
