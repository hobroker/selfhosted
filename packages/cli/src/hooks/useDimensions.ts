import { useState, useEffect } from "react";
import { useStdout } from "ink";
import type { Dimensions } from "../types.d.ts";

export function useDimensions(): Dimensions {
  const { stdout } = useStdout();
  const [dimensions, setDimensions] = useState<Dimensions>({
    columns: stdout?.columns || 80,
    rows: stdout?.rows || 24,
  });

  useEffect(() => {
    const onResize = () => {
      setDimensions({
        columns: stdout?.columns || 80,
        rows: stdout?.rows || 24,
      });
    };

    stdout?.on("resize", onResize);
    return () => {
      stdout?.off("resize", onResize);
    };
  }, [stdout]);

  return dimensions;
}
