import { useEffect, useState } from "react";
import { render, Box, Text, useInput, useApp } from "ink";
import { fetchAllData } from "./services/data.service.js";
import type { ServiceInfo } from "./types.d.ts";
import { useDimensions } from "./hooks/useDimensions.js";
import { Header } from "./components/Header.js";
import { Sidebar } from "./components/Sidebar.js";
import { ServiceDetails } from "./components/ServiceDetails.js";

const App = () => {
  const [services, setServices] = useState<ServiceInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { exit } = useApp();
  const dimensions = useDimensions();

  useEffect(() => {
    // Enter alternate buffer (fullscreen)
    process.stdout.write("\x1b[?1049h");

    fetchAllData().then((data) => {
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
    });

    return () => {
      // Exit alternate buffer
      process.stdout.write("\x1b[?1049l");
    };
  }, []);

  useInput((input) => {
    if (input === "q") {
      exit();
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
        <Text color="yellow">Loading charts and cluster data...</Text>
      </Box>
    );
  }

  const selectedService = services.find((s) => s.id === selectedId);
  const listLimit = Math.max(5, dimensions.rows - 6);

  return (
    <Box flexDirection="column" height={dimensions.rows} width={dimensions.columns}>
      <Header />

      <Box flexGrow={1}>
        <Sidebar services={services} listLimit={listLimit} onSelect={setSelectedId} />
        <ServiceDetails service={selectedService} />
      </Box>
    </Box>
  );
};

render(<App />);
