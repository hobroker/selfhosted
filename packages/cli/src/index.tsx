#!/usr/bin/env node
import { useEffect, useState } from "react";
import { render, Box, Text, useInput, useApp } from "ink";
import { fetchAllData } from "./services/data.service";
import type { ServiceInfo } from "./types";
import { useDimensions } from "./hooks/useDimensions";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { ServiceDetails } from "./components/ServiceDetails";
import { ErrorBoundary } from "./components/ErrorBoundary";

const App = () => {
  const [services, setServices] = useState<ServiceInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [focus, setFocus] = useState<"sidebar" | "details">("sidebar");
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
    if (input === "q") {
      exit();
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
        <Sidebar
          services={services}
          listLimit={listLimit}
          onSelect={setSelectedId}
          isFocused={focus === "sidebar"}
        />
        <ServiceDetails
          service={selectedService}
          isFocused={focus === "details"}
          height={listLimit}
        />
      </Box>
    </Box>
  );
};

render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
);
