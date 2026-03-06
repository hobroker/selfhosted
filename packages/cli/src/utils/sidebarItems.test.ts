import { ServiceState } from "../constants";
import type { ServiceInfo } from "../types";
import { isCategoryItem, buildServicesWithCategories, getDisplayIndex } from "./sidebarItems";

const makeService = (name: string, category: string): ServiceInfo => ({
  id: name.toLowerCase(),
  name,
  namespace: "default",
  category,
  path: `/path/${name}`,
  localChartVersion: "1.0.0",
  localAppVersion: "1.0.0",
  state: ServiceState.NotInstalled,
  readme: "",
});

const plex = makeService("Plex", "Media");
const jellyfin = makeService("Jellyfin", "Media");
const nextcloud = makeService("Nextcloud", "Storage");

describe("isCategoryItem", () => {
  it("returns true for category items", () => {
    expect(isCategoryItem({ _category: true, label: "Media" })).toBe(true);
  });

  it("returns false for service items", () => {
    expect(isCategoryItem(plex)).toBe(false);
  });
});

describe("buildServicesWithCategories", () => {
  it("returns empty array for no services", () => {
    expect(buildServicesWithCategories([])).toEqual([]);
  });

  it("inserts a category header before each group", () => {
    const result = buildServicesWithCategories([plex, jellyfin, nextcloud]);
    expect(result).toEqual([
      { _category: true, label: "Media" },
      plex,
      jellyfin,
      { _category: true, label: "Storage" },
      nextcloud,
    ]);
  });

  it("does not repeat category header for consecutive services in the same category", () => {
    const result = buildServicesWithCategories([plex, jellyfin]);
    const categoryHeaders = result.filter(isCategoryItem);
    expect(categoryHeaders).toHaveLength(1);
  });

  it("inserts a new header when category changes", () => {
    const result = buildServicesWithCategories([plex, nextcloud]);
    expect(result).toEqual([
      { _category: true, label: "Media" },
      plex,
      { _category: true, label: "Storage" },
      nextcloud,
    ]);
  });
});

describe("getDisplayIndex", () => {
  const services = [plex, jellyfin, nextcloud];
  const withCategories = buildServicesWithCategories(services);
  // withCategories: [Media, plex, jellyfin, Storage, nextcloud]

  it("returns the display position of the selected service", () => {
    expect(getDisplayIndex(services, withCategories, 0)).toBe(1); // plex is at index 1
    expect(getDisplayIndex(services, withCategories, 1)).toBe(2); // jellyfin is at index 2
    expect(getDisplayIndex(services, withCategories, 2)).toBe(4); // nextcloud is at index 4
  });

  it("returns 0 when selectedIndex is out of bounds", () => {
    expect(getDisplayIndex(services, withCategories, 99)).toBe(0);
  });

  it("returns 0 for empty services", () => {
    expect(getDisplayIndex([], [], 0)).toBe(0);
  });
});
