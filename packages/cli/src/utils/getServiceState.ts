import { ServiceState } from "../constants";
import type { ServiceInfo } from "../types";

export const getServiceState = (
  service: Pick<
    ServiceInfo,
    "installedChartVersion" | "localChartVersion" | "installedAppVersion" | "localAppVersion"
  >,
): ServiceState => {
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
