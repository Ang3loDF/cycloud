const jwt = require("jsonwebtoken");

/*
 * Authenticate the user by looking at the authentication tokent in the Authorization field of the HTTP header.
 */
auth = function (req, res, next) {
	const token = req.header("Authorization");
	if (!token)
		return res
			.status(401)
			.json({ success: false, error: "Not authenticated" });

	try {
		const decoded = jwt.verify(token, process.env.AUTH_TOKEN_SECRET);
		req.user = decoded.user;
		next();
	} catch (err) {
		console.error(err);
		res.status(500).send({ success: false, error: "Authentication error" });
	}
};

module.exports = auth;
