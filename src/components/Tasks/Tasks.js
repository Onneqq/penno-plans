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
import useTasks from "./useTasks";

function Tasks() {
  const { tasks, newTask, handleInputChange, addTask, markAsComplete } =
    useTasks();

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
