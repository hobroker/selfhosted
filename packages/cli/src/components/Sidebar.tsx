import { useState, useEffect, useRef } from "react";
import { Box, Text, DOMElement } from "ink";
import { ServiceItem } from "./ServiceItem";
import { ScrollList } from "./ui/ScrollList";
import { colors } from "../constants";
import { TitledBox } from "./ui/TitledBox";
import { useFocusManagerContext } from "../contexts/FocusManagerContext";
import { useServicesContext } from "../contexts/ServicesContext";

export const Sidebar = () => {
  const { services, selectService } = useServicesContext();
  const { focus, setFocus, isModalOpen } = useFocusManagerContext();
  const isFocused = focus === "sidebar";
  const [selectedIndex, setSelectedIndex] = useState(0);
  const ref = useRef<DOMElement>(null);

  useEffect(() => {
    if (services.length > 0) {
      selectService(services[selectedIndex]);
    }
  }, [selectedIndex, services, selectService]);

  return (
    <TitledBox
      ref={ref}
      title="Services"
      isFocused={isFocused}
      width="20%"
      minWidth={30}
      flexDirection="column"
    >
      {services.length === 0 ? (
        <Box padding={1}>
          <Text italic color={colors.dim}>
            No services found
          </Text>
        </Box>
      ) : (
        <ScrollList
          ref={ref}
          items={services}
          selectedIndex={selectedIndex}
          onChange={setSelectedIndex}
          isFocused={isFocused}
          isHidden={isModalOpen}
          onFocus={() => setFocus("sidebar")}
          renderItem={(service, _, isSelected) => (
            <ServiceItem key={service.id} service={service} isSelected={isSelected} />
          )}
        />
      )}
    </TitledBox>
  );
};
