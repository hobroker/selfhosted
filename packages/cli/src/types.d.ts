import { ServiceState, MODAL_STATES, MAIN_VIEW_STATES } from "./constants";

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
  readme?: string;
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

export type FocusState = (typeof MODAL_STATES)[number] | (typeof MAIN_VIEW_STATES)[number];
