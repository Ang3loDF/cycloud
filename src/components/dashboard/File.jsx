import React, { useState } from "react";
import { Button } from "@material-ui/core";
import axios from "axios";

/* 
 * The single file of the list component. It contains the file name and a delete button
 * props required:
	- name (str) - the name of the file
	- auhentication (str) - the user's Authorization token
	- onFileDeleted (func) - raise when the file is deleted
*/
export default function File(props) {
	const [error, setError] = useState(null);

	// handle the click on the delete button
	const handleDelete = () => {
		// send request for deleting the file
		axios
			.post(
				process.env.REACT_APP_BASE_URL +
					"files/" +
					props.name +
					"/remove",
				{},
				{
					headers: {
						Authorization: props.authentication,
					},
				}
			)
			.then((res) => {
				// if success raise the event
				if (res.data.success) {
					props.onFileDeleted();
				}
			})
			.catch((err) => {
				try {
					setError({
						code: 1,
						message: err.response.data.message,
					});
				} catch {
					setError({
						code: 1,
						message: null,
					});
				}
			});
	};

	return (
		<div>
			<div style={{ border: "1px solid black", margin: 10 }}>
				{props.name}
				<Button onClick={handleDelete}>Delete</Button>
				{error && error.code === 1 ? (
					<p style={{ color: "red" }}>
						Something went wrong deleting the file
					</p>
				) : (
					""
				)}
			</div>
		</div>
	);
}
