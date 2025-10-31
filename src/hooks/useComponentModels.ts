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
  const { schema, selectedComponentId } = useFormBuilderStore((state) => ({
    schema: state.schema,
    selectedComponentId: state.selectedComponentId,
  }));

  return useMemo(() => {
    if (!selectedComponentId) return null;
    const node = schema.components.find((component) => component.id === selectedComponentId);
    return node ? nodeToModel(node) : null;
  }, [schema, selectedComponentId]);
}
