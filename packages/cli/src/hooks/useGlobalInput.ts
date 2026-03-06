import { useRef } from "react";
import { useApp, useInput } from "ink";
import { ACTIONS } from "../constants";
import { useFocusManagerContext } from "../contexts/FocusManagerContext";

export const useGlobalInput = () => {
  const { exit } = useApp();
  const { focus, setFocus, isModalOpen, closeModals } = useFocusManagerContext();
  const lastEscapeAt = useRef(0);

  useInput((input, key) => {
    if (isModalOpen) {
      lastEscapeAt.current = 0;
      const currentModalShortcut = ACTIONS[focus as keyof typeof ACTIONS]?.shortcut;
      if (currentModalShortcut?.includes(input) || key.escape || input === "q") {
        closeModals();
      }
      return;
    }

    if (key.escape) {
      const now = Date.now();
      if (now - lastEscapeAt.current < 1000) {
        exit();
        return;
      }
      lastEscapeAt.current = now;
      return;
    }

    lastEscapeAt.current = 0;

    if (input.toLowerCase() === "q") {
      exit();
    }

    if (ACTIONS.help.shortcut.includes(input)) {
      setFocus("help");
    }

    if (ACTIONS.history.shortcut.includes(input)) {
      setFocus("history");
    }

    if (ACTIONS.diff.shortcut.includes(input)) {
      setFocus("diff");
    }

    if (ACTIONS["apply-confirm"].shortcut.includes(input)) {
      setFocus("apply-confirm");
    }

    if (ACTIONS.refresh.shortcut.includes(input)) {
      setFocus("refresh");
    }

    if (ACTIONS["destroy-confirm"].shortcut.includes(input)) {
      setFocus("destroy-confirm");
    }

    if (ACTIONS.logs.shortcut.includes(input)) {
      setFocus("logs");
    }

    if (key.tab || key.rightArrow || key.leftArrow) {
      setFocus((prev) => (prev === "sidebar" ? "details" : "sidebar"));
    }
  });
};
