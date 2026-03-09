import { ArgoSyncStatus } from "../constants";
import type { ServiceInfo } from "../types";
import { filterServices } from "./filterServices";

const makeService = (name: string): ServiceInfo => ({
  id: name.toLowerCase().replace(/\s+/g, "-"),
  name,
  namespace: "default",
  category: "Test",
  path: `/path/${name}`,
  syncStatus: ArgoSyncStatus.Unknown,
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

  it("matches fuzzy patterns (non-contiguous characters)", () => {
    expect(filterServices(services, "plx")).toEqual([services[0]]);
    expect(filterServices(services, "ncld")).toEqual([services[2]]);
  });

  it("ranks better matches above weaker ones", () => {
    // "port" is a stronger match for "Portainer" than for "Plex"
    const results = filterServices(services, "port");
    expect(results[0]).toEqual(services[3]);
  });
});
