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
		const extention = original.pop();
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
 * Route for uploading files. The user can send a request to this route with a file
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

module.exports = router;
