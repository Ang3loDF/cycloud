import React, { useState } from "react";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import Logout from "./authentication/Logout";

/* 
 * The navbar component. Shows the Login/Registers or Logout links.
 * props required:
	- authentication (str) - the user's Authorization token
	- onAuthenticationChange (func) - raise when the Authorization token changes
*/
export default function Navbar(props) {
	const authentication = props.authentication;

	return (
		<div>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6">
						<Link to="/" style={{ color: "white" }}>
							Cycloud
						</Link>
					</Typography>
					{authentication ? (
						<Logout
							onAuthenticationChange={
								props.onAuthenticationChange
							}
						/>
					) : (
						<div>
							<Link to="/login" style={{ color: "white" }}>
								<Button color="inherit">Login</Button>
							</Link>
							<Link to="/register" style={{ color: "white" }}>
								<Button color="inherit">Register</Button>
							</Link>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
}
