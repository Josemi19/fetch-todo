import React, { useEffect } from "react";
import { useState } from "react";

let initialState = { label: "", done: false };

const Tareas = () => {
	const [task, setTask] = useState(initialState);
	const [list, setList] = useState([]);
	const [error, setError] = useState(false);
	const [user, setUser] = useState("");
	let URL_BASE = "https://assets.breatheco.de/apis/fake/todos/user/";

	let getApi = async () => {
		try {
			let response = await fetch(`${URL_BASE}${user}`);
			let data = await response.json();
			setList(data);
			console.log(list);
		} catch (error) {}
	};

	let createUser = async () => {
		try {
			let response = await fetch(`${URL_BASE}${user}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify([]),
			});
			if (response.ok) {
				getApi();
			}
			console.log(response.status);
		} catch (error) {
			console.log(error);
		}
	};

	let addListApi = async () => {
		try {
			let response = await fetch(`${URL_BASE}${user}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify([...list, task]),
			});
			if (response.ok) {
				getApi();
			} else {
				console.log(response.status);
			}
		} catch (error) {
			console.log(error);
		}
	};

	let deleteUser = async () => {
		try {
			let response = await fetch(`${URL_BASE}${user}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			});
		} catch (error) {
			console.log(error);
		}
	};

	const handleTask = (event) => {
		setTask({ ...task, [event.target.name]: event.target.value });
	};

	// const addTask = () => {
	// 	if (task.trim() == "") {
	// 		setError(true);
	// 	} else {
	// 		setList([...list, task]);
	// 		setTask("");
	// 		setError(false);
	// 	}
	// };

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
				<div className="col-6 col-md-8">
					<div className="card text-dark bg-light">
						<div className="input-group card-header">
							<div className="input-group d-flex align-items-center m-2">
								<input
									type="text"
									className="form-control bg-light userEntry"
									placeholder="Nombre de usuario"
									aria-describedby="button-addon2"
									value={user}
									onChange={(event) => {
										setUser(event.target.value);
									}}
								/>
								<button
									type="button"
									className="btn btn-primary m-2 "
									onClick={() => {
										createUser();
									}}>
									Crear Usuario
								</button>
								<button
									type="button"
									className="btn btn-danger m-2 "
									onClick={() => {
										deleteUser();
									}}>
									Borrar Usuario
								</button>
							</div>
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
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Tareas;
