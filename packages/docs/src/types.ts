export interface RawCategory {
  category: string;
  services: {
    path: string;
    service: string;
  }[];
}

export interface App {
  name: string;
  description: string;
  url: {
    local: string;
    sourceCode: string;
  };
}

export interface ParsedCategory {
  category: string;
  services: App[];
}
