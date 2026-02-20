import { useState, useEffect } from "react";
import { Box, Text, useInput } from "ink";
import type { ServiceInfo } from "../types";
import { ServiceItem } from "./ServiceItem/index";
import { ErrorBoundary } from "./ErrorBoundary";

interface Props {
  services: ServiceInfo[];
  listLimit: number;
  onSelect: (id: string) => void;
  isFocused?: boolean;
}

export const Sidebar = ({ services, listLimit, onSelect, isFocused }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    if (services.length > 0) {
      onSelect(services[selectedIndex].id);
    }
  }, [selectedIndex, services, onSelect]);

  useInput((_, key) => {
    if (!isFocused) return;

    if (key.upArrow) {
      setSelectedIndex((prev) => {
        const next = Math.max(0, prev - 1);
        if (next < scrollOffset) {
          setScrollOffset(next);
        }
        return next;
      });
    }
    if (key.downArrow) {
      setSelectedIndex((prev) => {
        const next = Math.min(services.length - 1, prev + 1);
        if (next >= scrollOffset + listLimit) {
          setScrollOffset(next - listLimit + 1);
        }
        return next;
      });
    }
  });

  if (services.length === 0) {
    return (
      <Box
        width="20%"
        minWidth={30}
        borderStyle="single"
        borderColor={isFocused ? "blue" : "white"}
        padding={1}
      >
        <Text italic dimColor>
          No services found
        </Text>
      </Box>
    );
  }

  const visibleServices = services.slice(scrollOffset, scrollOffset + listLimit);

  return (
    <Box
      width="20%"
      minWidth={30}
      flexDirection="column"
      borderStyle="single"
      borderColor={isFocused ? "blue" : "gray"}
    >
      <ErrorBoundary>
        {visibleServices.map((service, index) => {
          const actualIndex = index + scrollOffset;
          const isSelected = actualIndex === selectedIndex;

          return <ServiceItem key={service.id} service={service} isSelected={isSelected} />;
        })}
      </ErrorBoundary>
    </Box>
  );
};
