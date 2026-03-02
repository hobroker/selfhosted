import { useEffect, useState } from "react";
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
import { RefreshModal } from "./modals/RefreshModal";
import { DestroyConfirmModal } from "./modals/DestroyConfirmModal";
import { DestroyModal } from "./modals/DestroyModal";
import { LogsModal } from "./modals/LogsModal";
import { useGlobalInput } from "../hooks/useGlobalInput";
import { FocusManagerProvider, useFocusManagerContext } from "../contexts/FocusManagerContext";
import { ServicesProvider, useServicesContext } from "../contexts/ServicesContext";
import { ToolsProvider, useToolsContext } from "../contexts/ToolsContext";
import { ToolsCheckingScreen } from "./screens/ToolsCheckingScreen";
import { MissingToolsScreen } from "./screens/MissingToolsScreen";
import { UnavailableToolsScreen } from "./screens/UnavailableToolsScreen";

const AppContent = () => {
  const { loading, selectedService } = useServicesContext();
  const { focus } = useFocusManagerContext();
  const { ready, missing, unavailable } = useToolsContext();
  const dimensions = useDimensions();
  const [warningDismissed, setWarningDismissed] = useState(false);

  useGlobalInput();

  useEffect(() => {
    // Enter alternate buffer (fullscreen)
    process.stdout.write("\x1b[?1049h");

    return () => {
      // Exit alternate buffer
      process.stdout.write("\x1b[?1049l");
    };
  }, []);

  if (!ready) return <ToolsCheckingScreen />;
  if (missing.length > 0) return <MissingToolsScreen missing={missing} />;
  if (unavailable.length > 0 && !warningDismissed) {
    return (
      <UnavailableToolsScreen
        unavailable={unavailable}
        onDismiss={() => setWarningDismissed(true)}
      />
    );
  }

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

  return (
    <Box flexDirection="column" height={dimensions.rows} width={dimensions.columns}>
      <Box height={3}>
        <Header />
      </Box>

      <Box height={dimensions.rows - 6}>
        <Sidebar />
        <ServiceDetails service={selectedService} />
      </Box>
      <Box height={3}>
        <Footer />
      </Box>

      {focus === "help" && <HelpModal />}
      {focus === "history" && <HistoryModal />}
      {focus === "diff" && <DiffModal />}
      {focus === "apply-confirm" && <ApplyConfirmModal />}
      {focus === "apply" && <ApplyModal />}
      {focus === "refresh" && <RefreshModal />}
      {focus === "destroy-confirm" && <DestroyConfirmModal />}
      {focus === "destroy" && <DestroyModal />}
      {focus === "logs" && <LogsModal />}
    </Box>
  );
};

export const App = () => {
  return (
    <ToolsProvider>
      <FocusManagerProvider>
        <ServicesProvider>
          <AppContent />
        </ServicesProvider>
      </FocusManagerProvider>
    </ToolsProvider>
  );
};
