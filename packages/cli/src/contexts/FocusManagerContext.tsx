import {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { MODAL_STATES } from "../constants";
import { FocusState } from "../types";

interface Props {
  children: ReactNode;
  initialFocus?: FocusState;
}

interface FocustManagerContextType {
  focus: FocusState;
  setFocus: Dispatch<SetStateAction<FocusState>>;
  isModalOpen: boolean;
  closeModals: () => void;
}

const FocusManagerContext = createContext<FocustManagerContextType>({
  focus: "sidebar",
  setFocus: () => {},
  isModalOpen: false,
  closeModals: () => {},
});

export const FocusManagerProvider = ({ children, initialFocus = "sidebar" }: Props) => {
  const [focus, setFocus] = useState<FocusState>(initialFocus);
  const isModalOpen = useMemo(() => (MODAL_STATES as readonly string[]).includes(focus), [focus]);
  const [lastFocus, setLastFocus] = useState<FocusState>(initialFocus);

  const setFocusWithHistory = useCallback((nextFocus: SetStateAction<FocusState>) => {
    setFocus((prev) => {
      const newFocus = typeof nextFocus === "function" ? nextFocus(prev) : nextFocus;

      if (newFocus !== prev) {
        setLastFocus(prev);
      }

      return newFocus;
    });
  }, []);

  const closeModals = useCallback(() => {
    setFocus(lastFocus);
  }, [lastFocus]);

  return (
    <FocusManagerContext.Provider
      value={{
        focus,
        setFocus: setFocusWithHistory,
        isModalOpen,
        closeModals,
      }}
    >
      {children}
    </FocusManagerContext.Provider>
  );
};

export const useFocusManagerContext = () => {
  const context = useContext(FocusManagerContext);

  if (!context) {
    throw new Error("useFocusManagerContext must be used within a FocusManagerProvider");
  }

  return context;
};
