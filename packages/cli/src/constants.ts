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
