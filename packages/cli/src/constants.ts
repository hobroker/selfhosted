import { Action } from "./types";

export enum ServiceState {
  Installed = "installed",
  NotInstalled = "not-installed",
  UpdateAvailable = "update-available",
}

export enum CommandState {
  Idle,
  Loading,
  Success,
  Error,
}

export const commandStateLabelsMap = {
  [CommandState.Idle]: {
    icon: "⏸️",
    label: "Idle",
  },
  [CommandState.Loading]: {
    icon: "⏳",
    label: "Loading",
  },
  [CommandState.Success]: {
    icon: "✅",
    label: "Success",
  },
  [CommandState.Error]: {
    icon: "❌",
    label: "Error",
  },
};

export const serviceStateLabelsMap = {
  [ServiceState.Installed]: {
    icon: "✅",
    label: "Installed",
  },
  [ServiceState.NotInstalled]: {
    icon: "❌",
    label: "Not Installed",
  },
  [ServiceState.UpdateAvailable]: {
    icon: "⚠️",
    label: "Update Available",
  },
};

export const colors = {
  primary: "#4ade80", // Green 400
  secondary: "#22c55e", // Green 500
  accent: "#10b981", // Emerald 500
  text: "#f8fafc", // Slate 50
  muted: "#94a3b8", // Slate 400
  dim: "#64748b", // Slate 500
  error: "#ef4444", // Red 500
  warning: "#f59e0b", // Amber 500
  success: "#22c55e", // Green 500
  border: "#334155", // Slate 700
  borderActive: "#4ade80", // Green 400
  background: "#000000", // Black
};

export const SECTIONS = {
  sidebar: {},
  details: {},
} as const;

export const ACTIONS = {
  apply: {
    label: "Apply",
    description: "Run helmfile apply for this service",
    shortcut: ["a", "A"],
  },
  ["apply-confirm"]: {
    label: "Confirm Apply",
    description: "Show confirmation modal before applying",
    shortcut: ["a", "A"],
    hidden: true,
  },
  diff: {
    label: "Diff",
    description: "Show helmfile diff for this service",
    shortcut: ["d", "D"],
  },
  help: {
    label: "Help",
    description: "Show help information",
    shortcut: ["?", "/"],
  },
  history: {
    label: "History",
    description: "Show history for this service",
    shortcut: ["h", "H"],
  },
  refresh: {
    label: "Refresh",
    description: "Refresh services",
    shortcut: ["r", "R"],
  },
  destroy: {
    label: "Destroy",
    description: "Destroy this service",
    shortcut: ["x", "X"],
  },
  ["destroy-confirm"]: {
    label: "Confirm Destroy",
    description: "Show confirmation modal before destroying",
    shortcut: ["x", "X"],
    hidden: true,
  },
  logs: {
    label: "Logs",
    description: "Show logs for this service",
    shortcut: ["l", "L"],
  },
} as const satisfies Record<string, Action>;
