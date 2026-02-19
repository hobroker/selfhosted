import { Box, Text } from "ink";
import { StatusMessage } from "@inkjs/ui";
import type { ServiceInfo } from "../types.d.ts";

interface Props {
  service?: ServiceInfo;
}

export const ServiceDetails = ({ service }: Props) => (
  <Box width="55%" flexDirection="column" paddingX={2} borderStyle="single" borderColor="white">
    {service ? (
      <Box flexDirection="column">
        <Text bold color="green" underline>
          {service.name.toUpperCase()}
        </Text>
        <Box marginTop={1}>
          <Text bold>Category: </Text>
          <Text>{service.category}</Text>
        </Box>
        <Box marginTop={1} width="100%">
          <Text bold>Status: </Text>
          <Box>
            {!service.installedChartVersion ? (
              <Text>❌ Not Installed</Text>
            ) : service.localChartVersion === service.installedChartVersion &&
              service.localAppVersion === service.installedAppVersion ? (
              <Text>✅ Deployed</Text>
            ) : (
              <Text>⚠️ Update Available</Text>
            )}
          </Box>
        </Box>

        <Box marginTop={1} flexDirection="column">
          <Text bold color="yellow">
            Versions Comparison
          </Text>
          <Box marginLeft={2} flexDirection="column" marginTop={1}>
            <Box flexDirection="column" marginBottom={1}>
              <StatusMessage
                variant={
                  service.localChartVersion === service.installedChartVersion
                    ? "success"
                    : "warning"
                }
              >
                Chart: {service.localChartVersion} (Local) vs{" "}
                {service.installedChartVersion || "N/A"} (Installed)
              </StatusMessage>
            </Box>
            <Box flexDirection="column">
              <StatusMessage
                variant={
                  service.localAppVersion === service.installedAppVersion ? "success" : "warning"
                }
              >
                App: {service.localAppVersion} (Local) vs {service.installedAppVersion || "N/A"}{" "}
                (Installed)
              </StatusMessage>
            </Box>
          </Box>
        </Box>

        <Box marginTop={1}>
          <Text bold>Path: </Text>
          <Text dimColor>{service.path}</Text>
        </Box>
      </Box>
    ) : (
      <Text italic>Select a service to see details</Text>
    )}
  </Box>
);
