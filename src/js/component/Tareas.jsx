import React, { useEffect } from "react";
import { useState } from "react";

let initialState = { label: "", done: false };

const Tareas = () => {
	const [task, setTask] = useState(initialState);
	const [list, setList] = useState([]);
	const [error, setError] = useState(false);
	const user = localStorage.getItem("user") || "";
	let URL_BASE = "https://assets.breatheco.de/apis/fake/todos/user/";

	let getApi = async () => {
		try {
			let response = await fetch(`${URL_BASE}josemi19`);
			let data = await response.json();
			setList(data);
			console.log(list);
		} catch (error) {}
	};

	let addListApi = async () => {
		if (task.label.trim() == "") {
			setError(true);
		}
		try {
			let response = await fetch(`${URL_BASE}josemi19`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify([...list, task]),
			});
			if (response.ok) {
				getApi();
				setTask({ ...task, ["label"]: "" });
			} else {
				console.log(response.status);
			}
		} catch (error) {
			console.log(error);
		}
	};

	let createUser = async () => {
		try {
			let response = await fetch(`${URL_BASE}josemi19`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify([]),
			});
			if (response.ok) {
				localStorage.setItem("user", JSON.stringify("josemi19"));
				getApi();
			}
			console.log(response.status);
		} catch (error) {
			console.log(error);
		}
	};

	let deleteUser = async () => {
		try {
			let response = await fetch(`${URL_BASE}josemi19`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (response.ok) {
				localStorage.removeItem("user");
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleTask = (event) => {
		setTask({ ...task, [event.target.name]: event.target.value });
	};

	const borrarTask = (id) => {
		let newList = list.filter((item, index) => index != id);
		setList(newList);
	};

	const handleKey = (event) => {
		if (event.key === "Enter") {
			if (task.label.trim() == "") {
				setError(true);
			} else {
				setList([...list, task]);
				setTask({ ...task, ["label"]: "" });
				setError(false);
			}
		}
	};

	useEffect(() => {
		if (user == "") {
			createUser();
		} else {
			getApi();
		}
	}, []);

	return (
		<>
			<div className="tarjeta row">
				<div className="col-6 col-md-8">
					<div className="card text-dark bg-light">
						<div className="input-group card-header">
							<div className="input-group">
								<input
									type="text"
									className="form-control bg-light entry"
									placeholder="Escriba la tarea"
									aria-describedby="button-addon2"
									value={task.label}
									onChange={handleTask}
									onKeyUp={handleKey}
									name="label"
								/>
								<button
									className="btn btn-outline-light btn-primary"
									type="button"
									id="button-addon2"
									onClick={addListApi}>
									Crear Tarea
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
											{item.label}
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
							<button
								type="button"
								className="btn btn-primary mt-2"
								onClick={() => {
									getApi();
								}}>
								Traer tareas guardadas
							</button>
							<button
								type="button"
								className="btn btn-danger mt-2 ms-1"
								onClick={() => {
									deleteUser();
								}}>
								Borrar Todo
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Tareas;
