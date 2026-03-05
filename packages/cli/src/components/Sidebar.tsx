import { useRef } from "react";
import { Box, Text, DOMElement } from "ink";
import { ServiceItem } from "./ServiceItem";
import { ScrollList } from "./ui/ScrollList";
import { SidebarSearch } from "./ui/SidebarSearch";
import { colors } from "../constants";
import { TitledBox } from "./ui/TitledBox";
import { useSidebar, isCategoryItem } from "../hooks/useSidebar";
import { ClickableItem } from "./ui/ClickableBox";

export const Sidebar = () => {
  const ref = useRef<DOMElement>(null);
  const {
    isFocused,
    isModalOpen,
    searchQuery,
    matchedIds,
    servicesWithCategories,
    displayIndex,
    handleChange,
    clearSearch,
    onFocus,
  } = useSidebar();

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
          onFocus={onFocus}
          isSkip={(item) => isCategoryItem(item) || (!!matchedIds && !matchedIds.has(item.id))}
          renderItem={(item, index, isSelected) => {
            if (isCategoryItem(item)) {
              return (
                <ClickableItem onClick={() => handleChange(index + 1)} paddingX={1}>
                  <Text color={colors.dim} bold>
                    {item.label.toUpperCase()}
                  </Text>
                </ClickableItem>
              );
            }
            return (
              <ServiceItem
                service={item}
                isSelected={isSelected}
                isMatch={matchedIds?.has(item.id)}
                onClick={() => {
                  handleChange(index);
                  clearSearch();
                }}
              />
            );
          }}
        />
      )}
      <SidebarSearch query={searchQuery} />
    </TitledBox>
  );
};
