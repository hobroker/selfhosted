import { useRef } from "react";
import { useApp, useInput } from "ink";
import { ACTIONS } from "../constants";
import { useFocusManagerContext } from "../contexts/FocusManagerContext";
import { ActionKey } from "../types";

const isQuit = (input: string) => input.toLowerCase() === "q";

export const useGlobalInput = () => {
  const { exit } = useApp();
  const { setFocus, isModalOpen, closeModals } = useFocusManagerContext();
  const lastEscapeAt = useRef(0);

  useInput((input, key) => {
    if (isModalOpen) {
      lastEscapeAt.current = 0;
      if (key.escape || isQuit(input)) {
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

    if (isQuit(input)) {
      exit();
    }

    const actions: ActionKey[] = [
      "help",
      "history",
      "diff",
      "apply-confirm",
      "refresh",
      "destroy-confirm",
      "logs",
    ];

    for (const modal of actions) {
      const shortcut = ACTIONS[modal].shortcut;
      if (shortcut.includes(input)) {
        setFocus(modal);
        return;
      }
    }

    if (key.tab || key.rightArrow || key.leftArrow) {
      setFocus((prev) => (prev === "sidebar" ? "details" : "sidebar"));
    }
  });
};
