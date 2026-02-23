import { useEffect, useState } from "react";
import { Box, Text, useInput, useApp } from "ink";
import type { ServiceInfo } from "../types";
import { useDimensions } from "../hooks/useDimensions";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { ServiceDetails } from "./ServiceDetails";
import { fetchAllData } from "../services/data.service";
import { Footer } from "./Footer";
import { colors } from "../constants";
import { HelpModal } from "./HelpModal";

export const App = () => {
  const [services, setServices] = useState<ServiceInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [focus, setFocus] = useState<"sidebar" | "details">("sidebar");
  const [showHelp, setShowHelp] = useState(false);
  const { exit } = useApp();
  const dimensions = useDimensions();

  useEffect(() => {
    // Enter alternate buffer (fullscreen)
    process.stdout.write("\x1b[?1049h");

    fetchAllData()
      .then((data) => {
        const sorted = data.sort((a, b) => {
          if (a.category !== b.category) {
            return a.category.localeCompare(b.category);
          }
          return a.name.localeCompare(b.name);
        });
        setServices(sorted);
        setLoading(false);
        if (sorted.length > 0) {
          setSelectedId(sorted[0].id);
        }
      })
      .catch((err) => {
        // Fallback for async errors during initial load
        console.error("Failed to load initial data:", err);
      });

    return () => {
      // Exit alternate buffer
      process.stdout.write("\x1b[?1049l");
    };
  }, []);

  useInput((input, key) => {
    if (showHelp) {
      setShowHelp(false);
      return;
    }

    if (input === "q") {
      exit();
    }

    if (input === "?") {
      setShowHelp(true);
    }

    if (key.tab || key.rightArrow || key.leftArrow) {
      setFocus((prev) => (prev === "sidebar" ? "details" : "sidebar"));
    }
  });

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

  const selectedService = services.find((s) => s.id === selectedId);
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
          onSelect={setSelectedId}
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
        <Footer onShowHelp={() => setShowHelp(true)} />
      </Box>

      {showHelp && <HelpModal />}
    </Box>
  );
};
