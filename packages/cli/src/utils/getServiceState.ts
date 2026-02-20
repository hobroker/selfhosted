import { ServiceState } from "../constants.js";
import type { ServiceInfo } from "../types.js";

export const getServiceState = (service: ServiceInfo): ServiceState => {
  if (!service.installedChartVersion) {
    return ServiceState.NotInstalled;
  }

  if (
    service.installedChartVersion === service.localChartVersion &&
    (service.localAppVersion === "unknown" ||
      service.installedAppVersion === service.localAppVersion)
  ) {
    return ServiceState.Installed;
  }

  return ServiceState.UpdateAvailable;
};
