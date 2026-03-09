import type { ServiceInfo } from "../types";
import { fetchLocalChart, fetchLocalCharts } from "./charts";
import { fetchArgoApp, fetchArgoApps } from "./cluster";

export async function fetchAllData(): Promise<ServiceInfo[]> {
  try {
    const [localServices, argoApps] = await Promise.all([fetchLocalCharts(), fetchArgoApps()]);

    return localServices
      .map((svc) => {
        const app = argoApps.find((a) => a.name === svc.name);
        if (app) {
          return {
            ...svc,
            syncStatus: app.syncStatus,
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
    const [localSvc, app] = await Promise.all([fetchLocalChart(name), fetchArgoApp(name)]);

    if (!localSvc) return null;

    return app
      ? {
          ...localSvc,
          syncStatus: app.syncStatus,
        }
      : localSvc;
  } catch (e) {
    console.error(`Failed to refresh service "${name}"`, e);
    return null;
  }
}
