import { create } from "zustand";
import type { FormSchema, Viewport } from "@shadcn-builder/renderer";
import { applyPatches, Patch, produceWithPatches } from "immer";
import { cloneSchema, findComponent } from "../utils/schema";

interface HistoryEntry {
  patches: Patch[];
  inversePatches: Patch[];
}

interface HistoryState {
  past: HistoryEntry[];
  future: HistoryEntry[];
  limit: number;
}

export interface DesignerState {
  schema: FormSchema;
  selectedId: string | null;
  viewport: Viewport;
  history: HistoryState;
  setSchema: (updater: FormSchema | ((draft: FormSchema) => void), options?: { pushHistory?: boolean; clearFuture?: boolean }) => void;
  select: (id: string | null) => void;
  setViewport: (viewport: Viewport) => void;
  reset: (schema: FormSchema) => void;
  undo: () => void;
  redo: () => void;
}

const HISTORY_LIMIT = 100;

function addHistoryEntry(history: HistoryState, entry: HistoryEntry, clearFuture: boolean): HistoryState {
  const past = [...history.past, entry];
  if (past.length > history.limit) past.shift();
  const future = clearFuture ? [] : history.future;
  return { past, future, limit: history.limit };
}

function ensureSelection(schema: FormSchema, selectedId: string | null): string | null {
  if (!selectedId) return null;
  return findComponent(schema, selectedId) ? selectedId : null;
}

export const useDesignerStore = create<DesignerState>((set, get) => ({
  schema: { components: [] },
  selectedId: null,
  viewport: "sm",
  history: { past: [], future: [], limit: HISTORY_LIMIT },
  setSchema: (updater, options) => {
    const pushHistory = options?.pushHistory ?? true;
    const clearFuture = options?.clearFuture ?? pushHistory;
    const state = get();

    if (typeof updater === "function") {
      const [nextSchema, patches, inversePatches] = produceWithPatches(state.schema, (draft) => {
        updater(draft);
      });

      if (!patches.length) {
        if (clearFuture && state.history.future.length) {
          set({ history: { ...state.history, future: [] } });
        }
        return;
      }

      const history = pushHistory
        ? addHistoryEntry(state.history, { patches, inversePatches }, clearFuture)
        : clearFuture && state.history.future.length
          ? { ...state.history, future: [] }
          : state.history;

      set({
        schema: nextSchema,
        history,
        selectedId: ensureSelection(nextSchema, state.selectedId),
      });
      return;
    }

    const nextSchema = cloneSchema(updater);
    const history = clearFuture && state.history.future.length
      ? { ...state.history, future: [] }
      : state.history;

    set({
      schema: nextSchema,
      history,
      selectedId: ensureSelection(nextSchema, state.selectedId),
    });
  },
  select: (id) => set({ selectedId: id }),
  setViewport: (viewport) => set({ viewport }),
  reset: (schema) => {
    const nextSchema = cloneSchema(schema);
    set({
      schema: nextSchema,
      selectedId: ensureSelection(nextSchema, null),
      history: { past: [], future: [], limit: HISTORY_LIMIT },
    });
  },
  undo: () => {
    const state = get();
    if (!state.history.past.length) return;
    const entry = state.history.past[state.history.past.length - 1];
    const restored = applyPatches(state.schema, entry.inversePatches);
    const past = state.history.past.slice(0, -1);
    const future = [...state.history.future, entry];
    if (future.length > state.history.limit) future.shift();
    set({
      schema: restored,
      selectedId: ensureSelection(restored, state.selectedId),
      history: {
        past,
        future,
        limit: state.history.limit,
      },
    });
  },
  redo: () => {
    const state = get();
    if (!state.history.future.length) return;
    const entry = state.history.future[state.history.future.length - 1];
    const restored = applyPatches(state.schema, entry.patches);
    const future = state.history.future.slice(0, -1);
    const past = [...state.history.past, entry];
    if (past.length > state.history.limit) past.shift();
    set({
      schema: restored,
      selectedId: ensureSelection(restored, state.selectedId),
      history: {
        past,
        future,
        limit: state.history.limit,
      },
    });
  },
}));
