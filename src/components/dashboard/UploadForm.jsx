import React, { useState } from "react";
import axios from "axios";

/* 
 * The upload form components. Contains the input for selecting the file and the logic for uploading it.
 * props contained:
	- auhentication (str) - the user's Authorization token
	- onFileUploaded (str) - raise when the file is uploaded
*/
export default function UploadForm(props) {
	const [error, setError] = useState(null);
	// the file to load
	const [file, setFile] = useState(null);
	// if the file has been uploaded
	const [uploaded, setUploaded] = useState(false);

	// handle click on the input for selecting the file
	const handleLoadFile = (e) => {
		setFile(e.target.files[0]);
	};

	// handle click on upload
	const handleUploadFile = () => {
		let formData = new FormData();
		formData.append("file", file);
		axios
			.post(process.env.REACT_APP_BASE_URL + "upload", formData, {
				headers: {
					Authorization: props.authentication,
				},
			})
			.then((res) => {
				setUploaded(true);
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

	// handle click on the close button
	const handleClose = () => {
		/* raise file uploaded. Raise it here so that the user has the opportunity to see 
		the success message */
		props.onFileUploaded(file.name);
	};

	return (
		<div>
			{!uploaded ? (
				<span>
					{!error ? (
						<span>
							<input
								type="file"
								name="file"
								onChange={handleLoadFile}
							/>
							<button onClick={handleUploadFile}>Upload</button>
						</span>
					) : (
						<span>
							<p style={{ color: "red" }}>{error.message}</p>
							<button onClick={handleClose}>Ok</button>
						</span>
					)}
				</span>
			) : (
				<span>
					<p>File uploaded!</p>
					<button onClick={handleClose}>Ok</button>
				</span>
			)}
		</div>
	);
}
