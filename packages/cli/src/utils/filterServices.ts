import { Fzf } from "fzf";
import type { ServiceInfo } from "../types";

export const filterServices = (services: ServiceInfo[], query: string): ServiceInfo[] => {
  const normalizedQuery = query.trim();
  if (!normalizedQuery) return services;
  const fzf = new Fzf(services, {
    selector: (s) => s.name,
    casing: "case-insensitive",
  });
  return fzf.find(normalizedQuery).map((result) => result.item);
};
