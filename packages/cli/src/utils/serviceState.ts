import { ServiceState } from "../constants";
import type { ServiceInfo } from "../types";

const stripV = (version?: string) => version?.replace(/^v/, "");

export const getServiceState = (service: ServiceInfo): ServiceState => {
  if (!service.syncStatus) {
    return ServiceState.NotInstalled;
  }

  if (service.syncStatus === "OutOfSync") {
    return ServiceState.UpdateAvailable;
  }

  if (isAppVersionUpToDate(service)) {
    return ServiceState.Installed;
  }

  return ServiceState.UpdateAvailable;
};

export const isServiceChartUpToDate = (service: ServiceInfo) =>
  stripV(service.installedChartVersion) === stripV(service.localChartVersion);

export const isAppVersionUpToDate = (service: ServiceInfo) =>
  isServiceChartUpToDate(service) &&
  (service.localAppVersion === "unknown" ||
    stripV(service.installedAppVersion) === stripV(service.localAppVersion));
