import React from "react";
import { ComponentNode, FormSchema, RenderContext } from "../core/schema";
import { ComponentRegistry } from "../core/registry";

function mergeByViewport(node: ComponentNode, viewport?: RenderContext["viewport"]): ComponentNode {
  if (!viewport || viewport === "sm" || !node.overrides?.[viewport]) return node;
  const ov = node.overrides[viewport]!;
  return { ...node, ...ov, properties: { ...node.properties, ...ov.properties } };
}

export interface RendererProps {
  schema: FormSchema;
  registry: ComponentRegistry;
  context?: RenderContext;
  className?: string;
}

export function Renderer({ schema, registry, context, className }: RendererProps) {
  const ctx = context ?? { viewport: "sm" };

  const renderNode = (node: ComponentNode) => {
    const n = mergeByViewport(node, ctx.viewport);
    const render = registry.get(n.type);
    if (!render) return null;
    return render(n, ctx);
  };

  return (
    <div className={className}>
      {schema.components.map((n) => (
        <React.Fragment key={n.id}>{renderNode(n)}</React.Fragment>
      ))}
    </div>
  );
}
