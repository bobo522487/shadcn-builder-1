import { create } from "zustand";
import type { ComponentNode, FormSchema, Viewport } from "@shadcn-builder/renderer";
import {
  cloneNode,
  cloneSchema,
  duplicateNode,
  findComponent,
  prepareNodeForInsert,
  removeComponent,
  replaceComponent,
} from "../utils/schema";

interface HistoryState {
  past: FormSchema[];
  future: FormSchema[];
  limit: number;
}

interface DesignerState {
  schema: FormSchema;
  selectedId: string | null;
  viewport: Viewport;
  history: HistoryState;
  setSchema: (next: FormSchema | ((prev: FormSchema) => FormSchema), options?: { pushHistory?: boolean; clearFuture?: boolean }) => void;
  select: (id: string | null) => void;
  setViewport: (viewport: Viewport) => void;
  insertNode: (node: ComponentNode, options?: { index?: number }) => void;
  updateSelected: (updater: (node: ComponentNode) => ComponentNode) => void;
  removeSelected: () => void;
  duplicateSelected: () => void;
  reset: (schema: FormSchema) => void;
  undo: () => void;
  redo: () => void;
}

const HISTORY_LIMIT = 100;

function pruneHistory(value: FormSchema, history: HistoryState, direction: "past" | "future"): HistoryState {
  const cloned = cloneSchema(value);
  const list = direction === "past" ? [cloned, ...history.past] : [cloned, ...history.future];
  if (direction === "past") {
    return { ...history, past: list.slice(0, history.limit), future: [] };
  }
  return { ...history, future: list.slice(0, history.limit) };
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
  setSchema: (payload, options) => {
    const pushHistory = options?.pushHistory ?? true;
    const clearFuture = options?.clearFuture ?? pushHistory;
    set((state) => {
      const current = state.schema;
      const resolved = typeof payload === "function" ? payload(current) : payload;
      const nextSchema = cloneSchema(resolved);
      let nextHistory = state.history;
      if (pushHistory) {
        nextHistory = pruneHistory(current, state.history, "past");
      } else if (clearFuture && state.history.future.length) {
        nextHistory = { ...state.history, future: [] };
      }
      const selectedId = ensureSelection(nextSchema, state.selectedId);
      return { schema: nextSchema, history: nextHistory, selectedId };
    });
  },
  select: (id) => set({ selectedId: id }),
  setViewport: (viewport) => set({ viewport }),
  insertNode: (node, options) => {
    const state = get();
    const prepared = prepareNodeForInsert(node, state.schema);
    const index = Math.min(Math.max(options?.index ?? state.schema.components.length, 0), state.schema.components.length);
    state.setSchema(
      {
        ...state.schema,
        components: [
          ...state.schema.components.slice(0, index),
          prepared,
          ...state.schema.components.slice(index),
        ],
      },
      { pushHistory: true }
    );
    state.select(prepared.id);
  },
  updateSelected: (updater) => {
    const state = get();
    if (!state.selectedId) return;
    const target = findComponent(state.schema, state.selectedId);
    if (!target) return;
    const nextNode = updater(cloneNode(target));
    state.setSchema(replaceComponent(state.schema, state.selectedId, nextNode), { pushHistory: true });
  },
  removeSelected: () => {
    const state = get();
    if (!state.selectedId) return;
    const exists = findComponent(state.schema, state.selectedId);
    if (!exists) return;
    state.setSchema(removeComponent(state.schema, state.selectedId), { pushHistory: true });
    state.select(null);
  },
  duplicateSelected: () => {
    const state = get();
    if (!state.selectedId) return;
    const target = findComponent(state.schema, state.selectedId);
    if (!target) return;
    const duplicated = duplicateNode(target, state.schema);
    const index = state.schema.components.findIndex((c) => c.id === state.selectedId);
    state.setSchema(
      {
        ...state.schema,
        components: [
          ...state.schema.components.slice(0, index + 1),
          duplicated,
          ...state.schema.components.slice(index + 1),
        ],
      },
      { pushHistory: true }
    );
    state.select(duplicated.id);
  },
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
    const [previous, ...rest] = state.history.past;
    if (!previous) return;
    const restored = cloneSchema(previous);
    set({
      schema: restored,
      selectedId: ensureSelection(restored, state.selectedId),
      history: {
        past: rest,
        future: pruneHistory(state.schema, state.history, "future").future,
        limit: state.history.limit,
      },
    });
  },
  redo: () => {
    const state = get();
    const [next, ...rest] = state.history.future;
    if (!next) return;
    const restored = cloneSchema(next);
    set({
      schema: restored,
      selectedId: ensureSelection(restored, state.selectedId),
      history: {
        past: pruneHistory(state.schema, state.history, "past").past,
        future: rest,
        limit: state.history.limit,
      },
    });
  },
}));
