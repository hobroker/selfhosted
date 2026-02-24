import { Text } from "ink";
import ansiRegex from "ansi-regex";

interface Props {
  children: string;
}

interface StyleState {
  color?: string;
  backgroundColor?: string;
  bold?: boolean;
  dimColor?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  inverse?: boolean;
}

const stylesMap: Record<number, keyof StyleState | { key: keyof StyleState; value: unknown }> = {
  0: { key: "color", value: undefined },
  1: "bold",
  2: "dimColor",
  3: "italic",
  4: "underline",
  7: "inverse",
  9: "strikethrough",
  22: { key: "bold", value: false },
  23: { key: "italic", value: false },
  24: { key: "underline", value: false },
  29: { key: "strikethrough", value: false },
};

const colorCodes: Record<number, string> = {
  30: "black",
  31: "red",
  32: "green",
  33: "yellow",
  34: "blue",
  35: "magenta",
  36: "cyan",
  37: "white",
  39: "white",
  90: "grey",
  91: "redBright",
  92: "greenBright",
  93: "yellowBright",
  94: "blueBright",
  95: "magentaBright",
  96: "cyanBright",
  97: "whiteBright",
};

const bgCodes: Record<number, string> = {
  40: "black",
  41: "red",
  42: "green",
  43: "yellow",
  44: "blue",
  45: "magenta",
  46: "cyan",
  47: "white",
  49: "black",
};

export const AnsiText = ({ children }: Props) => {
  const regex = ansiRegex();
  const segments: { text: string; style: StyleState }[] = [];

  let currentState: StyleState = {};
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(children)) !== null) {
    const textBefore = children.slice(lastIndex, match.index);
    if (textBefore) {
      segments.push({ text: textBefore, style: { ...currentState } });
    }

    const codeStr = match[0];
    const codes = codeStr
      // eslint-disable-next-line no-control-regex
      .replace(/\u001b\[/g, "")
      .replace(/m/g, "")
      .split(";")
      .map(Number);

    for (let i = 0; i < codes.length; i++) {
      const code = codes[i];
      if (code === 0) {
        currentState = {};
      } else if (code === 38 || code === 48) {
        const isFg = code === 38;
        const type = codes[i + 1];
        if (type === 5) {
          const id = codes[i + 2];
          const idMap: Record<number, string> = {
            0: "black",
            1: "red",
            2: "green",
            3: "yellow",
            4: "blue",
            5: "magenta",
            6: "cyan",
            7: "white",
            8: "grey",
            9: "redBright",
            10: "greenBright",
            11: "yellowBright",
            12: "blueBright",
            13: "magentaBright",
            14: "cyanBright",
            15: "whiteBright",
          };
          if (idMap[id]) {
            if (isFg) currentState.color = idMap[id];
            else currentState.backgroundColor = idMap[id];
          }
          i += 2;
        } else if (type === 2) {
          const r = codes[i + 2];
          const g = codes[i + 3];
          const b = codes[i + 4];
          const hex = `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
          if (isFg) currentState.color = hex;
          else currentState.backgroundColor = hex;
          i += 4;
        }
      } else if (stylesMap[code]) {
        const style = stylesMap[code];
        if (typeof style === "string") {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (currentState as any)[style] = true;
        } else {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (currentState as any)[style.key] = style.value;
        }
      } else if (colorCodes[code]) {
        currentState.color = colorCodes[code];
      } else if (bgCodes[code]) {
        currentState.backgroundColor = bgCodes[code];
      }
    }

    lastIndex = regex.lastIndex;
  }

  const remainingText = children.slice(lastIndex);
  if (remainingText) {
    segments.push({ text: remainingText, style: { ...currentState } });
  }

  return (
    <>
      {segments.map((seg, index) => (
        <Text key={index} {...seg.style}>
          {seg.text}
        </Text>
      ))}
    </>
  );
};
