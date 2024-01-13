export interface ChartSource {
  category: string;
  services: { path: string; service: string }[];
}

export interface ChartService {
  name: string;
  path: string;
  description: string;
  appUrl: string;
}

export interface ChartData {
  category: string;
  services: ChartService[];
}
