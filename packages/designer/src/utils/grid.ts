import type { ComponentNode } from "@shadcn-builder/renderer";

export const GRID_COLUMNS = 12;

export function getSpan(node: ComponentNode): number {
  const raw = (node.properties as any)?.style?.colSpan;
  const n = typeof raw === "string" ? parseInt(raw, 10) : typeof raw === "number" ? raw : undefined;
  if (!n || Number.isNaN(n)) return GRID_COLUMNS; // default full width
  return Math.max(1, Math.min(GRID_COLUMNS, n));
}

export function setSpan(node: ComponentNode, span: number): ComponentNode {
  const style = { ...((node.properties as any)?.style || {}), colSpan: String(span) };
  return { ...node, properties: { ...(node.properties || {}), style } } as ComponentNode;
}

export function computeRows(components: ComponentNode[]): ComponentNode[][] {
  const rows: ComponentNode[][] = [];
  let current: ComponentNode[] = [];
  let used = 0;
  for (const c of components) {
    const span = getSpan(c);
    if (used + span > GRID_COLUMNS && current.length > 0) {
      rows.push(current);
      current = [];
      used = 0;
    }
    current.push(c);
    used += span;
  }
  if (current.length) rows.push(current);
  return rows;
}

export function rebalanceRowSpans(row: ComponentNode[]): ComponentNode[] {
  if (row.length === 0) return row;
  const base = Math.max(1, Math.floor(GRID_COLUMNS / row.length));
  const remainder = GRID_COLUMNS - base * row.length;
  return row.map((n, idx) => setSpan(n, base + (idx < remainder ? 1 : 0)));
}

export function rebalanceAfterMove(list: ComponentNode[], fromIndex: number, toIndex: number): ComponentNode[] {
  const next = [...list];
  const [moved] = next.splice(fromIndex, 1);
  next.splice(toIndex, 0, moved);
  const rows = computeRows(next);
  // 仅对受影响的行做均分，这里简单对所有行均分
  const balanced = rows.flatMap((r) => rebalanceRowSpans(r));
  return balanced;
}
