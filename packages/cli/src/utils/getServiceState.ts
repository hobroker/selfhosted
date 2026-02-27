import { ServiceState } from "../constants";
import type { ServiceInfo } from "../types";

export const getServiceState = (service: ServiceInfo): ServiceState => {
  if (!service.installedChartVersion) {
    return ServiceState.NotInstalled;
  }

  if (
    service.installedChartVersion === service.localChartVersion ||
    service.installedAppVersion === service.localAppVersion ||
    service.installedChartVersion === service.installedAppVersion
  ) {
    return ServiceState.Installed;
  }

  return ServiceState.UpdateAvailable;
};
