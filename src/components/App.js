import React from "react";
import "../App.css";
import Login from "./Login.jsx";
import Register from "./Register";
import Logout from "./Logout";

function App() {
	return (
		<div className="App">
			<Login></Login>
			<Register></Register>
			<Logout></Logout>
		</div>
	);
}

export default App;
