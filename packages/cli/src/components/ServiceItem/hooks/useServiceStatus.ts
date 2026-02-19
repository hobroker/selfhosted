import type { ServiceInfo } from "../../../types.d.ts";

interface Props {
  service: ServiceInfo;
}
export function useServiceStatus({ service }: Props) {
  const isUpToDate =
    service.installedChartVersion === service.localChartVersion &&
    service.installedAppVersion === service.localAppVersion;

  if (!service.installedChartVersion) {
    return {
      statusLabel: "❌",
    };
  }

  if (!isUpToDate) {
    return {
      statusLabel: "⚠️",
    };
  }

  return {
    statusLabel: "✅",
  };
}
