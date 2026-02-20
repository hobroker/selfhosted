import { ServiceState } from "../../../constants";
import type { ServiceInfo } from "../../../types";
import { isServiceUpToDate } from "../../../utils/isServiceUpToDate";

interface Props {
  service: ServiceInfo;
}
export function useServiceStatus({ service }: Props) {
  const isUpToDate = isServiceUpToDate(service);

  if (!service.installedChartVersion) {
    return {
      statusLabel: "❌",
      status: ServiceState.NotInstalled,
    };
  }

  if (!isUpToDate) {
    return {
      statusLabel: "⚠️",
      status: ServiceState.UpdateAvailable,
    };
  }

  return {
    statusLabel: "✅",
    status: ServiceState.Installed,
  };
}
