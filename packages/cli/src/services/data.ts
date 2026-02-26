import type { ServiceInfo } from "../types";
import { getServiceState } from "../utils/getServiceState";
import { fetchLocalChart, fetchLocalCharts } from "./charts";
import { fetchHelmRelease, fetchHelmReleases, fetchPodImage, fetchPodImages } from "./cluster";

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
    const [localSvc, inst, podImage] = await Promise.all([
      fetchLocalChart(name),
      fetchHelmRelease(name),
      fetchPodImage(name),
    ]);

    if (!localSvc) return null;

    const merged = inst
      ? {
          ...localSvc,
          installedChartVersion: inst.chart.split("-").pop(),
          installedAppVersion: podImage || inst.app_version || "unknown",
        }
      : localSvc;

    return { ...merged, state: getServiceState(merged) };
  } catch (e) {
    console.error(`Failed to refresh service "${name}"`, e);
    return null;
  }
}
