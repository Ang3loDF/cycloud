import React, { useState, useEffect } from "react";
import axios from "axios";
import File from "./File";
import UploadForm from "./UploadForm";
import { Button } from "@material-ui/core";

/* 
 * The dashboard component. It is the main component of the website. It shows a list of files
   if the user is logged-in, the files that the user has uploaded. It contains an upload button
   that shows tha upload form for uploading a new file.
 * props required:
	- auhentication (str) - the user's Authorization token
*/
export default function Dashboard(props) {
	const [error, setError] = useState(null);
	// a list of strings containing the names of the files to show
	const [files, setFiles] = useState([]);
	// if the upload form is open
	const [uploadFormOpen, setUploadFormOpen] = useState(false);

	// when the component mounts
	useEffect(() => {
		// set the Authorization header for all the followings request in this component
		axios.defaults.headers.common["Authorization"] = localStorage.getItem(
			"Authorization"
		);
		// get the list of files
		axios
			.get(process.env.REACT_APP_BASE_URL + "files")
			.then((res) => {
				setFiles(res.data.files);
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
	}, []);

	// handle click on the upload button
	const handleUpload = () => {
		if (!uploadFormOpen) {
			setUploadFormOpen(true);
		} else {
			setUploadFormOpen(false);
		}
	};

	// when a new file is uploaded by the user
	const onFileUploaded = (file) => {
		// close the upload form
		setUploadFormOpen(false);
		// get the updated list of files
		axios
			.get(process.env.REACT_APP_BASE_URL + "files")
			.then((res) => {
				setFiles(res.data.files);
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

	// when a file is deleted
	const onFileDeleted = () => {
		// get the updated list of files
		axios
			.get(process.env.REACT_APP_BASE_URL + "files")
			.then((res) => {
				setFiles(res.data.files);
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
			{props.authentication ? (
				<div>
					<h1>Your Dashboard</h1>
					<Button color="primary" onClick={handleUpload}>
						Upload
					</Button>
					{uploadFormOpen ? (
						<UploadForm
							authentication={props.authentication}
							onFileUploaded={onFileUploaded}
						/>
					) : (
						""
					)}

					{error && error.code === 1 ? (
						<p>{error.message}</p>
					) : (
						files.map((e) => (
							<span key={e}>
								<File
									name={e}
									authentication={props.authentication}
									onFileDeleted={onFileDeleted}
								/>
							</span>
						))
					)}
				</div>
			) : (
				<h1>You are not Logged in</h1>
			)}
		</div>
	);
}
