import type { ComponentNode, FormSchema } from "@shadcn-builder/renderer";
import { cloneNode, duplicateNode, findComponent, prepareNodeForInsert } from "../utils/schema";
import { rebalanceAfterMove } from "../utils/grid";

export function insertComponent(schema: FormSchema, node: ComponentNode, index?: number): string {
  const prepared = prepareNodeForInsert(node, schema);
  const targetIndex = Math.min(Math.max(index ?? schema.components.length, 0), schema.components.length);
  schema.components.splice(targetIndex, 0, prepared);
  return prepared.id;
}

export function updateComponent(schema: FormSchema, id: string, updater: (node: ComponentNode) => ComponentNode): void {
  const index = schema.components.findIndex((component) => component.id === id);
  if (index === -1) return;
  schema.components[index] = updater(cloneNode(schema.components[index]));
}

export function removeComponentById(schema: FormSchema, id: string): boolean {
  const index = schema.components.findIndex((component) => component.id === id);
  if (index === -1) return false;
  schema.components.splice(index, 1);
  return true;
}

export function duplicateComponent(schema: FormSchema, id: string): string | null {
  const target = findComponent(schema, id);
  if (!target) return null;
  const duplicated = duplicateNode(target, schema);
  const index = schema.components.findIndex((component) => component.id === id);
  schema.components.splice(index + 1, 0, duplicated);
  return duplicated.id;
}

export function reorderComponents(schema: FormSchema, fromIndex: number, toIndex: number): void {
  schema.components = rebalanceAfterMove(schema.components, fromIndex, toIndex);
}
