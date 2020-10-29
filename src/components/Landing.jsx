import React from "react";
import { Link } from "react-router-dom";
import { Grid, Typography, Button, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// landing page style
const useStyles = makeStyles(() => ({
	container: {
		position: "absolute",
		top: 56,
		bottom: 0,
		width: "100%",
	},
	background: {
		backgroundImage:
			"url('https://images.unsplash.com/photo-1497493292307-31c376b6e479?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80')",
		height: "100%",
		backgroundPosition: "center",
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
	},
	grid: {
		maxWidth: 1000,
		margin: 0,
		padding: 20,
		position: "absolute",
		top: "50%",
		left: "50%",
		msTransform: "translate(-50%, -50%)",
		transform: "translate(-50%, -50%)",
	},
	card: {
		display: "flex",
		alignItems: "center",
		maxWidth: 700,
		margin: "auto",
		backgroundColor: "#083D77",
		color: "white",
	},
	cardContent: {
		margin: 30,
	},
	button: {
		width: 200,
		marginTop: 20,
		position: "reltive",
		left: "50%",
		transform: "translate(-50%, 0)",
		msTransform: "translate(-50%, 0)",
	},
	photoMention: {
		position: "absolute",
		bottom: 10,
		right: 10,
		opacity: 0.6,
	},
}));

// landing page component
export default function Landing() {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<div className={classes.background}>
				<Grid container alignItems="center" className={classes.grid}>
					<Grid item xs={12} md={8}>
						<Paper className={classes.card} background="primary">
							<div className={classes.cardContent}>
								<Typography variant="h3">Cycloud</Typography>
								<Typography
									variant="body1"
									style={{ marginTop: 20 }}
								>
									Is this a very cool cloud storage platform?
									Yes it is. You can upload everything you
									want, as big as you want and access it from
									everywhere you are. You simply need to
									create an account and start uploading
									images, documents, videos and anything else
									that comes to mind.
								</Typography>
							</div>
						</Paper>
					</Grid>
					<Grid item xs={12} md={4}>
						<Link to="/register" style={{ textDecoration: "none" }}>
							<Button
								variant="contained"
								color="primary"
								size="large"
								className={classes.button}
							>
								Start
							</Button>
						</Link>
					</Grid>
				</Grid>
				<span
					style={{ color: "white" }}
					className={classes.photoMention}
				>
					Photo by{" "}
					<a
						href="https://unsplash.com/@flysi3000?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
						style={{ color: "white" }}
					>
						Simon Abrams
					</a>{" "}
					on{" "}
					<a
						style={{ color: "white" }}
						href="https://unsplash.com/s/photos/computer?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText"
					>
						Unsplash
					</a>
				</span>
			</div>
		</div>
	);
}
