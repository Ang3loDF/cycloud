/* 
* Validate input of the user for the registration route
* Body params:
    - username: free username for the user
	- email: email of the user (unique)
	- password: password of the user
*/
validation = function (req, res, next) {
	const { email, username, password } = req.body;

	// validate email
	let validEmail = ((email) => {
		let emailRegex = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

		if (!email) return false;

		if (email.length > 254) return false;

		let valid = emailRegex.test(email);
		if (!valid) return false;

		let parts = email.split("@");
		if (parts[0].length > 64) return false;

		let domainParts = parts[1].split(".");
		if (
			domainParts.some(function (part) {
				return part.length > 63;
			})
		)
			return false;

		return true;
	})(email);

	if (!validEmail)
		return res
			.status(400)
			.json({ success: false, message: "Invalid email" });

	// validate username
	let usernameRegex = /^[a-z0-9]+$/i;
	if (!username || username.length > 64 || !usernameRegex.test(username))
		return res
			.status(400)
			.json({ success: false, message: "Invalid username" });

	// validate password
	if (!password || password.length < 8)
		return res
			.status(400)
			.json({ success: false, message: "Invalid password" });

	next();
};

module.exports = validation;
