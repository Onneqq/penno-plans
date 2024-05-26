import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  IconButton,
} from "@mui/material";

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
    <Container>
      <Typography variant="h2" gutterBottom>
        Task Planner
      </Typography>
      <TextField
        label="Title"
        name="title"
        value={newTask.title}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        name="description"
        value={newTask.description}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={addTask}
        style={{ marginTop: "1rem" }}
      >
        Add Task
      </Button>
      <List>
        {tasks.map((task) => (
          <ListItem
            key={task.id}
            dense
            button
            onClick={() => markAsComplete(task.id)}
            style={{ textDecoration: task.completed ? "line-through" : "none" }}
          >
            <Checkbox checked={task.completed} tabIndex={-1} disableRipple />
            <ListItemText primary={`${task.title}: ${task.description}`} />
            <IconButton
              edge="end"
              aria-label="complete"
              onClick={() => markAsComplete(task.id)}
            ></IconButton>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Tasks;
