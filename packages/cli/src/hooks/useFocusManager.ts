import { useState, useCallback, useMemo } from "react";
import { FocusState } from "../types";
import { MODAL_STATES } from "../constants";

export const useFocusManager = (initialState: FocusState = "sidebar") => {
  const [focus, setFocusState] = useState<FocusState>(initialState);

  const isModalOpen = useMemo(() => (MODAL_STATES as string[]).includes(focus), [focus]);

  const setFocus = useCallback(
    (nextFocus: FocusState | ((prev: FocusState) => FocusState), isMouseAction = false) => {
      // If a modal is open, ignore mouse focus requests from background elements
      if (isModalOpen && isMouseAction) {
        return;
      }

      if (typeof nextFocus === "function") {
        setFocusState(nextFocus);
      } else {
        setFocusState(nextFocus);
      }
    },
    [isModalOpen],
  );

  const closeModals = useCallback(() => {
    setFocusState("sidebar");
  }, []);

  return {
    focus,
    setFocus,
    isModalOpen,
    closeModals,
  };
};

export type FocusManager = ReturnType<typeof useFocusManager>;
