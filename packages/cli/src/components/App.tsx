import { useEffect, useState } from "react";
import { Box, Text } from "ink";
import { useDimensions } from "../hooks/useDimensions";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { ServiceDetails } from "./ServiceDetails";
import { Footer } from "./Footer";
import { colors } from "../constants";
import { HelpModal } from "./HelpModal";
import { HistoryModal } from "./HistoryModal";
import { useServices } from "../hooks/useServices";
import { useGlobalInput } from "../hooks/useGlobalInput";
import { FocusState } from "../types";

export const App = () => {
  const { services, loading, selectedService, selectService } = useServices();
  const [focus, setFocus] = useState<FocusState>("sidebar");
  const dimensions = useDimensions();
  const onShowHelp = () => {
    setFocus("help");
  };
  const onShowHistory = () => {
    setFocus("history");
  };

  useEffect(() => {
    // Enter alternate buffer (fullscreen)
    process.stdout.write("\x1b[?1049h");

    return () => {
      // Exit alternate buffer
      process.stdout.write("\x1b[?1049l");
    };
  }, []);

  useGlobalInput({ focus, setFocus });

  if (loading) {
    return (
      <Box
        padding={1}
        height={dimensions.rows}
        width={dimensions.columns}
        justifyContent="center"
        alignItems="center"
      >
        <Text color={colors.warning}>Loading charts and cluster data...</Text>
      </Box>
    );
  }

  const listLimit = Math.max(5, dimensions.rows - 6);

  return (
    <Box flexDirection="column" height={dimensions.rows} width={dimensions.columns}>
      <Box height={3}>
        <Header />
      </Box>

      <Box height={dimensions.rows - 6}>
        <Sidebar
          services={services}
          listLimit={listLimit}
          onSelect={selectService}
          isFocused={focus === "sidebar"}
          onFocus={() => setFocus("sidebar")}
        />
        <ServiceDetails
          service={selectedService}
          isFocused={focus === "details"}
          onFocus={() => setFocus("details")}
        />
      </Box>
      <Box height={3}>
        <Footer onShowHelp={onShowHelp} onShowHistory={onShowHistory} />
      </Box>

      {focus === "help" && <HelpModal />}
      {focus === "history" && <HistoryModal service={selectedService} />}
    </Box>
  );
};
