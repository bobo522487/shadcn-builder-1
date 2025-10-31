import type { ComponentNode, FormSchema } from "@shadcn-builder/renderer";

import { duplicateNode, findComponent, prepareNodeForInsert } from "../utils/schema";

export type NodePath = number[];

export interface NodeLocation {
  parentPath: NodePath;
  index?: number;
}

function traverseFindPath(nodes: ComponentNode[], id: string, prefix: NodePath): NodePath | null {
  for (let index = 0; index < nodes.length; index += 1) {
    const node = nodes[index]!;
    const path = [...prefix, index];
    if (node.id === id) {
      return path;
    }
    if (node.children?.length) {
      const found = traverseFindPath(node.children, id, path);
      if (found) {
        return found;
      }
    }
  }
  return null;
}

export function findPathById(schema: FormSchema, id: string): NodePath | null {
  return traverseFindPath(schema.components, id, []);
}

function getNodeByPathInternal(schema: FormSchema, path: NodePath): ComponentNode | undefined {
  if (!path.length) return undefined;
  let collection: ComponentNode[] = schema.components;
  let target: ComponentNode | undefined;
  for (let depth = 0; depth < path.length; depth += 1) {
    const index = path[depth]!;
    target = collection[index];
    if (!target) return undefined;
    if (depth < path.length - 1) {
      if (!target.children) return undefined;
      collection = target.children;
    }
  }
  return target;
}

export function getNodeByPath(schema: FormSchema, path: NodePath): ComponentNode | undefined {
  return getNodeByPathInternal(schema, path);
}

function ensureChildren(node: ComponentNode): ComponentNode[] {
  if (!node.children) {
    node.children = [];
  }
  return node.children;
}

function getCollectionForParent(schema: FormSchema, parentPath: NodePath): ComponentNode[] {
  if (!parentPath.length) {
    return schema.components;
  }
  const parent = getNodeByPathInternal(schema, parentPath);
  if (!parent) {
    throw new Error(`Parent path ${parentPath.join(".")} not found`);
  }
  return ensureChildren(parent);
}

export function insertNodeAtLocation(schema: FormSchema, node: ComponentNode, location: NodeLocation): string {
  const prepared = prepareNodeForInsert(node, schema);
  const collection = getCollectionForParent(schema, location.parentPath);
  const targetIndex = Math.min(Math.max(location.index ?? collection.length, 0), collection.length);
  collection.splice(targetIndex, 0, prepared);
  return prepared.id;
}

export function updateNodeAtPath(
  schema: FormSchema,
  path: NodePath,
  updater: (node: ComponentNode) => ComponentNode
): void {
  if (!path.length) {
    throw new Error("Cannot update schema root without path");
  }
  const parentPath = path.slice(0, -1);
  const index = path[path.length - 1]!;
  const collection = getCollectionForParent(schema, parentPath);
  const current = collection[index];
  if (!current) return;
  collection[index] = updater(current);
}

export function removeNodeAtPath(schema: FormSchema, path: NodePath): boolean {
  if (!path.length) return false;
  const parentPath = path.slice(0, -1);
  const index = path[path.length - 1]!;
  const collection = getCollectionForParent(schema, parentPath);
  if (!collection[index]) return false;
  collection.splice(index, 1);
  return true;
}

export function duplicateNodeAtPath(schema: FormSchema, path: NodePath): string | null {
  const node = getNodeByPathInternal(schema, path);
  if (!node) return null;
  const parentPath = path.slice(0, -1);
  const index = path[path.length - 1]!;
  const collection = getCollectionForParent(schema, parentPath);
  const duplicated = duplicateNode(node, schema);
  collection.splice(index + 1, 0, duplicated);
  return duplicated.id;
}

export function reorderNodes(schema: FormSchema, from: NodePath, to: NodeLocation): void {
  if (!from.length) return;
  const sourceParentPath = from.slice(0, -1);
  const sourceIndex = from[from.length - 1]!;
  const sourceCollection = getCollectionForParent(schema, sourceParentPath);
  const [moved] = sourceCollection.splice(sourceIndex, 1);
  if (!moved) return;

  const isSameParent =
    sourceParentPath.length === to.parentPath.length &&
    sourceParentPath.every((value, idx) => value === to.parentPath[idx]);

  const destinationCollection = isSameParent ? sourceCollection : getCollectionForParent(schema, to.parentPath);
  let insertIndex = to.index ?? destinationCollection.length;
  if (isSameParent) {
    insertIndex = Math.min(Math.max(insertIndex, 0), destinationCollection.length);
  } else {
    insertIndex = Math.min(Math.max(insertIndex, 0), destinationCollection.length);
  }

  destinationCollection.splice(insertIndex, 0, moved);
}

export function hasComponent(schema: FormSchema, id: string): boolean {
  return Boolean(findComponent(schema, id));
}
