import React from "react";
import { ComponentRegistry } from "../core/registry";
import type { ComponentNode, RenderContext } from "../core/schema";

function TextRender(node: ComponentNode, _ctx: RenderContext) {
  const text = (node.properties as any)?.text ?? (node.attributes as any)?.text ?? "文本组件";
  const className = (node.properties as any)?.className ?? (node.attributes as any)?.class ?? "";
  return <div className={className}>{text}</div>;
}

function InputRender(node: ComponentNode, _ctx: RenderContext) {
  const placeholder = (node.attributes as any)?.placeholder ?? "请输入";
  const type = (node.attributes as any)?.type ?? "text";
  const className = (node.properties as any)?.className ?? (node.attributes as any)?.class ?? "";
  const icon = (node.properties as any)?.style?.icon as string | undefined;
  // 简化：不内置图标组，先渲染纯 input
  return <input placeholder={placeholder} type={type} className={className} data-icon={icon ?? undefined} />;
}

export function createBasicRegistry() {
  const registry = new ComponentRegistry();
  registry.register("text", TextRender);
  registry.register("form-text", TextRender);
  registry.register("input", InputRender);
  registry.register("form-input", InputRender);
  return registry;
}
