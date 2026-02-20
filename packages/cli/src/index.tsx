import { useEffect, useState } from "react";
import { render, Box, Text, useInput, useApp } from "ink";
import { fetchAllData } from "./services/data.service.ts";
import type { ServiceInfo } from "./types.d.ts";
import useStdoutDimensions from "ink-use-stdout-dimensions";
import { Header } from "./components/Header.tsx";
import { Sidebar } from "./components/Sidebar.tsx";
import { ServiceDetails } from "./components/ServiceDetails/index.ts";

const App = () => {
  const [services, setServices] = useState<ServiceInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { exit } = useApp();
  const [columns, rows] = useStdoutDimensions();

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
      <Box padding={1} height={rows} width={columns} justifyContent="center" alignItems="center">
        <Text color="yellow">Loading charts and cluster data...</Text>
      </Box>
    );
  }

  const selectedService = services.find((s) => s.id === selectedId);
  const listLimit = Math.max(5, rows - 6);

  return (
    <Box flexDirection="column" height={rows} width={columns}>
      <Header />

      <Box flexGrow={1}>
        <Sidebar services={services} listLimit={listLimit} onSelect={setSelectedId} />
        <ServiceDetails service={selectedService} />
      </Box>
    </Box>
  );
};

render(<App />);
