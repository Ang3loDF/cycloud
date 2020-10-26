import React from "react";
import { Button } from "@material-ui/core";
import { useHistory } from "react-router-dom";

/* 
 * The logout button component. On click remove the Authorization token from localstorage
   and redirect to "/"
 * props required:
	- onAuthenticationChange (func) - raise when the Authorization token changes
	- style (obj) - className of the link
*/
export default function Logout(props) {
	const history = useHistory();

	// when the logout button is clicked
	const handleClick = () => {
		// delete the authenticatio token from local storage
		localStorage.setItem("Authorization", "");
		// raise the event
		props.onAuthenticationChange();
		// redirect
		history.push("/");
	};

	return (
		<div>
			<Button onClick={handleClick} className={props.style}>
				Logout
			</Button>
		</div>
	);
}
