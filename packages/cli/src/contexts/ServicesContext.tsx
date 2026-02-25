import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { ServiceInfo } from "../types";
import { fetchAllData, fetchServiceData } from "../services/data";

interface ServicesContextType {
  services: ServiceInfo[];
  loading: boolean;
  selectedService: ServiceInfo | undefined;
  selectService: (service: ServiceInfo) => void;
  refreshService: (name: string) => Promise<void>;
}

const ServicesContext = createContext<ServicesContextType>({
  services: [],
  loading: true,
  selectedService: undefined,
  selectService: () => {},
  refreshService: async () => {},
});

interface Props {
  children: ReactNode;
}

export const ServicesProvider = ({ children }: Props) => {
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
        console.error("Failed to load initial data:", err);
      });
  }, []);

  const refreshService = useCallback(async (name: string) => {
    const updated = await fetchServiceData(name);
    if (updated) {
      setServices((prev) => prev.map((s) => (s.name === name ? updated : s)));
      setSelectedService((prev) => (prev?.name === name ? updated : prev));
    }
  }, []);

  return (
    <ServicesContext.Provider
      value={{
        services,
        loading,
        selectedService,
        selectService: setSelectedService,
        refreshService,
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export const useServicesContext = () => {
  const context = useContext(ServicesContext);

  if (!context) {
    throw new Error("useServicesContext must be used within a ServicesProvider");
  }

  return context;
};
