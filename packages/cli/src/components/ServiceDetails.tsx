import { useEffect, useRef } from "react";
import { Box, Text, DOMElement } from "ink";

import type { ServiceInfo } from "../types";
import { ErrorBoundary } from "./ui/ErrorBoundary";
import { syncStatusLabelsMap, colors } from "../constants";
import { marked } from "marked";
import TerminalRenderer from "marked-terminal";
import { TitledBox } from "./ui/TitledBox";
import { ScrollContainer } from "./ui/ScrollContainer";
import { ScrollViewRef } from "ink-scroll-view";
import { useFocusManagerContext } from "../contexts/FocusManagerContext";

marked.setOptions({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderer: new TerminalRenderer() as any,
});

interface Props {
  service?: ServiceInfo;
}

export const ServiceDetails = ({ service }: Props) => {
  const { focus, setFocus, isModalOpen } = useFocusManagerContext();
  const isFocused = focus === "details";
  const ref = useRef<DOMElement>(null);
  const scrollViewRef = useRef<ScrollViewRef>(null);

  // Reset scroll when service changes
  useEffect(() => {
    scrollViewRef.current?.scrollTo(0);
  }, [scrollViewRef, service]);

  return (
    <TitledBox ref={ref} title="Details" isFocused={isFocused}>
      {service ? (
        <ScrollContainer
          ref={ref}
          id="details"
          scrollViewRef={scrollViewRef}
          isFocused={isFocused && !!service}
          isHidden={isModalOpen}
          onFocus={() => setFocus("details")}
        >
          <Box flexDirection="column" paddingX={2} gap={1}>
            <Box>
              <Text bold color={colors.primary} underline>
                {service.name}
              </Text>
            </Box>
            <Box>
              <Text bold color={colors.muted}>
                Category:{" "}
              </Text>
              <Text color={colors.text}>{service.category}</Text>
            </Box>
            <Box>
              <Text bold color={colors.muted}>
                Status:{" "}
              </Text>
              <Text color={syncStatusLabelsMap[service.syncStatus].iconColor}>
                {syncStatusLabelsMap[service.syncStatus].icon}
              </Text>
              <Text color={colors.text}> {syncStatusLabelsMap[service.syncStatus].label}</Text>
            </Box>
            <Box>
              <Text bold color={colors.muted}>
                Path:{" "}
              </Text>
              <Text color={colors.dim}>{service.path}</Text>
            </Box>

            {service.readme ? (
              <ErrorBoundary>
                <Box flexDirection="column" borderStyle="round" paddingX={1}>
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
        </ScrollContainer>
      ) : (
        <Text italic color={colors.dim}>
          Select a service to see details
        </Text>
      )}
    </TitledBox>
  );
};
