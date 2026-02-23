export enum ServiceState {
  Installed = "installed",
  NotInstalled = "not-installed",
  UpdateAvailable = "update-available",
}

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

