import { useState, useEffect, useRef } from "react";
import { Box, Text, useInput, DOMElement } from "ink";
import { useOnMouseEnter, useOnWheel } from "@ink-tools/ink-mouse";
import { ServiceItem } from "./ServiceItem";
import { ErrorBoundary } from "./ui/ErrorBoundary";
import { colors } from "../constants";
import { TitledBox } from "./ui/TitledBox";
import { useFocusManagerContext } from "../contexts/FocusManagerContext";
import { useServicesContext } from "../contexts/ServicesContext";
import { useDimensions } from "../hooks/useDimensions";

export const Sidebar = () => {
  const { services, selectService } = useServicesContext();
  const dimensions = useDimensions();
  const listLimit = Math.max(5, dimensions.rows - 6);
  const { focus, setFocus } = useFocusManagerContext();
  const isFocused = focus === "sidebar";
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);
  const ref = useRef<DOMElement>(null);

  useOnMouseEnter(ref, () => setFocus("sidebar"));

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
      selectService(services[selectedIndex]);
    }
  }, [selectedIndex, services, selectService]);

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
