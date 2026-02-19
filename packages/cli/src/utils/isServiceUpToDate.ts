import type { ServiceInfo } from "../types.d.ts";

export const isServiceUpToDate = (service: ServiceInfo) => {
  return (
    service.installedChartVersion === service.localChartVersion &&
    (service.localAppVersion === "unknown" ||
      service.installedAppVersion === service.localAppVersion)
  );
};
