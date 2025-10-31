import { create } from "zustand";
import type { ComponentNode, FormSchema } from "@shadcn-builder/renderer";
import { FormComponentModel } from "@/models/FormComponent";
import {
  FormBuilderStore,
  TemplateData,
  Viewports,
  HistorySnapshot,
  HistoryState,
} from "@/types/form-builder.types";
import { SubscriptionInfo, DEFAULT_HISTORY_SIZE } from "@/types/subscription.types";
import { getHistorySize, canSaveSnapshot } from "@/lib/history-utils";
import { createComponentId } from "@/lib/id";
import { modelToNode } from "@/lib/component-node";

const EMPTY_SCHEMA: FormSchema = { components: [] };

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

function cloneSchema(schema: FormSchema): FormSchema {
  return {
    ...schema,
    components: schema.components.map((component) => deepClone(component)),
  };
}

function findComponentIndex(components: ComponentNode[], id: string): number {
  return components.findIndex((component) => component.id === id);
}

function setNestedValue(target: any, path: string[], value: any): any {
  if (!path.length) {
    return value;
  }
  const [key, ...rest] = path;
  const current = target ?? {};
  return {
    ...current,
    [key]: rest.length ? setNestedValue(current[key], rest, value) : value,
  };
}

function updateComponentNode(
  component: ComponentNode,
  fieldPath: string[],
  value: any,
  viewport: Viewports,
  isValidForAll: boolean
): ComponentNode {
  const base = deepClone(component);
  if (viewport !== "sm" && !isValidForAll) {
    const overrides = { ...(base.overrides ?? {}) } as NonNullable<ComponentNode["overrides"]>;
    const viewportOverrides = setNestedValue(overrides[viewport], fieldPath, value);
    overrides[viewport] = viewportOverrides;
    base.overrides = overrides;
    return base;
  }
  return setNestedValue(base, fieldPath, value);
}

function ensureSelection(schema: FormSchema, selectedId: string | null): string | null {
  if (!selectedId) return null;
  return schema.components.some((component) => component.id === selectedId) ? selectedId : null;
}

function createSnapshot(schema: FormSchema, formTitle: string, formId: string | null): HistorySnapshot {
  return {
    schema: cloneSchema(schema),
    formTitle,
    formId,
    timestamp: Date.now(),
  };
}

function initializeHistory(subscriptionInfo?: SubscriptionInfo | null): HistoryState {
  return {
    snapshots: [],
    currentIndex: -1,
    maxHistorySize: subscriptionInfo ? getHistorySize(subscriptionInfo) : DEFAULT_HISTORY_SIZE,
  };
}

function generateUniqueComponentId(component: ComponentNode, existing: ComponentNode[]): string {
  const prefix = component.type || "component";
  let candidate = createComponentId(prefix);
  const ids = new Set(existing.map((item) => item.id));
  while (ids.has(candidate)) {
    candidate = createComponentId(prefix);
  }
  return candidate;
}

