import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Logout from "./authentication/Logout";

// navbar styling
const useStyle = makeStyles(() => ({
	brand: {
		color: "white",
		textDecoration: "none",
	},
	authButtonsContainer: {
		margin: "auto 0px auto auto",
	},
	links: {
		color: "white",
		textDecoration: "none",
	},
}));

/* 
 * The navbar component. Shows the Login/Registers or Logout links.
 * props required:
	- authentication (str) - the user's Authorization token
	- onAuthenticationChange (func) - raise when the Authorization token changes
*/
export default function Navbar(props) {
	const classes = useStyle();

	const authentication = props.authentication;

	return (
		<div>
			<AppBar position="static" color="primary">
				<Toolbar>
					<Typography variant="h6">
						<Link to="/" className={classes.brand}>
							Cycloud
						</Link>
					</Typography>
					<div className={classes.authButtonsContainer}>
						{authentication ? (
							<Logout
								style={classes.links}
								onAuthenticationChange={
									props.onAuthenticationChange
								}
							/>
						) : (
							<div>
								<Link to="/login" className={classes.links}>
									<Button color="inherit">Login</Button>
								</Link>
								<Link to="/register" className={classes.links}>
									<Button color="inherit">Register</Button>
								</Link>
							</div>
						)}
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
}
