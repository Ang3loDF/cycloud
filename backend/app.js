let express = require("express"),
	app = express(),
	cors = require("cors"),
	bodyParser = require("body-parser"),
	path = require("path");

// config environment variables from .env
require("dotenv").config();

// require routers
let userRouter = require("./routers/user"),
	fileRouter = require("./routers/file"),
	applicationRouter = require("./routers/application");

// config environment variables from .env
require("dotenv").config();

// get variables from environment
let PORT = process.env.SERVER_PORT,
	DB_URL = process.env.DB_URL;

// connetct to database
mongoose.connect(DB_URL, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
	useCreateIndex: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
// remove cors restriction
cors = app.use(cors());

// serve static files from build
app.use(express.static(path.join(__dirname, "..", "build")));

// use APIs routers
app.use(userRouter);
app.use(fileRouter);
// use application server router
app.use(applicationRouter);

app.listen(PORT, () => {
	console.log("Server listening on port " + PORT);
});
