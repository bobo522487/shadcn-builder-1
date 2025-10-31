import { useMemo } from "react";
import { useFormBuilderStore } from "@/stores/form-builder-store";
import { nodeToModel } from "@/lib/component-node";
import type { FormComponentModel } from "@/models/FormComponent";
import type { ComponentNode } from "@shadcn-builder/renderer";

export function useComponentModels(): FormComponentModel[] {
  const components = useFormBuilderStore((state) => state.schema.components);
  return useMemo(
    () => components.map((component: ComponentNode) => nodeToModel(component)),
    [components]
  );
}

export function useSelectedComponentModel(): FormComponentModel | null {
  const selectedComponentId = useFormBuilderStore((state) => state.selectedComponentId);
  const components = useFormBuilderStore((state) => state.schema.components);

  return useMemo(() => {
    if (!selectedComponentId) return null;
    const node = components.find((component) => component.id === selectedComponentId);
    return node ? nodeToModel(node) : null;
  }, [components, selectedComponentId]);
}
