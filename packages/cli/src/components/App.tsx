import { useEffect } from "react";
import { Box, Text } from "ink";
import { useDimensions } from "../hooks/useDimensions";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { ServiceDetails } from "./ServiceDetails";
import { Footer } from "./Footer";
import { colors } from "../constants";
import { HelpModal } from "./modals/HelpModal";
import { HistoryModal } from "./modals/HistoryModal";
import { DiffModal } from "./modals/DiffModal";
import { ApplyConfirmModal } from "./modals/ApplyConfirmModal";
import { ApplyModal } from "./modals/ApplyModal";
import { useServices } from "../hooks/useServices";
import { useGlobalInput } from "../hooks/useGlobalInput";
import { FocusManagerProvider, useFocusManagerContext } from "../contexts/FocusManagerContext";

const AppContent = () => {
  const { services, loading, selectedService, selectService } = useServices();
  const { focus } = useFocusManagerContext();
  const dimensions = useDimensions();

  useGlobalInput();

  useEffect(() => {
    // Enter alternate buffer (fullscreen)
    process.stdout.write("\x1b[?1049h");

    return () => {
      // Exit alternate buffer
      process.stdout.write("\x1b[?1049l");
    };
  }, []);

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
        <Sidebar services={services} listLimit={listLimit} onSelect={selectService} />
        <ServiceDetails service={selectedService} />
      </Box>
      <Box height={3}>
        <Footer />
      </Box>

      {focus === "help" && <HelpModal />}
      {focus === "history" && <HistoryModal service={selectedService} />}
      {focus === "diff" && <DiffModal service={selectedService} />}
      {focus === "apply-confirm" && <ApplyConfirmModal service={selectedService} />}
      {focus === "apply" && <ApplyModal service={selectedService} />}
    </Box>
  );
};

export const App = () => {
  return (
    <FocusManagerProvider>
      <AppContent />
    </FocusManagerProvider>
  );
};
