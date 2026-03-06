// @vitest-environment happy-dom
import { renderHook, act } from "@testing-library/react";
import { vi, beforeEach } from "vitest";
import { useSidebar } from "./useSidebar";
import { ServiceState } from "../constants";
import type { ServiceInfo } from "../types";

// --- mocks ---

type InputCallback = (input: string, key: Record<string, boolean>) => void;
let capturedInputCb: InputCallback = () => {};

vi.mock("ink", () => ({
  useInput: vi.fn((cb: InputCallback) => {
    capturedInputCb = cb;
  }),
}));

const mockSelectService = vi.fn();
let mockServices: ServiceInfo[] = [];

vi.mock("../contexts/ServicesContext", () => ({
  useServicesContext: () => ({ services: mockServices, selectService: mockSelectService }),
}));

let mockFocus = "sidebar";
const mockSetFocus = vi.fn();

vi.mock("../contexts/FocusManagerContext", () => ({
  useFocusManagerContext: () => ({
    focus: mockFocus,
    setFocus: mockSetFocus,
    isModalOpen: false,
  }),
}));

// --- helpers ---

const noKey: Record<string, boolean> = {};
const escKey = { escape: true };
const backspaceKey = { backspace: true };

const press = (input: string, key = noKey) => act(() => capturedInputCb(input, key));
const pressEscape = () => press("", escKey);
const pressBackspace = () => press("", backspaceKey);

const makeService = (name: string, category = "Test"): ServiceInfo => ({
  id: name.toLowerCase(),
  name,
  namespace: "default",
  category,
  path: `/path/${name}`,
  localChartVersion: "1.0.0",
  localAppVersion: "1.0.0",
  state: ServiceState.NotInstalled,
  readme: "",
});

// --- tests ---

beforeEach(() => {
  vi.clearAllMocks();
  mockFocus = "sidebar";
  mockServices = [makeService("Plex", "Media"), makeService("Jellyfin", "Media"), makeService("Nextcloud", "Storage")];
  capturedInputCb = () => {};
});

describe("useSidebar — search activation", () => {
  it("starts with search inactive", () => {
    const { result } = renderHook(() => useSidebar());
    expect(result.current.isSearching).toBe(false);
    expect(result.current.searchQuery).toBe("");
  });

  it("activates search on '/'", () => {
    const { result } = renderHook(() => useSidebar());
    press("/");
    expect(result.current.isSearching).toBe(true);
  });

  it("does not activate search when already searching", () => {
    const { result } = renderHook(() => useSidebar());
    press("/");
    press("/"); // second slash should be treated as typed char
    expect(result.current.searchQuery).toBe("/");
  });

  it("does not activate when focus is not sidebar or details", () => {
    mockFocus = "help";
    const { result } = renderHook(() => useSidebar());
    press("/");
    expect(result.current.isSearching).toBe(false);
  });
});

describe("useSidebar — typing while searching", () => {
  it("appends printable chars to query", () => {
    const { result } = renderHook(() => useSidebar());
    press("/");
    press("p");
    press("l");
    expect(result.current.searchQuery).toBe("pl");
  });

  it("ignores non-printable / multi-byte input", () => {
    const { result } = renderHook(() => useSidebar());
    press("/");
    press("\x1b[M"); // typical mouse escape sequence
    press("\x00"); // null byte
    expect(result.current.searchQuery).toBe("");
  });

  it("deletes last char on backspace", () => {
    const { result } = renderHook(() => useSidebar());
    press("/");
    press("p");
    press("l");
    pressBackspace();
    expect(result.current.searchQuery).toBe("p");
  });

  it("does nothing on backspace with empty query", () => {
    const { result } = renderHook(() => useSidebar());
    press("/");
    pressBackspace();
    expect(result.current.searchQuery).toBe("");
    expect(result.current.isSearching).toBe(true);
  });
});

describe("useSidebar — Escape", () => {
  it("clears both isSearching and searchQuery on Escape", () => {
    const { result } = renderHook(() => useSidebar());
    press("/");
    press("p");
    pressEscape();
    expect(result.current.isSearching).toBe(false);
    expect(result.current.searchQuery).toBe("");
  });

  it("Escape works even when not searching", () => {
    const { result } = renderHook(() => useSidebar());
    pressEscape();
    expect(result.current.isSearching).toBe(false);
  });
});

describe("useSidebar — matchedIds", () => {
  it("is null when query is empty", () => {
    const { result } = renderHook(() => useSidebar());
    expect(result.current.matchedIds).toBeNull();
  });

  it("contains matched service IDs when query is set", () => {
    const { result } = renderHook(() => useSidebar());
    press("/");
    press("p");
    press("l");
    press("e");
    press("x");
    expect(result.current.matchedIds?.has("plex")).toBe(true);
    expect(result.current.matchedIds?.has("jellyfin")).toBe(false);
  });

  it("returns null after Escape clears the query", () => {
    const { result } = renderHook(() => useSidebar());
    press("/");
    press("p");
    pressEscape();
    expect(result.current.matchedIds).toBeNull();
  });
});

describe("useSidebar — jump to first match", () => {
  it("jumps displayIndex to first match when query is typed", () => {
    // services: [Plex(Media), Jellyfin(Media), Nextcloud(Storage)]
    // withCategories: [Media, Plex, Jellyfin, Storage, Nextcloud]
    // "next" matches Nextcloud at services index 2 → display index 4
    const { result } = renderHook(() => useSidebar());
    press("/");
    press("n");
    press("e");
    press("x");
    press("t");
    expect(result.current.displayIndex).toBe(4);
  });

  it("does NOT reset displayIndex when query is cleared with Escape", () => {
    const { result } = renderHook(() => useSidebar());
    press("/");
    press("n"); // jumps to Nextcloud
    const indexAfterSearch = result.current.displayIndex;
    pressEscape();
    expect(result.current.displayIndex).toBe(indexAfterSearch);
  });
});

describe("useSidebar — handleChange", () => {
  it("updates selected service when called with a service display index", () => {
    // withCategories: [Media(0), Plex(1), Jellyfin(2), Storage(3), Nextcloud(4)]
    const { result } = renderHook(() => useSidebar());
    act(() => result.current.handleChange(2)); // Jellyfin
    expect(result.current.displayIndex).toBe(2);
  });

  it("ignores category items", () => {
    const { result } = renderHook(() => useSidebar());
    const before = result.current.displayIndex;
    act(() => result.current.handleChange(0)); // Media category header
    expect(result.current.displayIndex).toBe(before);
  });

  it("ignores out-of-bounds index", () => {
    const { result } = renderHook(() => useSidebar());
    const before = result.current.displayIndex;
    act(() => result.current.handleChange(999));
    expect(result.current.displayIndex).toBe(before);
  });
});

describe("useSidebar — clearSearch", () => {
  it("resets isSearching and searchQuery", () => {
    const { result } = renderHook(() => useSidebar());
    press("/");
    press("p");
    act(() => result.current.clearSearch());
    expect(result.current.isSearching).toBe(false);
    expect(result.current.searchQuery).toBe("");
  });
});
