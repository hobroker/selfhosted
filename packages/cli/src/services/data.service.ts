import type { ServiceInfo } from "../types.d.ts";
import { getServiceState } from "../utils/getServiceState.ts";
import { fetchLocalCharts } from "./chart.service.ts";
import { fetchHelmReleases, fetchPodImages } from "./cluster.service.ts";

export async function fetchAllData(): Promise<ServiceInfo[]> {
  try {
    const [localServices, installed, podImages] = await Promise.all([
      fetchLocalCharts(),
      fetchHelmReleases(),
      fetchPodImages(),
    ]);

    return localServices
      .map((svc) => {
        const inst = installed.find((i) => i.name === svc.name);
        if (inst) {
          return {
            ...svc,
            installedChartVersion: inst.chart.split("-").pop(),
            installedAppVersion: podImages[svc.name] || inst.app_version || "unknown",
          };
        }
        return svc;
      })
      .map((svc) => ({
        ...svc,
        state: getServiceState(svc),
      }));
  } catch (e) {
    console.error("Failed to fetch cluster data", e);
    return [];
  }
}
