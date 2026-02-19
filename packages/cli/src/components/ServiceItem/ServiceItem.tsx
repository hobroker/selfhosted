import { Box, Text } from "ink";
import { useServiceStatus } from "./hooks/useServiceStatus.js";
import type { ServiceInfo } from "../../types.d.ts";

interface ServiceItemProps {
  service: ServiceInfo;
  isSelected?: boolean;
}

export const ServiceItem = ({ service, isSelected }: ServiceItemProps) => {
  const { statusLabel } = useServiceStatus({ service });

  return (
    <Box key={service.id} paddingRight={1} justifyContent="space-between">
      <Box backgroundColor={isSelected ? "blue" : undefined} flexGrow={1}>
        <Text color="white" bold={isSelected} wrap="truncate-end">
          {isSelected ? "> " : "  "}
          {service.name}
        </Text>
      </Box>
      <Box flexShrink={0} marginLeft={1}>
        <Text>{statusLabel}</Text>
      </Box>
    </Box>
  );
};
