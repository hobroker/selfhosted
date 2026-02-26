import { Box, Text } from "ink";
import type { ServiceInfo } from "../types";
import { serviceStateLabelsMap, colors } from "../constants";

interface ServiceItemProps {
  service: ServiceInfo;
  isSelected?: boolean;
}

export const ServiceItem = ({ service, isSelected }: ServiceItemProps) => {
  return (
    <Box key={service.id} paddingRight={1} justifyContent="space-between" width="100%">
      <Box backgroundColor={isSelected ? colors.primary : undefined} flexGrow={1}>
        <Text color={isSelected ? "black" : colors.text} bold={isSelected} wrap="truncate-end">
          {isSelected ? "> " : "  "}
          {service.name}
        </Text>
      </Box>
      <Box flexShrink={0} marginLeft={1}>
        <Text>{serviceStateLabelsMap[service.state].icon}</Text>
      </Box>
    </Box>
  );
};
