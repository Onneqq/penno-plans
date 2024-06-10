import { useState, useEffect } from "react";
import axios from "axios";

function useTasks() {
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

  return {
    tasks,
    newTask,
    handleInputChange,
    addTask,
    markAsComplete,
  };
}

export default useTasks;
