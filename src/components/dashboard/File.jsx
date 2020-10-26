import React, { useState } from "react";
import { Button, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
	container: {
		marginBottom: 8,
		borderBottom: "1px solid black",
		paddingBottom: 8,
		display: "flex",
		alignItems: "center",
	},
	nameContainer: {
		width: "80%",
		wordWrap: "break-word",
	},
	deleteContainer: {
		marginLeft: "auto",
		marginRight: 0,
	},
}));

/* 
 * The single file of the list component. It contains the file name and a delete button
 * props required:
	- name (str) - the name of the file
	- auhentication (str) - the user's Authorization token
	- onFileDeleted (func) - raise when the file is deleted
*/
export default function File(props) {
	const classes = useStyles();

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
				if (!err.response || !err.response.data.message)
					return setError({
						code: 1,
						message: "Error in communicating with the server.",
					});
				if (err.response.status === 500) {
					return setError({
						code: 1,
						message: err.response.data.message,
					});
				}
			});
	};

	return (
		<div>
			<div className={classes.container}>
				<div className={classes.nameContainer}>{props.name}</div>
				<div className={classes.deleteContainer}>
					<IconButton onClick={handleDelete} variant="contained">
						<DeleteIcon fontSize="inherit" />
					</IconButton>
				</div>
				{error && error.code === 1 ? (
					<p style={{ color: "red" }}>{error.message}</p>
				) : (
					""
				)}
			</div>
		</div>
	);
}
