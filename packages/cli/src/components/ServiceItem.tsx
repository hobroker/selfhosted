import { Box, Text } from "ink";
import type { ServiceInfo } from "../types";
import { serviceStateLabelsMap, colors } from "../constants";

interface ServiceItemProps {
  service: ServiceInfo;
  isSelected?: boolean;
  isMatch?: boolean;
}

export const ServiceItem = ({ service, isSelected, isMatch }: ServiceItemProps) => {
  const isDimmed = isMatch === false && !isSelected;
  return (
    <Box key={service.id} paddingRight={1} justifyContent="space-between" width="100%">
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
