import { useEffect, useRef } from "react";
import { Box, Text, useInput, DOMElement } from "ink";
import { StatusMessage } from "@inkjs/ui";
import { ScrollView, ScrollViewRef } from "ink-scroll-view";
import { useOnMouseEnter, useOnWheel } from "@ink-tools/ink-mouse";
import type { ServiceInfo } from "../types";
import { ErrorBoundary } from "./ErrorBoundary";
import { serviceStateLabelsMap, colors } from "../constants";
import { marked } from "marked";
import TerminalRenderer from "marked-terminal";
import { TitledBox } from "./TitledBox";

marked.setOptions({
  renderer: new (TerminalRenderer as any)(),
});

interface Props {
  service?: ServiceInfo;
  isFocused?: boolean;
  onFocus?: () => void;
}

export const ServiceDetails = ({ service, isFocused, onFocus }: Props) => {
  const scrollViewRef = useRef<ScrollViewRef>(null);
  const ref = useRef<DOMElement>(null);

  useOnMouseEnter(ref, () => {
    onFocus?.();
  });

  useOnWheel(ref, (event) => {
    if (!service || !isFocused) return;
    if (event.button === "wheel-up") {
      scrollViewRef.current?.scrollBy(-2);
    } else if (event.button === "wheel-down") {
      scrollViewRef.current?.scrollBy(2);
    }
  });

  // Reset scroll when service changes
  useEffect(() => {
    scrollViewRef.current?.scrollTo(0);
  }, [service?.id]);

  useInput((_, key) => {
    if (!isFocused || !service) return;

    if (key.upArrow) {
      scrollViewRef.current?.scrollBy(-1);
    }
    if (key.downArrow) {
      scrollViewRef.current?.scrollBy(1);
    }
    if (key.pageUp) {
      scrollViewRef.current?.scrollBy(-10);
    }
    if (key.pageDown) {
      scrollViewRef.current?.scrollBy(10);
    }
    if (key.home) {
      scrollViewRef.current?.scrollTo(0);
    }
    if (key.end) {
      scrollViewRef.current?.scrollToBottom();
    }
  });

  return (
    <TitledBox
      ref={ref}
      title="Details"
      isFocused={isFocused}
      flexGrow={1}
      flexDirection="column"
      paddingX={2}
    >
      <ErrorBoundary>
        {service ? (
          <ScrollView ref={scrollViewRef} flexGrow={1}>
            <Box flexDirection="column">
              <Text bold color={colors.primary} underline>
                {service.name.toUpperCase()}
              </Text>
              <Box marginTop={1}>
                <Text bold color={colors.muted}>
                  Category:{" "}
                </Text>
                <Text color={colors.text}>{service.category}</Text>
              </Box>
              <Box marginTop={1} width="100%">
                <Text bold color={colors.muted}>
                  Status:{" "}
                </Text>
                <Text color={colors.text}>
                  {serviceStateLabelsMap[service.state].icon}{" "}
                  {serviceStateLabelsMap[service.state].label}
                </Text>
              </Box>

              <Box marginTop={1} flexDirection="column">
                <Text bold color={colors.warning}>
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
                      <Text color={colors.text}>
                        Chart: {service.localChartVersion} (Local) vs{" "}
                        {service.installedChartVersion || "N/A"} (Installed)
                      </Text>
                    </StatusMessage>
                  </Box>
                  <Box flexDirection="column">
                    <StatusMessage
                      variant={
                        service.localAppVersion === service.installedAppVersion
                          ? "success"
                          : "warning"
                      }
                    >
                      <Text color={colors.text}>
                        App: {service.localAppVersion} (Local) vs{" "}
                        {service.installedAppVersion || "N/A"} (Installed)
                      </Text>
                    </StatusMessage>
                  </Box>
                </Box>
              </Box>

              <Box marginTop={1} marginBottom={1}>
                <Text bold color={colors.muted}>
                  Path:{" "}
                </Text>
                <Text color={colors.dim}>{service.path}</Text>
              </Box>

              {service.readme ? (
                <ErrorBoundary>
                  <Box flexDirection="column" marginTop={1} borderStyle="round" paddingX={1}>
                    <Box marginBottom={1} justifyContent="space-between">
                      <Text bold color={colors.accent}>
                        README.md
                      </Text>
                    </Box>
                    <Text color={colors.text}>{marked.parse(service.readme) as string}</Text>
                  </Box>
                </ErrorBoundary>
              ) : null}
            </Box>
          </ScrollView>
        ) : (
          <Text italic color={colors.dim}>
            Select a service to see details
          </Text>
        )}
      </ErrorBoundary>
    </TitledBox>
  );
};
