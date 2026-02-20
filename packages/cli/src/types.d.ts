import { ServiceState } from "./constants.js";

export interface ServiceInfo {
  id: string;
  name: string;
  category: string;
  path: string;
  localChartVersion: string;
  localAppVersion: string;
  installedChartVersion?: string;
  installedAppVersion?: string;
  state: ServiceState;
}

export interface HelmRelease {
  name: string;
  chart: string;
  app_version: string;
  status: string;
}

export interface Dimensions {
  columns: number;
  rows: number;
}
