import { ServiceState } from "../constants";
import type { ServiceInfo } from "../types";
import { getServiceState, isAppVersionUpToDate, isServiceChartUpToDate } from "./serviceState";

const base: ServiceInfo = {
  id: "test",
  name: "Test Service",
  namespace: "default",
  category: "Test Category",
  path: "/path/to/service",
  localChartVersion: "1.0.0",
  localAppVersion: "1.2.3",
  state: ServiceState.NotInstalled,
  readme: "",
};

describe("isServiceChartUpToDate", () => {
  it("returns true when versions match exactly", () => {
    expect(isServiceChartUpToDate({ ...base, installedChartVersion: "1.0.0" })).toBe(true);
  });

  it("returns true when versions differ only by v-prefix", () => {
    expect(isServiceChartUpToDate({ ...base, installedChartVersion: "v1.0.0" })).toBe(true);
  });

  it("returns false when versions differ", () => {
    expect(isServiceChartUpToDate({ ...base, installedChartVersion: "0.9.0" })).toBe(false);
  });

  it("returns false when installedChartVersion is missing", () => {
    expect(isServiceChartUpToDate({ ...base })).toBe(false);
  });
});

describe("isAppVersionUpToDate", () => {
  it("returns true when both chart and app versions match", () => {
    expect(
      isAppVersionUpToDate({
        ...base,
        installedChartVersion: "1.0.0",
        installedAppVersion: "1.2.3",
      }),
    ).toBe(true);
  });

  it("returns true when app versions differ only by v-prefix", () => {
    expect(
      isAppVersionUpToDate({
        ...base,
        installedChartVersion: "1.0.0",
        installedAppVersion: "v1.2.3",
      }),
    ).toBe(true);
  });

  it("returns true when localAppVersion is 'unknown'", () => {
    expect(
      isAppVersionUpToDate({
        ...base,
        localAppVersion: "unknown",
        installedChartVersion: "1.0.0",
        installedAppVersion: "anything",
      }),
    ).toBe(true);
  });

  it("returns false when chart version is outdated", () => {
    expect(
      isAppVersionUpToDate({
        ...base,
        installedChartVersion: "0.9.0",
        installedAppVersion: "1.2.3",
      }),
    ).toBe(false);
  });

  it("returns false when app version is outdated", () => {
    expect(
      isAppVersionUpToDate({
        ...base,
        installedChartVersion: "1.0.0",
        installedAppVersion: "1.1.0",
      }),
    ).toBe(false);
  });
});

describe("getServiceState", () => {
  it("returns NotInstalled when installedChartVersion is missing", () => {
    expect(getServiceState({ ...base })).toBe(ServiceState.NotInstalled);
  });

  it("returns Installed when chart versions match exactly", () => {
    expect(
      getServiceState({ ...base, installedChartVersion: "1.0.0", installedAppVersion: "1.2.3" }),
    ).toBe(ServiceState.Installed);
  });

  it("returns Installed when installed has v-prefix and local does not", () => {
    expect(
      getServiceState({ ...base, installedChartVersion: "v1.0.0", installedAppVersion: "1.2.3" }),
    ).toBe(ServiceState.Installed);
  });

  it("returns Installed when local has v-prefix and installed does not", () => {
    expect(
      getServiceState({
        ...base,
        localChartVersion: "v1.0.0",
        installedChartVersion: "1.0.0",
        installedAppVersion: "1.2.3",
      }),
    ).toBe(ServiceState.Installed);
  });

  it("returns Installed when chart versions match and localAppVersion is 'unknown'", () => {
    expect(
      getServiceState({
        ...base,
        localAppVersion: "unknown",
        installedChartVersion: "1.0.0",
        installedAppVersion: "anything",
      }),
    ).toBe(ServiceState.Installed);
  });

  it("returns UpdateAvailable when chart versions differ", () => {
    expect(
      getServiceState({ ...base, installedChartVersion: "0.9.0", installedAppVersion: "1.2.3" }),
    ).toBe(ServiceState.UpdateAvailable);
  });

  it("returns UpdateAvailable when chart versions match but app versions differ", () => {
    expect(
      getServiceState({ ...base, installedChartVersion: "1.0.0", installedAppVersion: "1.1.0" }),
    ).toBe(ServiceState.UpdateAvailable);
  });
});
