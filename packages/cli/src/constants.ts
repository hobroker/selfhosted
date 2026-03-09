import figures from "figures";
import { Action, ActionKey } from "./types";

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
    icon: figures.bullet,
    label: "Idle",
  },
  [CommandState.Loading]: {
    icon: figures.ellipsis,
    label: "Loading",
  },
  [CommandState.Success]: {
    icon: figures.tick,
    label: "Success",
  },
  [CommandState.Error]: {
    icon: figures.cross,
    label: "Error",
  },
};

export const serviceStateLabelsMap = {
  [ServiceState.Installed]: {
    icon: figures.tick,
    iconColor: "green",
    label: "Installed",
  },
  [ServiceState.NotInstalled]: {
    icon: figures.cross,
    iconColor: "red",
    label: "Not Installed",
  },
  [ServiceState.UpdateAvailable]: {
    icon: figures.warning,
    iconColor: "yellow",
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
  background: "transparent", // Black
};

export const ACTIONS: Record<ActionKey, Action> = {
  sync: {
    label: "Sync",
    description: "Run argocd app sync for this service",
    shortcut: ["S"],
  },
  ["sync-confirm"]: {
    label: "Confirm Sync",
    description: "Show confirmation modal before syncing",
    shortcut: ["S"],
    hidden: true,
  },
  diff: {
    label: "Diff",
    description: "Show argocd app diff for this service",
    shortcut: ["D"],
  },
  help: {
    label: "Help",
    description: "Show help information",
    shortcut: ["?"],
  },
  history: {
    label: "History",
    description: "Show ArgoCD history for this service",
    shortcut: ["H"],
  },
  refresh: {
    label: "Refresh",
    description: "Refresh services",
    shortcut: ["R"],
  },
  destroy: {
    label: "Delete",
    description: "Delete this service via argocd",
    shortcut: ["X"],
  },
  ["destroy-confirm"]: {
    label: "Confirm Delete",
    description: "Show confirmation modal before deleting",
    shortcut: ["X"],
    hidden: true,
  },
  logs: {
    label: "Logs",
    description: "Show logs for this service",
    shortcut: ["L"],
  },
};
