import type { ComponentNode, FormSchema } from "@shadcn-builder/renderer";
import {
  duplicateNodeAtPath,
  findPathById,
  insertNodeAtLocation,
  NodeLocation,
  removeNodeAtPath,
  reorderNodes,
  updateNodeAtPath,
} from "../domain/schema";
import { cloneNode } from "../utils/schema";

export interface InsertOptions {
  index?: number;
  parentId?: string | null;
}

function resolveLocation(schema: FormSchema, options?: InsertOptions): NodeLocation {
  if (!options?.parentId) {
    return { parentPath: [], index: options?.index };
  }
  const parentPath = findPathById(schema, options.parentId);
  if (!parentPath) {
    console.warn(`Parent component ${options.parentId} not found, falling back to root insert`);
    return { parentPath: [], index: options?.index };
  }
  return { parentPath, index: options?.index };
}

export function insertComponent(schema: FormSchema, node: ComponentNode, options?: InsertOptions): string {
  return insertNodeAtLocation(schema, node, resolveLocation(schema, options));
}

export function updateComponent(schema: FormSchema, id: string, updater: (node: ComponentNode) => ComponentNode): void {
  const path = findPathById(schema, id);
  if (!path) return;
  updateNodeAtPath(schema, path, (node) => updater(cloneNode(node)));
}

export function removeComponentById(schema: FormSchema, id: string): boolean {
  const path = findPathById(schema, id);
  if (!path) return false;
  return removeNodeAtPath(schema, path);
}

export function duplicateComponent(schema: FormSchema, id: string): string | null {
  const path = findPathById(schema, id);
  if (!path) return null;
  return duplicateNodeAtPath(schema, path);
}

export function reorderComponents(schema: FormSchema, fromIndex: number, toIndex: number): void {
  reorderNodes(schema, [fromIndex], { parentPath: [], index: toIndex });
}
