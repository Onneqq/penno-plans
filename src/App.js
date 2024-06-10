import React from "react";
import { Container } from "@mui/material";
import Tasks from "./components/Tasks/Tasks";
import Homebar from "./components/Homebar/Homebar";
import Calendar from "./components/Calendar/Calendar";

function App() {
  return (
    <div className="App">
      <Container>
        <Homebar />
        <Tasks />
        <Calendar />
      </Container>
    </div>
  );
}

export default App;
