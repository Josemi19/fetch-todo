import React from "react";
import Tareas from "./Tareas.jsx";

//create your first component
const App = () => {
	return (
		<div>
			<h1 className="d-flex justify-content-center">todos</h1>
			<Tareas />
		</div>
	);
};

export default App;