export const useFormBuilderStore = create<FormBuilderStore>()((set, get) => ({
  mode: "editor",
  viewport: "sm",
  showJson: false,
  formId: null,
  formTitle: "",
  loadedTemplateId: null,
  loadedTemplate: null,
  editor: null,
  enableDragging: true,
  history: initializeHistory(),
  subscriptionInfo: null,
  schema: cloneSchema(EMPTY_SCHEMA),
  selectedComponentId: null,
  updateMode: (mode) => set({ mode }),
  updateViewport: (viewport) => set({ viewport }),
  toggleJsonPreview: () => set((state) => ({ showJson: !state.showJson })),
  updateFormTitle: (title) => set({ formTitle: title }),
  updateFormId: (id) => set({ formId: id }),
  setEditor: (editor) => set({ editor }),
  updateEnableDragging: (enableDragging) => set({ enableDragging }),
  addComponent: (component) => {
    const state = get();
    const newNode = modelToNode(component);
    const nextSchema = cloneSchema(state.schema);
    const newId = generateUniqueComponentId(newNode, nextSchema.components);
    newNode.id = newId;
    newNode.attributes = {
      ...(newNode.attributes ?? {}),
      id: newId,
    };
    nextSchema.components.push(newNode);
    set({
      schema: nextSchema,
      selectedComponentId: newId,
    });
    get().saveSnapshot();
    return new FormComponentModel(deepClone(newNode));
  },
  removeComponent: (componentId) => {
    set((state) => {
      const nextSchema = {
        ...state.schema,
        components: state.schema.components.filter((component) => component.id !== componentId),
      };
      return {
        schema: nextSchema,
        selectedComponentId:
          state.selectedComponentId === componentId ? null : ensureSelection(nextSchema, state.selectedComponentId),
      };
    });
    get().saveSnapshot();
  },
  updateComponent: (componentId, field, value, isValidForAllViewports = false, isDragging = false) => {
    set((state) => {
      const nextSchema = cloneSchema(state.schema);
      const index = findComponentIndex(nextSchema.components, componentId);
      if (index === -1) {
        return {} as Partial<FormBuilderStore>;
      }
      const updated = updateComponentNode(
        nextSchema.components[index],
        field.split("."),
        value,
        state.viewport,
        isValidForAllViewports
      );
      nextSchema.components[index] = updated;
      return {
        schema: nextSchema,
        selectedComponentId: isDragging ? null : state.selectedComponentId,
      };
    });
    if (!isDragging) {
      get().saveSnapshot();
    }
  },
  updateComponents: (components) => {
    set((state) => {
      const nextSchema: FormSchema = {
        components: components.map((component) => deepClone(component)),
      };
      return {
        schema: nextSchema,
        selectedComponentId: ensureSelection(nextSchema, state.selectedComponentId),
      };
    });
    get().saveSnapshot();
  },
  selectComponent: (componentId) => {
    const state = get();
    const nextId = componentId ? componentId : null;
    const editor = nextId
      ? state.schema.components.find((component) => component.id === nextId)?.category === "form"
        ? state.editor
        : null
      : null;
    set({
      selectedComponentId: nextId,
      editor,
    });
  },
  moveComponent: (oldIndex, newIndex) => {
    set((state) => {
      const components = [...state.schema.components];
      const [movedComponent] = components.splice(oldIndex, 1);
      components.splice(newIndex, 0, movedComponent);
      return {
        schema: { ...state.schema, components },
        selectedComponentId: null,
      };
    });
    get().saveSnapshot();
  },
  duplicateComponent: (componentId) => {
    const state = get();
    const index = findComponentIndex(state.schema.components, componentId);
    if (index === -1) {
      console.warn(`Component with id ${componentId} not found for duplication`);
      return;
    }
    const duplicated = deepClone(state.schema.components[index]);
    const nextSchema = cloneSchema(state.schema);
    const newId = generateUniqueComponentId(duplicated, nextSchema.components);
    duplicated.id = newId;
    duplicated.attributes = {
      ...(duplicated.attributes ?? {}),
      id: newId,
    };
    nextSchema.components.splice(index + 1, 0, duplicated);
    set({
      schema: nextSchema,
      selectedComponentId: newId,
    });
    get().saveSnapshot();
  },
  applyTemplate: (templateData, options) => {
    const nextSchema: FormSchema = {
      components: templateData.components.map((component) => deepClone(component)),
    };
    set((state) => ({
      schema: nextSchema,
      formTitle: templateData.formTitle,
      loadedTemplateId: options?.templateKey ?? null,
      loadedTemplate: templateData,
      selectedComponentId: null,
    }));
    const { clearHistory, saveSnapshot } = get();
    clearHistory();
    saveSnapshot();
  },
  clearForm: () => {
    set({
      schema: cloneSchema(EMPTY_SCHEMA),
      selectedComponentId: null,
      formTitle: "",
      formId: null,
    });
    get().clearHistory();
    get().saveSnapshot();
  },
  saveSnapshot: () => {
    const state = get();
    const snapshot = createSnapshot(state.schema, state.formTitle, state.formId);
    set((current) => {
      const history = { ...current.history };

      if (current.subscriptionInfo && !canSaveSnapshot(history.snapshots.length, current.subscriptionInfo)) {
        if (history.snapshots.length > 0) {
          history.snapshots = history.snapshots.slice(0, history.snapshots.length - 1);
          history.currentIndex = Math.min(history.currentIndex, history.snapshots.length - 1);
        }
      }

      const branchIndex = history.currentIndex >= 0 ? history.currentIndex : 0;
      history.snapshots = history.snapshots.slice(branchIndex);
      history.snapshots.unshift(snapshot);
      history.currentIndex = 0;

      if (current.subscriptionInfo) {
        history.maxHistorySize = getHistorySize(current.subscriptionInfo);
      }

      if (history.snapshots.length > history.maxHistorySize) {
        history.snapshots = history.snapshots.slice(0, history.maxHistorySize);
        history.currentIndex = Math.min(history.currentIndex, history.snapshots.length - 1);
      }

      return { history };
    });
  },
  undo: () => {
    const state = get();
    if (state.history.currentIndex < state.history.snapshots.length - 1) {
      const nextIndex = state.history.currentIndex + 1;
      const snapshot = state.history.snapshots[nextIndex];
      if (!snapshot) {
        return false;
      }
      set({
        schema: cloneSchema(snapshot.schema),
        formTitle: snapshot.formTitle,
        formId: snapshot.formId,
        history: {
          ...state.history,
          currentIndex: nextIndex,
        },
        selectedComponentId: null,
      });
      return true;
    }
    return false;
  },
  redo: () => {
    const state = get();
    if (state.history.currentIndex > 0) {
      const nextIndex = state.history.currentIndex - 1;
      const snapshot = state.history.snapshots[nextIndex];
      if (!snapshot) {
        return false;
      }
      set({
        schema: cloneSchema(snapshot.schema),
        formTitle: snapshot.formTitle,
        formId: snapshot.formId,
        history: {
          ...state.history,
          currentIndex: nextIndex,
        },
        selectedComponentId: null,
      });
      return true;
    }
    return false;
  },
  canUndo: () => {
    const state = get();
    return state.history.currentIndex < state.history.snapshots.length - 1;
  },
  canRedo: () => {
    const state = get();
    return state.history.currentIndex > 0;
  },
  clearHistory: () => set((state) => ({
    history: initializeHistory(state.subscriptionInfo),
  })),
  jumpToSnapshot: (index) => {
    const state = get();
    const snapshot = state.history.snapshots[index];
    if (!snapshot) {
      return false;
    }
    set({
      schema: cloneSchema(snapshot.schema),
      formTitle: snapshot.formTitle,
      formId: snapshot.formId,
      history: {
        ...state.history,
        currentIndex: index,
      },
      selectedComponentId: ensureSelection(snapshot.schema, state.selectedComponentId),
    });
    return true;
  },
  updateSubscriptionInfo: (subscriptionInfo) =>
    set((state) => ({
      subscriptionInfo,
      history: {
        ...state.history,
        maxHistorySize: getHistorySize(subscriptionInfo),
      },
    })),
}));
