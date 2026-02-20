import React from "react";
import { render, Box } from "ink";
import { StatusMessage } from "@inkjs/ui";

const App = () => (
  <Box flexDirection="column">
    <StatusMessage variant="success">Test Status Message</StatusMessage>
  </Box>
);

render(<App />);
