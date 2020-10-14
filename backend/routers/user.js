let express = require("express"),
	router = express.Router(),
	bcrypt = require("bcrypt"),
	jwt = require("jsonwebtoken"),
	auth = require("./middlewares/auth"),
	validation = require("./middlewares/validation"),
	User = require("../models/user");

/* 
 * Register a new user to the database if he (compare email) doesn't exist already. Return a JWT to send back to the apis
  for authentication.
 * Body params (x-www-form-urlencoded):
	- username: free username for the user
	- email: email of the user (unique)
	- password: password of the user
 */
router.post("/register", validation, (req, res) => {
	// get user information
	const { username, email, password } = req.body;
	// try to find the user in db
	User.findOne({ email: email }, async (err, user) => {
		if (err) {
			return res
				.status(500)
				.json({ success: false, message: "Error in saving" });
		}
		// if he exists, return error
		if (user) {
			return res
				.status(400)
				.json({ success: false, message: "User Already Exitsts" });
		}

		// create a new user
		user = new User({
			username,
			email,
			password,
		});

		// encrypt the password
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);

		// save the user in db
		user.save((err) => {
			// set payload of the authentication token
			const payload = {
				user: { id: user.id },
			};
			// create and send the authentication token
			jwt.sign(payload, process.env.AUTH_TOKEN_SECRET, (err, token) => {
				res.status(200).json({ token });
			});
		});
	});
});

/* 
 * Login the user. Verify credentials and return a JWT to send back to the apis
  for authentication.
 * Body params (x-www-form-urlencoded):
	- email: email of the user
	- password: password of the user
 */
router.post("/login", (req, res) => {
	// get user information
	const { email, password } = req.body;
	// try to find the user
	User.findOne({ email }, async (err, user) => {
		if (err) {
			return res
				.status(500)
				.json({ success: false, message: "Error finding the user" });
		}
		// if he doesn't exist, send error
		if (!user) {
			return res
				.status(400)
				.json({ success: false, message: "User doesn't exist" });
		}

		// check password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res
				.status(400)
				.json({ success: false, message: "Incorrect password" });
		}

		// set payload of the authentication token
		const payload = {
			user: { id: user.id },
		};

		// create and send the authentication token
		jwt.sign(payload, process.env.AUTH_TOKEN_SECRET, (err, token) => {
			res.status(200).json({ token });
		});
	});
});

module.exports = router;
