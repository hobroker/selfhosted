// @vitest-environment happy-dom
import { renderHook, act } from "@testing-library/react";
import { vi } from "vitest";
import { useCommandHooks } from "./useCommandHooks";
import { CommandState } from "../constants";
import type { Result } from "execa";

const fakeResult = {} as Result;
const fakeError = new Error("something went wrong");

describe("useCommandHooks", () => {
  it("starts in Idle state", () => {
    const { result } = renderHook(() => useCommandHooks());
    expect(result.current.commandState).toBe(CommandState.Idle);
  });

  it("transitions to Loading when onStart is called", () => {
    const { result } = renderHook(() => useCommandHooks());
    act(() => result.current.onStart());
    expect(result.current.commandState).toBe(CommandState.Loading);
  });

  it("transitions to Success when onSuccess is called", () => {
    const { result } = renderHook(() => useCommandHooks());
    act(() => result.current.onSuccess(fakeResult));
    expect(result.current.commandState).toBe(CommandState.Success);
  });

  it("transitions to Error when onError is called", () => {
    const { result } = renderHook(() => useCommandHooks());
    act(() => result.current.onError(fakeError));
    expect(result.current.commandState).toBe(CommandState.Error);
  });

  it("calls the onStart callback prop", () => {
    const onStart = vi.fn();
    const { result } = renderHook(() => useCommandHooks({ onStart }));
    act(() => result.current.onStart());
    expect(onStart).toHaveBeenCalledOnce();
  });

  it("calls the onSuccess callback prop with the result", () => {
    const onSuccess = vi.fn();
    const { result } = renderHook(() => useCommandHooks({ onSuccess }));
    act(() => result.current.onSuccess(fakeResult));
    expect(onSuccess).toHaveBeenCalledExactlyOnceWith(fakeResult);
  });

  it("calls the onError callback prop with the error", () => {
    const onError = vi.fn();
    const { result } = renderHook(() => useCommandHooks({ onError }));
    act(() => result.current.onError(fakeError));
    expect(onError).toHaveBeenCalledExactlyOnceWith(fakeError);
  });

  it("works without any callback props", () => {
    const { result } = renderHook(() => useCommandHooks());
    expect(() => {
      act(() => result.current.onStart());
      act(() => result.current.onSuccess(fakeResult));
      act(() => result.current.onError(fakeError));
    }).not.toThrow();
  });

  it("reflects a full Idle → Loading → Success lifecycle", () => {
    const { result } = renderHook(() => useCommandHooks());
    act(() => result.current.onStart());
    expect(result.current.commandState).toBe(CommandState.Loading);
    act(() => result.current.onSuccess(fakeResult));
    expect(result.current.commandState).toBe(CommandState.Success);
  });

  it("reflects a full Idle → Loading → Error lifecycle", () => {
    const { result } = renderHook(() => useCommandHooks());
    act(() => result.current.onStart());
    expect(result.current.commandState).toBe(CommandState.Loading);
    act(() => result.current.onError(fakeError));
    expect(result.current.commandState).toBe(CommandState.Error);
  });
});
