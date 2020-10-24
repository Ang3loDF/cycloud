import React, { useState } from "react";
import { Button } from "@material-ui/core";
import axios from "axios";

export default function File(props) {
	const [error, setError] = useState(null);

	const handleDelete = () => {
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
