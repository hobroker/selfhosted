import { ServiceState } from "./constants";

export interface ServiceInfo {
  id: string;
  name: string;
  namespace: string;
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

export type SectionKey = "sidebar" | "details" | "search";

export type ActionKey =
  | "apply"
  | "apply-confirm"
  | "diff"
  | "help"
  | "history"
  | "refresh"
  | "destroy"
  | "destroy-confirm"
  | "logs";

export type FocusState = SectionKey | ActionKey;

export interface Action {
  label: string;
  description: string;
  shortcut: string[];
  hidden?: boolean;
}
