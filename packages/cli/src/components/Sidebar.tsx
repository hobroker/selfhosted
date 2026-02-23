import React, { useState, useEffect, useRef } from "react";
import { Box, Text, useInput, DOMElement } from "ink";
import { useOnMouseEnter, useOnWheel } from "@ink-tools/ink-mouse";
import type { ServiceInfo } from "../types";
import { ServiceItem } from "./ServiceItem/index";
import { ErrorBoundary } from "./ErrorBoundary";
import { colors } from "../constants";
import { TitledBox } from "./TitledBox";

interface Props {
  services: ServiceInfo[];
  listLimit: number;
  onSelect: (service: ServiceInfo) => void;
  isFocused?: boolean;
  onFocus?: (isMouseAction?: boolean) => void;
}

export const Sidebar = ({ services, listLimit, onSelect, isFocused, onFocus }: Props) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const ref = useRef<DOMElement>(null);

  useOnMouseEnter(ref, () => {
    onFocus?.(true);
  });

  useOnWheel(ref, (event) => {
    if (services.length === 0 || !isFocused) return;

    if (event.button === "wheel-up") {
      setSelectedIndex((prev) => {
        const next = Math.max(0, prev - 1);
        if (next < scrollOffset) {
          setScrollOffset(next);
        }
        return next;
      });
    } else if (event.button === "wheel-down") {
      setSelectedIndex((prev) => {
        const next = Math.min(services.length - 1, prev + 1);
        if (next >= scrollOffset + listLimit) {
          setScrollOffset(next - listLimit + 1);
        }
        return next;
      });
    }
  });

  useEffect(() => {
    if (services.length > 0) {
      onSelect(services[selectedIndex]);
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

  const visibleServices = services.slice(scrollOffset, scrollOffset + listLimit);

  return (
    <TitledBox
      ref={ref}
      title="Services"
      isFocused={isFocused}
      width="20%"
      minWidth={30}
      flexDirection="column"
    >
      <ErrorBoundary>
        {services.length === 0 ? (
          <Box padding={1}>
            <Text italic color={colors.dim}>
              No services found
            </Text>
          </Box>
        ) : (
          visibleServices.map((service, index) => {
            const actualIndex = index + scrollOffset;
            const isSelected = actualIndex === selectedIndex;

            return <ServiceItem key={service.id} service={service} isSelected={isSelected} />;
          })
        )}
      </ErrorBoundary>
    </TitledBox>
  );
};
