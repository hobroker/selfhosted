import { useApp, useInput } from "ink";
import { FocusState } from "../types";
import { Dispatch, SetStateAction } from "react";

interface Props {
  focus: FocusState;
  setFocus: Dispatch<SetStateAction<FocusState>>;
}

export const useGlobalInput = ({ focus, setFocus }: Props) => {
  const { exit } = useApp();

  useInput((input, key) => {
    if (focus === "help" || focus === "history") {
      if (
        (focus === "help" && input === "?") ||
        (focus === "history" && (input === "h" || input === "H")) ||
        key.escape ||
        input === "q"
      ) {
        setFocus("sidebar");
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

    if (key.tab || key.rightArrow || key.leftArrow) {
      setFocus((prev) => (prev === "sidebar" ? "details" : "sidebar"));
    }
  });
};
