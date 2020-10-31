/*
 * Router that deals with serve the application with all the possible urls
 */
let express = require("express"),
	router = express.Router(),
	path = require("path");

// absolute path for the file index.html
const PATH = path.join(__dirname, "..", "..", "build", "index.html");

router.get("/", (req, res) => {
	res.sendFile(PATH);
});

router.get("/login", (req, res) => {
	res.sendFile(PATH);
});

router.get("/register", (req, res) => {
	res.sendFile(PATH);
});

router.get("/dashboard", (req, res) => {
	res.sendFile(PATH);
});

module.exports = router;
