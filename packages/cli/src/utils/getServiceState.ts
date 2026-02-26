import { ServiceState } from "../constants";
import type { ServiceInfo } from "../types";

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
