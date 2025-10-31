import type { ComponentNode, FormSchema } from "@shadcn-builder/renderer";
import { enablePatches } from "immer";
import { createSchemaCommands } from "./commands";
import { useDesignerStore, type DesignerState } from "./store";

let patchesEnabled = false;
function ensurePatchesEnabled() {
  if (!patchesEnabled) {
    enablePatches();
    patchesEnabled = true;
  }
}

export function buildTestSchema(components: Partial<ComponentNode>[]): FormSchema {
  return {
    components: components.map((component, index) => ({
      id: component.id ?? `node-${index + 1}`,
      type: component.type ?? "text",
      properties: component.properties ?? { text: `节点${index + 1}` },
    }) as ComponentNode),
  };
}

export function resetDesignerStore(overrides: Partial<DesignerState> = {}) {
  ensurePatchesEnabled();
  const base: Partial<DesignerState> = {
    schema: buildTestSchema([]),
    selectedId: null,
    history: { past: [], future: [], limit: 100 },
  };
  useDesignerStore.setState({ ...base, ...overrides });
}

export function getCommandsForTesting() {
  ensurePatchesEnabled();
  const state = useDesignerStore.getState();
  return createSchemaCommands({
    setSchema: state.setSchema,
    select: state.select,
    getSelectedId: () => useDesignerStore.getState().selectedId,
  });
}
