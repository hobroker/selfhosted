import { useState, useEffect, useMemo } from "react";
import { useInput } from "ink";
import { useFocusManagerContext } from "../contexts/FocusManagerContext";
import { useServicesContext } from "../contexts/ServicesContext";
import { filterServices } from "../utils/filterServices";
import type { ServiceInfo } from "../types";

type CategoryItem = { _category: true; label: string };
export type SidebarItem = ServiceInfo | CategoryItem;

export const isCategoryItem = (item: SidebarItem): item is CategoryItem => "_category" in item;

export const useSidebar = () => {
  const { services, selectService } = useServicesContext();
  const { focus, setFocus, isModalOpen } = useFocusManagerContext();
  const isFocused = focus === "sidebar";

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [prevSearchQuery, setPrevSearchQuery] = useState("");

  const matchedIds = useMemo(() => {
    if (!searchQuery) return null;
    const matches = filterServices(services, searchQuery);
    return new Set(matches.map((s) => s.id));
  }, [services, searchQuery]);

  // When the query changes, jump to the first match (but not when clearing)
  if (prevSearchQuery !== searchQuery) {
    setPrevSearchQuery(searchQuery);
    if (searchQuery && matchedIds) {
      const firstMatchIdx = services.findIndex((s) => matchedIds.has(s.id));
      if (firstMatchIdx !== -1) setSelectedIndex(firstMatchIdx);
    }
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

  useInput((input, key) => {
    if (isModalOpen || (focus !== "sidebar" && focus !== "details")) return;
    if (key.escape) {
      setIsSearching(false);
      setSearchQuery("");
      return;
    }
    if (input === "/" && !isSearching) {
      setIsSearching(true);
      setFocus("sidebar");
      return;
    }
    if (!isSearching) return;
    if (key.backspace || key.delete) {
      setSearchQuery((prev) => prev.slice(0, -1));
      return;
    }
    if (/^[\x20-\x7E]$/.test(input)) {
      setSearchQuery((prev) => prev + input);
    }
  });

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

  return {
    isFocused,
    isModalOpen,
    isSearching,
    searchQuery,
    matchedIds,
    servicesWithCategories,
    displayIndex,
    handleChange,
    clearSearch: () => {
      setIsSearching(false);
      setSearchQuery("");
    },
    onFocus: () => setFocus("sidebar"),
  };
};
