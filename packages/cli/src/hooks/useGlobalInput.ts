import { useApp, useInput } from "ink";
import { ACTIONS } from "../constants";
import { useFocusManagerContext } from "../contexts/FocusManagerContext";

export const useGlobalInput = () => {
  const { exit } = useApp();
  const { focus, setFocus, isModalOpen, closeModals } = useFocusManagerContext();

  useInput((input, key) => {
    if (isModalOpen) {
      const currentModalShortcut = ACTIONS[focus as keyof typeof ACTIONS]?.shortcut;
      if (currentModalShortcut.includes(input) || key.escape || input === "q") {
        closeModals();
      }
      return;
    }

    if (input === "q") {
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

    if (key.tab || key.rightArrow || key.leftArrow) {
      setFocus((prev) => (prev === "sidebar" ? "details" : "sidebar"));
    }
  });
};
