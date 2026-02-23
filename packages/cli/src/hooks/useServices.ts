import { useEffect, useState } from "react";
import type { ServiceInfo } from "../types";
import { fetchAllData } from "../services/data.service";

export const useServices = () => {
  const [services, setServices] = useState<ServiceInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<ServiceInfo>();

  useEffect(() => {
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
          setSelectedService(sorted[0]);
        }
      })
      .catch((err) => {
        // Fallback for async errors during initial load
        console.error("Failed to load initial data:", err);
      });
  }, []);

  return {
    services,
    loading,
    selectedService,
    selectService: setSelectedService,
  };
};
