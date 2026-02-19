import { ServiceStatus } from "../../../constants.ts";
import type { ServiceInfo } from "../../../types.d.ts";
import { isServiceUpToDate } from "../../../utils/isServiceUpToDate.ts";

interface Props {
  service: ServiceInfo;
}
export function useServiceStatus({ service }: Props) {
  const isUpToDate = isServiceUpToDate(service);

  if (!service.installedChartVersion) {
    return {
      statusLabel: "❌",
      status: ServiceStatus.NotInstalled,
    };
  }

  if (!isUpToDate) {
    return {
      statusLabel: "⚠️",
      status: ServiceStatus.UpdateAvailable,
    };
  }

  return {
    statusLabel: "✅",
    status: ServiceStatus.Installed,
  };
}
