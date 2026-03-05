import { useState, useEffect, useRef, useMemo, SetStateAction } from "react";
import { Box, Text, DOMElement, useInput } from "ink";
import { ServiceItem } from "./ServiceItem";
import { ScrollList } from "./ui/ScrollList";
import { SidebarSearch } from "./ui/SidebarSearch";
import { colors } from "../constants";
import { TitledBox } from "./ui/TitledBox";
import { useFocusManagerContext } from "../contexts/FocusManagerContext";
import { useServicesContext } from "../contexts/ServicesContext";
import { filterServices } from "../utils/filterServices";
import type { ServiceInfo } from "../types";

type CategoryItem = { _category: true; label: string };
type SidebarItem = ServiceInfo | CategoryItem;

const isCategoryItem = (item: SidebarItem): item is CategoryItem => "_category" in item;

export const Sidebar = () => {
  const { services, selectService } = useServicesContext();
  const { focus, setFocus, isModalOpen } = useFocusManagerContext();
  const isFocused = focus === "sidebar";
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [prevSearchQuery, setPrevSearchQuery] = useState("");
  const ref = useRef<DOMElement>(null);

  const matchedIds = useMemo(() => {
    if (!searchQuery) return null;
    const matches = filterServices(services, searchQuery);
    return new Set(matches.map((s) => s.id));
  }, [services, searchQuery]);

  // When the query changes, reset selection to the first match
  if (prevSearchQuery !== searchQuery) {
    setPrevSearchQuery(searchQuery);
    const firstMatchIdx = matchedIds ? services.findIndex((s) => matchedIds.has(s.id)) : 0;
    setSelectedIndex(Math.max(0, firstMatchIdx));
  }

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

  const effectiveIndex = selectedIndex;

  useInput((input, key) => {
    if (isModalOpen || (focus !== "sidebar" && focus !== "details")) return;
    const updateSearchQuery = (value: SetStateAction<string>) => {
      setSearchQuery(value);
      setFocus("sidebar");
    };
    if (key.escape) {
      updateSearchQuery("");
      return;
    }
    if (key.backspace || key.delete) {
      updateSearchQuery((prev) => prev.slice(0, -1));
      return;
    }
    if (/^[a-z]$/.test(input)) {
      updateSearchQuery((prev) => prev + input);
    }
  });

  useEffect(() => {}, [searchQuery]);

  // display index in servicesWithCategories, derived from services index
  const displayIndex = useMemo(() => {
    const service = services[effectiveIndex];
    if (!service) return 0;
    return servicesWithCategories.findIndex(
      (i) => !isCategoryItem(i) && (i as ServiceInfo).id === service.id,
    );
  }, [effectiveIndex, services, servicesWithCategories]);

  const handleChange = (displayIdx: number) => {
    const item = servicesWithCategories[displayIdx];
    if (!item || isCategoryItem(item)) return;
    const serviceIdx = services.findIndex((s) => s.id === item.id);
    if (serviceIdx !== -1) setSelectedIndex(serviceIdx);
  };

  useEffect(() => {
    if (services.length > 0) {
      selectService(services[effectiveIndex]);
    }
  }, [effectiveIndex, services, selectService]);

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
          isSkip={(item) => !isCategoryItem(item) && !!matchedIds && !matchedIds.has(item.id)}
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
            return (
              <ServiceItem
                service={item}
                isSelected={isSelected}
                isMatch={matchedIds?.has(item.id)}
              />
            );
          }}
        />
      )}
      <SidebarSearch query={searchQuery} />
    </TitledBox>
  );
};
