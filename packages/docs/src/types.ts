export interface ChartSource {
  category: string;
  services: { path: string; service: string }[];
}

export interface ChartService {
  name: string;
  description: string;
  url: {
    local: string;
    sourceCode: string;
  };
}

export interface ChartData {
  category: string;
  services: ChartService[];
}
