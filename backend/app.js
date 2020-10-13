let express = require("express"),
	app = express(),
	cors = require("cors"),
	bodyParser = require("body-parser");

// config environment variables from .env
require("dotenv").config();

// require routers
let userRouter = require("./routers/user"),
	fileRouter = require("./routers/file");

// config environment variables from .env
require("dotenv").config();

// get variables from environment
let PORT = process.env.SERVER_PORT,
	DB_URL = process.env.DB_URL;

// connetct to database
mongoose.connect(DB_URL, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
// remove cors restriction
cors = app.use(cors());

// use routers
app.use(userRouter);
app.use(fileRouter);

app.get("/", (req, res) => {
	res.send("<h1>Hello World!</h1");
});

app.listen(PORT, () => {
	console.log("Server listening on port " + PORT);
});
