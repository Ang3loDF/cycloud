import React, { useState } from "react";
import axios from "axios";

export default function UploadForm(props) {
	const [file, setFile] = useState(null);
	const [uploaded, setUploaded] = useState(false);
	const [error, setError] = useState(null);

	const handleLoadFile = (e) => {
		setFile(e.target.files[0]);
	};

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
				try {
					setError({
						code: err.response.status,
						message: err.response.data.message,
					});
				} catch {
					setError({
						code: null,
						message: null,
					});
				}
			});
	};

	const handleClose = () => {
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
							<p style={{ color: "red" }}>
								Something went wrong!
							</p>
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
