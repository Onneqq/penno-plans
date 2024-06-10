// create a homebar component that will be used to toggle between different components like dinners, calendar, and shopping list

import React from "react";
import { Button, Box } from "@mui/material";

function Homebar() {
  return (
    <Box display="flex" justifyContent="space-around" p={2}>
      <Button variant="contained" color="primary">
        Dinners
      </Button>
      <Button variant="contained" color="primary">
        Calendar
      </Button>
      <Button variant="contained" color="primary">
        Shopping List
      </Button>
    </Box>
  );
}

export default Homebar;
