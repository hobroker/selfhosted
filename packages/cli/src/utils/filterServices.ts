import { Fzf } from "fzf";
import type { ServiceInfo } from "../types";

export const filterServices = (services: ServiceInfo[], query: string): ServiceInfo[] => {
  if (!query) return services;
  const fzf = new Fzf(services, {
    selector: (s) => s.name,
    casing: "case-insensitive",
  });
  return fzf.find(query).map((result) => result.item);
};
