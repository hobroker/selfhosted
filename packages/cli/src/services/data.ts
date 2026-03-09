import type { ServiceInfo } from "../types";
import { getServiceState } from "../utils/serviceState";
import { fetchLocalChart, fetchLocalCharts } from "./charts";
import { fetchArgoApp, fetchArgoApps, fetchPodImage, fetchPodImages } from "./cluster";

export async function fetchAllData(): Promise<ServiceInfo[]> {
  try {
    const [localServices, argoApps, podImages] = await Promise.all([
      fetchLocalCharts(),
      fetchArgoApps(),
      fetchPodImages(),
    ]);

    return localServices
      .map((svc) => {
        const app = argoApps.find((a) => a.name === svc.name);
        if (app) {
          const service = {
            ...svc,
            syncStatus: app.syncStatus,
            installedChartVersion: svc.localChartVersion,
            installedAppVersion: podImages[svc.name] || svc.localAppVersion,
          };
          return {
            ...service,
            state: getServiceState(service),
          };
        }
        return svc;
      })
      .sort((a, b) => {
        if (a.category !== b.category) {
          return a.category.localeCompare(b.category);
        }
        return a.name.localeCompare(b.name);
      });
  } catch (e) {
    console.error("Failed to fetch cluster data", e);
    return [];
  }
}

export async function fetchServiceData(name: string): Promise<ServiceInfo | null> {
  try {
    const [localSvc, app, podImage] = await Promise.all([
      fetchLocalChart(name),
      fetchArgoApp(name),
      fetchPodImage(name),
    ]);

    if (!localSvc) return null;

    const merged = app
      ? {
          ...localSvc,
          syncStatus: app.syncStatus,
          installedChartVersion: localSvc.localChartVersion,
          installedAppVersion: podImage || localSvc.localAppVersion,
        }
      : localSvc;

    return { ...merged, state: getServiceState(merged) };
  } catch (e) {
    console.error(`Failed to refresh service "${name}"`, e);
    return null;
  }
}
