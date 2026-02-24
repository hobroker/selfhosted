import React, { useEffect, useRef, useState } from "react";
import { Box, Text, DOMElement } from "ink";
import { StatusMessage } from "@inkjs/ui";
import { ScrollView } from "ink-scroll-view";

import type { ServiceInfo } from "../types";
import { ErrorBoundary } from "./ErrorBoundary";
import { serviceStateLabelsMap, colors } from "../constants";
import { marked } from "marked";
import TerminalRenderer from "marked-terminal";
import { TitledBox } from "./TitledBox";
import { useScrollViewRef } from "../hooks/useScrollViewRef";

marked.setOptions({
  renderer: new (TerminalRenderer as any)(),
});

interface Props {
  service?: ServiceInfo;
  isFocused?: boolean;
  onFocus?: () => void;
}

export const ServiceDetails = ({ service, isFocused, onFocus }: Props) => {
  const ref = useRef<DOMElement>(null);
  const scrollViewRef = useScrollViewRef({
    ref,
    isFocused: isFocused && !!service,
    onFocus,
  });

  const [scrollInfo, setScrollInfo] = useState({ offset: 0, contentHeight: 0, viewportHeight: 0 });
  const canScrollDown =
    scrollInfo.contentHeight > scrollInfo.viewportHeight &&
    scrollInfo.offset < scrollInfo.contentHeight - scrollInfo.viewportHeight;

  // Reset scroll when service changes
  useEffect(() => {
    scrollViewRef.current?.scrollTo(0);
  }, [scrollViewRef, service]);

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
          <>
            <ScrollView
              ref={scrollViewRef}
              flexGrow={1}
              onScroll={(offset) => setScrollInfo((s) => ({ ...s, offset }))}
              onContentHeightChange={(height) =>
                setScrollInfo((s) => ({ ...s, contentHeight: height }))
              }
              onViewportSizeChange={(size) =>
                setScrollInfo((s) => ({ ...s, viewportHeight: size.height }))
              }
            >
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
            {canScrollDown && <Text>More here</Text>}
          </>
        ) : (
          <Text italic color={colors.dim}>
            Select a service to see details
          </Text>
        )}
      </ErrorBoundary>
    </TitledBox>
  );
};
