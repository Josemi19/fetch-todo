import React from "react";
import { useState } from "react";

const Tareas = () => {
	const [task, setTask] = useState("");
	const [list, setList] = useState([]);
	const [error, setError] = useState(false);

	const handleTask = (event) => {
		setTask(event.target.value);
	};
	const addTask = () => {
		if (task.trim() == "") {
			setError(true);
		} else {
			setList([...list, task]);
			setTask("");
			setError(false);
		}
	};
	const borrarTask = (id) => {
		let newList = list.filter((item, index) => index != id);
		setList(newList);
	};
	const handleKey = (event) => {
		if (event.key === "Enter") {
			if (task.trim() == "") {
				setError(true);
			} else {
				setList([...list, task]);
				setTask("");
				setError(false);
			}
		}
	};

	return (
		<>
			<div className="tarjeta row">
				<div className="col-6">
					<div className="card text-dark bg-light">
						<div className="input-group card-header">
							<div className="input-group">
								<input
									type="text"
									className="form-control bg-light entry"
									placeholder="Escriba la tarea"
									aria-describedby="button-addon2"
									value={task}
									onChange={handleTask}
									onKeyUp={handleKey}
								/>
								<button
									className="btn btn-outline-light btn-primary"
									type="button"
									id="button-addon2"
									onClick={addTask}>
									Guardar
								</button>
							</div>
						</div>
						{error && (
							<div
								className="alert alert-danger d-flex align-items-center"
								role="alert">
								<div>Debe añadir una tarea</div>
							</div>
						)}
						<div className="card-body">
							<div className="card-text">
								{list.map((item, index) => {
									return (
										<p
											key={index}
											className="d-flex justify-content-between tarea">
											{item}
											<button
												type="button"
												className="btn-close"
												aria-label="Close"
												onClick={() =>
													borrarTask(index)
												}></button>
										</p>
									);
								})}
								{list.length} tarea(s) por hacer
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Tareas;
