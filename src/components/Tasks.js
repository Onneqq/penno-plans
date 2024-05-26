import React, { useState, useEffect } from "react";
import axios from "axios";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  useEffect(() => {
    axios
      .get("/tasks")
      .then((response) => setTasks(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTask({ ...newTask, [name]: value });
  };

  const addTask = () => {
    axios
      .post("/tasks", newTask)
      .then((response) =>
        setTasks([
          ...tasks,
          { ...newTask, id: response.data.id, completed: false },
        ])
      )
      .catch((error) => console.error(error));
  };

  const markAsComplete = (id) => {
    axios
      .patch(`/tasks/${id}`, { completed: true })
      .then(() =>
        setTasks(
          tasks.map((task) =>
            task.id === id ? { ...task, completed: true } : task
          )
        )
      )
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <h1>Task Planner</h1>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={newTask.title}
        onChange={handleInputChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={newTask.description}
        onChange={handleInputChange}
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span
              style={{
                textDecoration: task.completed ? "line-through" : "none",
              }}
            >
              {task.title}: {task.description}
            </span>
            <button onClick={() => markAsComplete(task.id)}>Complete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tasks;
