import { Box, Text } from "ink";
import { StatusMessage } from "@inkjs/ui";
import type { ServiceInfo } from "../types";
import { ErrorBoundary } from "./ErrorBoundary";
import { serviceStateLabelsMap } from "../constants";
import { marked } from "marked";
import TerminalRenderer from "marked-terminal";

marked.setOptions({
  renderer: new (TerminalRenderer as any)(),
});

interface Props {
  service?: ServiceInfo;
}

export const ServiceDetails = ({ service }: Props) => (
  <Box flexGrow={1} flexDirection="column" paddingX={2} borderStyle="single" borderColor="white">
    <ErrorBoundary>
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
            <Text>
              {serviceStateLabelsMap[service.state].icon}{" "}
              {serviceStateLabelsMap[service.state].label}
            </Text>
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

          {service.readme ? (
            <ErrorBoundary>
              <Box flexDirection="column" marginTop={1} borderStyle="round" paddingX={1}>
                <Box marginBottom={1}>
                  <Text bold color="cyan">
                    README.md
                  </Text>
                </Box>
                <Text>{marked.parse(service.readme) as string}</Text>
              </Box>
            </ErrorBoundary>
          ) : null}
        </Box>
      ) : (
        <Text italic>Select a service to see details</Text>
      )}
    </ErrorBoundary>
  </Box>
);
