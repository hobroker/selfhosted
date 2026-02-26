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
  // index into `services` (no categories) — never points to a header
  const [selectedIndex, setSelectedIndex] = useState(0);
  const ref = useRef<DOMElement>(null);

  const servicesWithCategories = useMemo((): SidebarItem[] => {
    const result: SidebarItem[] = [];
    let lastCategory: string | null = null;
    for (const service of services) {
      if (service.category !== lastCategory) {
        result.push({ _category: true, label: service.category });
        lastCategory = service.category;
      }
      result.push(service);
    }
    return result;
  }, [services]);

  // display index in servicesWithCategories, derived from services index
  const displayIndex = useMemo(() => {
    const service = services[selectedIndex];
    if (!service) return 0;
    return servicesWithCategories.findIndex(
      (i) => !isCategoryItem(i) && (i as ServiceInfo).id === service.id,
    );
  }, [selectedIndex, services, servicesWithCategories]);

  const handleChange = (displayIdx: number) => {
    const item = servicesWithCategories[displayIdx];
    if (!item || isCategoryItem(item)) return;
    const serviceIdx = services.findIndex((s) => s.id === item.id);
    if (serviceIdx !== -1) setSelectedIndex(serviceIdx);
  };

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
          selectedIndex={displayIndex}
          onChange={handleChange}
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
