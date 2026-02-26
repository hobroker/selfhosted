import { useState, useEffect, useRef, useMemo } from "react";
import { Box, Text, DOMElement } from "ink";
import { ServiceItem } from "./ServiceItem";
import { ScrollList } from "./ui/ScrollList";
import { colors } from "../constants";
import { TitledBox } from "./ui/TitledBox";
import { useFocusManagerContext } from "../contexts/FocusManagerContext";
import { useServicesContext } from "../contexts/ServicesContext";
import type { ServiceInfo } from "../types";

type CategoryItem = { _category: true; label: string };
type SidebarItem = ServiceInfo | CategoryItem;

const isCategoryItem = (item: SidebarItem): item is CategoryItem => "_category" in item;

export const Sidebar = () => {
  const { services, selectService } = useServicesContext();
  const { focus, setFocus, isModalOpen } = useFocusManagerContext();
  const isFocused = focus === "sidebar";
  const [selectedIndex, setSelectedIndex] = useState(1);
  const ref = useRef<DOMElement>(null);

  const servicesWithCategories = useMemo((): SidebarItem[] => {
    const result: SidebarItem[] = [];
    let lastCategory = null;
    for (const service of services) {
      if (service.category !== lastCategory) {
        result.push({ _category: true, label: service.category });
        lastCategory = service.category;
      }
      result.push(service);
    }
    return result;
  }, [services]);

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
      {servicesWithCategories.length === 0 ? (
        <Box padding={1}>
          <Text italic color={colors.dim}>
            No services found
          </Text>
        </Box>
      ) : (
        <ScrollList
          id="sidebar"
          ref={ref}
          items={servicesWithCategories}
          selectedIndex={selectedIndex}
          onChange={setSelectedIndex}
          isFocused={isFocused}
          isHidden={isModalOpen}
          onFocus={() => setFocus("sidebar")}
          isCategory={isCategoryItem}
          renderItem={(item, _, isSelected) => {
            if (isCategoryItem(item)) {
              return (
                <Box paddingX={1}>
                  <Text color={colors.dim} bold>
                    {item.label.toUpperCase()}
                  </Text>
                </Box>
              );
            }
            return <ServiceItem service={item} isSelected={isSelected} />;
          }}
        />
      )}
    </TitledBox>
  );
};
