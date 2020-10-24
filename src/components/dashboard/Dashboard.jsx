import React, { useState, useEffect } from "react";
import axios from "axios";
import File from "./File";
import UploadForm from "./UploadForm";
import { Button } from "@material-ui/core";

export default function Dashboard(props) {
	const [files, setFiles] = useState([]);
	const [uploadFormOpen, setUploadFormOpen] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		axios.defaults.headers.common["Authorization"] = localStorage.getItem(
			"Authorization"
		);
		axios
			.get(process.env.REACT_APP_BASE_URL + "files")
			.then((res) => {
				setFiles(res.data.files);
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
	}, []);

	const handleUpload = () => {
		if (!uploadFormOpen) {
			setUploadFormOpen(true);
		} else {
			setUploadFormOpen(false);
		}
	};

	const onFileUploaded = (file) => {
		setUploadFormOpen(false);
		axios
			.get(process.env.REACT_APP_BASE_URL + "files")
			.then((res) => {
				setFiles(res.data.files);
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

	const onFileDeleted = () => {
		axios
			.get(process.env.REACT_APP_BASE_URL + "files")
			.then((res) => {
				setFiles(res.data.files);
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
						<p>Something went wrong loading the files</p>
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
