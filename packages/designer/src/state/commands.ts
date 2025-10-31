import { useMemo } from "react";
import type { ComponentNode } from "@shadcn-builder/renderer";
import { useDesignerStore, type DesignerState } from "./store";
import {
  insertComponent,
  updateComponent,
  removeComponentById,
  duplicateComponent,
  reorderComponents,
} from "./operations";

interface SchemaCommandContext {
  setSchema: DesignerState["setSchema"];
  select: DesignerState["select"];
  getSelectedId: () => DesignerState["selectedId"];
}

export interface UseSchemaCommandsResult {
  insert: (node: ComponentNode, options?: { index?: number }) => void;
  update: (id: string, updater: (node: ComponentNode) => ComponentNode) => void;
  remove: (id: string) => void;
  duplicate: (id: string) => void;
  reorder: (fromIndex: number, toIndex: number) => void;
  clearSelection: () => void;
}

export function createSchemaCommands(context: SchemaCommandContext): UseSchemaCommandsResult {
  return {
    insert(node, options) {
      let insertedId = "";
      context.setSchema((draft) => {
        insertedId = insertComponent(draft, node, options?.index);
      }, { pushHistory: true });
      if (insertedId) context.select(insertedId);
    },
    update(id, updater) {
      context.setSchema((draft) => {
        updateComponent(draft, id, updater);
      }, { pushHistory: true });
    },
    remove(id) {
      let removed = false;
      context.setSchema((draft) => {
        removed = removeComponentById(draft, id);
      }, { pushHistory: true });
      if (removed && context.getSelectedId() === id) context.select(null);
    },
    duplicate(id) {
      let duplicatedId: string | null = null;
      context.setSchema((draft) => {
        duplicatedId = duplicateComponent(draft, id);
      }, { pushHistory: true });
      if (duplicatedId) context.select(duplicatedId);
    },
    reorder(fromIndex, toIndex) {
      context.setSchema((draft) => {
        reorderComponents(draft, fromIndex, toIndex);
      }, { pushHistory: true });
    },
    clearSelection() {
      context.select(null);
    },
  };
}

export function useSchemaCommands(): UseSchemaCommandsResult {
  const { setSchema, select } = useDesignerStore<Pick<DesignerState, "setSchema" | "select">>((state) => ({
    setSchema: state.setSchema,
    select: state.select,
  }));

  return useMemo(
    () => createSchemaCommands({
      setSchema,
      select,
      getSelectedId: () => useDesignerStore.getState().selectedId,
    }),
    [setSchema, select]
  );
}
