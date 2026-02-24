#!/usr/bin/env node
import { render } from "ink";
import { MouseProvider } from "@ink-tools/ink-mouse";
import { ErrorBoundary } from "./components/ui/ErrorBoundary";
import { App } from "./components/App";

render(
  <ErrorBoundary>
    <MouseProvider>
      <App />
    </MouseProvider>
  </ErrorBoundary>,
);
