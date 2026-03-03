import { ServiceState } from "../constants";
import type { ServiceInfo } from "../types";
import { getServiceState } from "./getServiceState";

const base: Pick<
  ServiceInfo,
  "installedChartVersion" | "localChartVersion" | "installedAppVersion" | "localAppVersion"
> = {
  localChartVersion: "1.0.0",
  localAppVersion: "1.2.3",
};

describe("getServiceState", () => {
  it("returns NotInstalled when installedChartVersion is missing", () => {
    expect(getServiceState({ ...base })).toBe(ServiceState.NotInstalled);
  });
});
