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
  syncStatus?: string;
  state: ServiceState;
  readme?: string;
}

export interface ArgoApp {
  name: string;
  syncStatus: string;
  healthStatus: string;
}

export interface Dimensions {
  columns: number;
  rows: number;
}

export type SectionKey = "sidebar" | "details";

export type ActionKey =
  | "sync"
  | "sync-confirm"
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
