import type { ServiceInfo } from "../types";

export const filterServices = (services: ServiceInfo[], query: string): ServiceInfo[] => {
  if (!query) return services;
  const q = query.toLowerCase();
  return services.filter((s) => s.name.toLowerCase().includes(q));
};
