import { ServiceState } from "../../../constants.ts";
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
