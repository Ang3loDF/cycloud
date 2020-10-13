let express = require("express"),
	router = express.Router(),
	multer = require("multer"),
	fs = require("fs"),
	auth = require("./middlewares/auth");

// set storage property
const storage = multer.diskStorage({
	// get the destination directory (backend/uploads/:userId)
	destination: (req, file, cb) => {
		const { id } = req.user;
		const dir = "backend/uploads/";
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
		const dir = "backend/uploads/" + id;

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

router.post("/upload", auth, upload.single("file"), (req, res) => {
	res.send("file uploaded");
	/* create database logic */
});

module.exports = router;
