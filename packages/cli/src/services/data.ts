import type { ServiceInfo } from "../types";
import { getServiceState } from "../utils/getServiceState";
import { fetchLocalCharts } from "./charts";
import { fetchHelmReleases, fetchPodImages } from "./cluster";

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

export async function fetchServiceData(name: string): Promise<ServiceInfo | null> {
  try {
    const [localServices, installed, podImages] = await Promise.all([
      fetchLocalCharts(),
      fetchHelmReleases(),
      fetchPodImages(),
    ]);

    const localSvc = localServices.find((s) => s.name === name);
    if (!localSvc) return null;

    const inst = installed.find((i) => i.name === name);
    const merged = inst
      ? {
          ...localSvc,
          installedChartVersion: inst.chart.split("-").pop(),
          installedAppVersion: podImages[name] || inst.app_version || "unknown",
        }
      : localSvc;

    return { ...merged, state: getServiceState(merged) };
  } catch (e) {
    console.error(`Failed to refresh service "${name}"`, e);
    return null;
  }
}
