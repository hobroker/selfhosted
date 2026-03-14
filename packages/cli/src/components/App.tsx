import { useEffect, useMemo, useState } from "react";
import { Box } from "ink";
import { useDimensions } from "../hooks/useDimensions";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { ServiceDetails } from "./ServiceDetails";
import { Footer } from "./Footer";
import { HelpModal } from "./modals/HelpModal";
import { HistoryModal } from "./modals/HistoryModal";
import { DiffModal } from "./modals/DiffModal";
import { SyncConfirmModal } from "./modals/SyncConfirmModal";
import { SyncModal } from "./modals/SyncModal";
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
import { Spinner } from "@inkjs/ui";

const AppContent = () => {
  const { loading, selectedService } = useServicesContext();
  const { focus } = useFocusManagerContext();
  const { isReady, missing, unavailable } = useToolsContext();
  const dimensions = useDimensions();
  const [warningDismissed, setWarningDismissed] = useState(false);

  useGlobalInput();

  const inMainView = useMemo(() => {
    const toolsReady = isReady && missing.length === 0;
    const warningsCleared = unavailable.length === 0 || warningDismissed;
    return toolsReady && warningsCleared && !loading;
  }, [isReady, missing.length, unavailable.length, warningDismissed, loading]);

  useEffect(() => {
    if (!inMainView) return;

    process.stdout.write("\x1b[?1049h");
    return () => {
      process.stdout.write("\x1b[?1049l");
    };
  }, [inMainView]);

  if (!isReady) return <ToolsCheckingScreen />;
  if (missing.length > 0) return <MissingToolsScreen />;
  if (unavailable.length > 0 && !warningDismissed) {
    return <UnavailableToolsScreen onDismiss={() => setWarningDismissed(true)} />;
  }

  if (loading) {
    return (
      <Box padding={1}>
        <Spinner label="Loading charts and cluster data..." />
      </Box>
    );
  }

  return (
    <Box flexDirection="column" height={dimensions.rows} width={dimensions.columns}>
      <Box height={3}>
        <Header />
      </Box>

      <Box height={dimensions.rows - 4}>
        <Box width="20%" minWidth={30}>
          <Sidebar />
        </Box>
        <ServiceDetails service={selectedService} />
      </Box>
      <Box height={1}>
        <Footer />
      </Box>

      {focus === "help" && <HelpModal />}
      {focus === "history" && <HistoryModal />}
      {focus === "diff" && <DiffModal />}
      {focus === "sync-confirm" && <SyncConfirmModal />}
      {focus === "sync" && <SyncModal />}
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
