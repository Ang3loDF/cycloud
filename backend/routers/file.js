const { route } = require("./user");

let express = require("express"),
	router = express.Router(),
	multer = require("multer"),
	fs = require("fs"),
	User = require("../models/user"),
	auth = require("./middlewares/auth");

const uploadsPath = "backend/uploads/";

// set storage property
const storage = multer.diskStorage({
	// get the destination directory (backend/uploads/:userId)
	destination: (req, file, cb) => {
		const { id } = req.user;
		const dir = uploadsPath;
		// check if the directory exists
		if (!fs.existsSync(dir + id)) {
			// check if the "uploads/" folder exists, else create it
			if (!fs.existsSync(dir)) fs.mkdirSync(dir);
			// create the user folder
			fs.mkdirSync(dir + id);
		}
		cb(null, dir + id);
	},
	// get the name with wich to save the file
	filename: (req, file, cb) => {
		const { id } = req.user;
		const dir = uploadsPath + id;

		// get file original name and extension
		let original = file.originalname.split(".");
		const extention = original.pop().toLowerCase();
		let name = original.join();

		// if there is already a file with this name in the user's folder,
		// keep adding _i untill it is unique
		let i = 2;
		while (fs.existsSync(dir + "/" + name + "." + extention)) {
			name = original + "_" + i.toString();
			i++;
		}
		cb(null, name + "." + extention);
	},
});
let upload = multer({ storage });

/* 
 * Route for uploading files. The user can send a request to this route with a
   file in the body, that will be stored in his folder.
 * Body params (form-data):
	- file: the file that have to be uploaded
*/
router.post("/upload", auth, upload.single("file"), (req, res) => {
	// find the user
	User.findOne({ _id: req.user.id }, (err, user) => {
		// if database error, delete the file already stored
		if (err || !user) {
			const dir = uploadsPath + req.user.id + "/" + req.file.filename;
			fs.unlink(dir, (err) => {
				if (err) console.log(err);
				return res.send({ success: false, message: "Uploading error" });
			});
			return false;
		}
		// add the file name to the user list
		user.files.push(req.file.filename);
		user.save((err, user) => {
			res.json({ success: true, message: "File uploaded" });
		});
	});
});

/* 
 * Route for getting a single file. An authenticated user can get a file from
   his folder on the server through this route.
 * URL params:
	- filename: tha name of the file to get (case sensitive)
*/
router.get("/files/:filename", auth, (req, res) => {
	const { id } = req.user;
	const { filename } = req.params;

	// find the user
	User.findOne({ _id: id }, (err, user) => {
		if (err || !user) {
			return res.json({
				success: false,
				message: "Error in getting the file",
			});
		}
		// check if the name of the file is in the user's list
		if (!user.files.includes(filename)) {
			return res.json({
				success: false,
				message: "File doesn't exist",
			});
		}
		// send the file
		res.sendFile(filename, {
			root: uploadsPath + id,
		});
	});
});

/* 
 * Route for removing a file. An authenticated user can remove a file from
   his folder on the server through this route.
 * URL params:
	- filename: tha name of the file to remove (case sensitive)
*/
router.post("/files/:filename/remove", auth, (req, res) => {
	const { id } = req.user;
	const { filename } = req.params;

	// find the user
	User.findOne({ _id: id }, (err, user) => {
		if (err || !user) {
			return res.json({
				success: false,
				message: "Error in removing the file",
			});
		}
		// check if the name of the file is in the user's list
		if (!user.files.includes(filename)) {
			return res.json({
				success: false,
				message: "File doesn't exist",
			});
		}

		// remove the name of the file from the user's list
		const fileIndex = user.files.indexOf(filename);
		user.files.splice(fileIndex, 1);
		user.save((err) => {
			// delete the file from the folder
			fs.unlink(uploadsPath + id + "/" + filename, (err) => {
				res.json({ success: true, message: "File removed" });
			});
		});
	});
});

module.exports = router;
