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
import { ACTIONS } from "../constants";
import { FocusState } from "../types";

interface Props {
  children: ReactNode;
  initialFocus?: FocusState;
}

interface FocusManagerContextType {
  focus: FocusState;
  setFocus: Dispatch<SetStateAction<FocusState>>;
  isModalOpen: boolean;
  closeModals: () => void;
}

const FocusManagerContext = createContext<FocusManagerContextType | null>(null);

export const FocusManagerProvider = ({ children, initialFocus = "sidebar" }: Props) => {
  const [focus, setFocus] = useState<FocusState>(initialFocus);
  const isModalOpen = useMemo(() => Object.keys(ACTIONS).includes(focus), [focus]);
  const closeModals = useCallback(() => {
    setFocus(initialFocus);
  }, [initialFocus]);

  return (
    <FocusManagerContext.Provider
      value={{
        focus,
        setFocus,
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
