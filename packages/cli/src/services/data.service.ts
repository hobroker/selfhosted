import type { ServiceInfo } from "../types.d.ts";
import { fetchLocalCharts } from "./chart.service.js";
import { fetchHelmReleases, fetchPodImages } from "./cluster.service.js";

export async function fetchAllData(): Promise<ServiceInfo[]> {
  try {
    const [localServices, installed, podImages] = await Promise.all([
      fetchLocalCharts(),
      fetchHelmReleases(),
      fetchPodImages(),
    ]);

    return localServices.map((svc) => {
      const inst = installed.find((i) => i.name === svc.name);
      if (inst) {
        return {
          ...svc,
          installedChartVersion: inst.chart.split("-").pop(),
          installedAppVersion: podImages[svc.name] || inst.app_version || "unknown",
          status: inst.status,
        };
      }
      return svc;
    });
  } catch (e) {
    console.error("Failed to fetch cluster data", e);
    return [];
  }
}
