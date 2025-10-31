import type { ComponentNode, FormSchema, Viewport } from "@shadcn-builder/renderer";

function cloneOverrides(overrides?: ComponentNode["overrides"]): ComponentNode["overrides"] | undefined {
  if (!overrides) return undefined;
  const entries = Object.entries(overrides) as [Viewport, Partial<ComponentNode>][];
  if (!entries.length) return undefined;
  const next: Partial<Record<Viewport, Partial<ComponentNode>>> = {};
  for (const [key, value] of entries) {
    next[key] = value ? { ...value } : value;
  }
  return next;
}

export function cloneNode(node: ComponentNode): ComponentNode {
  return {
    ...node,
    attributes: node.attributes ? { ...node.attributes } : undefined,
    properties: node.properties
      ? {
          ...node.properties,
          style: node.properties.style ? { ...node.properties.style } : undefined,
        }
      : undefined,
    overrides: cloneOverrides(node.overrides),
    children: node.children ? node.children.map(cloneNode) : undefined,
  };
}

export function cloneSchema(schema: FormSchema): FormSchema {
  return {
    ...schema,
    components: schema.components.map(cloneNode),
  };
}

function normaliseIdBase(base: string): string {
  const cleaned = base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return cleaned || "component";
}

function collectIdsFromNode(node: ComponentNode, target: Set<string>) {
  target.add(node.id);
  node.children?.forEach((child) => collectIdsFromNode(child, target));
}

export function collectIds(schema: FormSchema): Set<string> {
  const ids = new Set<string>();
  schema.components.forEach((component) => collectIdsFromNode(component, ids));
  return ids;
}

function nextAvailableId(base: string, taken: Set<string>): string {
  const normalised = normaliseIdBase(base);
  if (!taken.has(normalised)) return normalised;
  let idx = 2;
  while (taken.has(`${normalised}-${idx}`)) idx += 1;
  return `${normalised}-${idx}`;
}

function attachIds(node: ComponentNode, taken: Set<string>, preferred?: string): ComponentNode {
  const base = normaliseIdBase(preferred ?? node.id ?? node.type ?? "component");
  const id = taken.has(base) ? nextAvailableId(base, taken) : base;
  taken.add(id);
  return {
    ...cloneNode(node),
    id,
    children: node.children ? node.children.map((child) => attachIds(child, taken)) : undefined,
  };
}

export function prepareNodeForInsert(node: ComponentNode, schema: FormSchema): ComponentNode {
  const taken = collectIds(schema);
  return attachIds(node, taken);
}

export function duplicateNode(node: ComponentNode, schema: FormSchema): ComponentNode {
  const taken = collectIds(schema);
  return attachIds(node, taken, node.id);
}

export function replaceComponent(schema: FormSchema, id: string, next: ComponentNode): FormSchema {
  return {
    ...schema,
    components: schema.components.map((component) => (component.id === id ? next : component)),
  };
}

export function removeComponent(schema: FormSchema, id: string): FormSchema {
  return {
    ...schema,
    components: schema.components.filter((component) => component.id !== id),
  };
}

export function findComponent(schema: FormSchema, id: string): ComponentNode | undefined {
  return schema.components.find((component) => component.id === id);
}
