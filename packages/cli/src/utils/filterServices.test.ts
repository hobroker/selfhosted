import type { ServiceInfo } from "../types";
import { filterServices } from "./filterServices";
import { ServiceState } from "../constants";

const makeService = (name: string): ServiceInfo => ({
  id: name.toLowerCase().replace(/\s+/g, "-"),
  name,
  namespace: "default",
  category: "Test",
  path: `/path/${name}`,
  localChartVersion: "1.0.0",
  localAppVersion: "1.0.0",
  state: ServiceState.NotInstalled,
  readme: "",
});

const services = [
  makeService("Plex"),
  makeService("Jellyfin"),
  makeService("Nextcloud"),
  makeService("Portainer"),
];

describe("filterServices", () => {
  it("returns all services when query is empty", () => {
    expect(filterServices(services, "")).toEqual(services);
  });

  it("returns matching services by name", () => {
    expect(filterServices(services, "plex")).toEqual([services[0]]);
  });

  it("is case-insensitive", () => {
    expect(filterServices(services, "JELLY")).toEqual([services[1]]);
  });

  it("matches partial names", () => {
    expect(filterServices(services, "cloud")).toEqual([services[2]]);
  });

  it("returns multiple matches", () => {
    expect(filterServices(services, "p")).toEqual([services[0], services[3]]);
  });

  it("returns empty array when nothing matches", () => {
    expect(filterServices(services, "zzz")).toEqual([]);
  });

  it("returns empty array when services list is empty", () => {
    expect(filterServices([], "plex")).toEqual([]);
  });
});
