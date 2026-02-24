import { useApp, useInput } from "ink";
import { useFocusManagerContext } from "../contexts/FocusManagerContext";

export const useGlobalInput = () => {
  const { exit } = useApp();
  const { focus, setFocus, isModalOpen, closeModals } = useFocusManagerContext();

  useInput((input, key) => {
    if (isModalOpen) {
      if (
        (focus === "help" && input === "?") ||
        (focus === "history" && (input === "h" || input === "H")) ||
        (focus === "diff" && (input === "d" || input === "D")) ||
        (focus === "apply-confirm" && (input === "a" || input === "A")) ||
        (focus === "apply" && (input === "a" || input === "A")) ||
        key.escape ||
        input === "q"
      ) {
        closeModals();
      }
      return;
    }

    if (input === "q") {
      exit();
    }

    if (input === "?") {
      setFocus("help");
    }

    if (input === "h" || input === "H") {
      setFocus("history");
    }

    if (input === "d" || input === "D") {
      setFocus("diff");
    }

    if (input === "a" || input === "A") {
      setFocus("apply-confirm");
    }

    if (key.tab || key.rightArrow || key.leftArrow) {
      setFocus((prev) => (prev === "sidebar" ? "details" : "sidebar"));
    }
  });
};
