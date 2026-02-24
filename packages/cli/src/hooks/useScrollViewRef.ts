import { useOnMouseEnter, useOnMouseMove, useOnWheel } from "@ink-tools/ink-mouse";
import { DOMElement, useInput } from "ink";
import { ScrollViewRef } from "ink-scroll-view";
import { useRef, useState } from "react";

interface Props {
  ref: React.RefObject<DOMElement | null>;
  isFocused?: boolean;
  onFocus?: () => void;
}

export const useScrollViewRef = ({ ref, isFocused = true, onFocus }: Props) => {
  const scrollViewRef = useRef<ScrollViewRef>(null);
  const [, setScrollOffset] = useState<number>();

  useOnMouseEnter(ref, onFocus);
  useOnMouseMove(ref, onFocus);

  useInput((_, key) => {
    if (!isFocused) return;
    if (key.upArrow) {
      scrollViewRef.current?.scrollBy(-1);
    }
    if (key.downArrow) {
      scrollViewRef.current?.scrollBy(1);
    }
    if (key.pageUp) {
      scrollViewRef.current?.scrollBy(-10);
    }
    if (key.pageDown) {
      scrollViewRef.current?.scrollBy(10);
    }
    if (key.home) {
      scrollViewRef.current?.scrollTo(0);
    }
    if (key.end) {
      scrollViewRef.current?.scrollToBottom();
    }
    setScrollOffset(scrollViewRef.current?.getScrollOffset());
  });

  useOnWheel(ref, (event) => {
    if (!isFocused) return;
    if (event.button === "wheel-up") {
      scrollViewRef.current?.scrollBy(-2);
    } else if (event.button === "wheel-down") {
      scrollViewRef.current?.scrollBy(2);
    }
  });

  return scrollViewRef;
};
