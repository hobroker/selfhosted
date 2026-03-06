import type { ServiceInfo } from "../types";

type CategoryItem = { _category: true; label: string };
export type SidebarItem = ServiceInfo | CategoryItem;

export const isCategoryItem = (item: SidebarItem): item is CategoryItem => "_category" in item;

export const buildServicesWithCategories = (services: ServiceInfo[]): SidebarItem[] => {
  const result: SidebarItem[] = [];
  let lastCategory: string | null = null;
  for (const service of services) {
    if (service.category !== lastCategory) {
      result.push({ _category: true, label: service.category });
      lastCategory = service.category;
    }
    result.push(service);
  }
  return result;
};

export const getDisplayIndex = (
  services: ServiceInfo[],
  servicesWithCategories: SidebarItem[],
  selectedIndex: number,
): number => {
  const service = services[selectedIndex];
  if (!service) return 0;
  return servicesWithCategories.findIndex(
    (item) => !isCategoryItem(item) && item.id === service.id,
  );
};
