import { Box, DOMElement, Text } from "ink";
import type { ServiceInfo } from "../types";
import { serviceStateLabelsMap, colors } from "../constants";
import { useRef } from "react";
import { useOnClick } from "@ink-tools/ink-mouse";

interface ServiceItemProps {
  service: ServiceInfo;
  isSelected?: boolean;
  isMatch?: boolean;
  onClick?: () => void;
}

export const ServiceItem = ({ service, isSelected, isMatch, onClick }: ServiceItemProps) => {
  const isDimmed = isMatch === false && !isSelected;
  const ref = useRef<DOMElement>(null);

  useOnClick(ref, () => onClick?.());

  return (
    <Box ref={ref} paddingRight={1} justifyContent="space-between" width="100%">
      <Box backgroundColor={isSelected ? colors.primary : undefined} flexGrow={1}>
        <Text
          color={isSelected ? "black" : isDimmed ? colors.dim : colors.text}
          bold={isSelected}
          wrap="truncate-end"
        >
          {isSelected ? "> " : "  "}
          {service.name}
        </Text>
      </Box>
      <Box flexShrink={0} marginLeft={1}>
        <Text color={serviceStateLabelsMap[service.state].iconColor}>
          {serviceStateLabelsMap[service.state].icon}
        </Text>
      </Box>
    </Box>
  );
};
