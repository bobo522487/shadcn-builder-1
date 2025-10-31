"use client";
import { Renderer, type FormSchema, createBasicRegistry } from "@shadcn-builder/renderer";
import React from "react";

const registry = createBasicRegistry();

const schema: FormSchema = {
  formTitle: "只渲染 Demo",
  components: [
    { id: "text-1", type: "text", properties: { text: "Hello Renderer" } },
    { id: "text-2", type: "text", properties: { text: "第二个组件" } },
    { id: "input-1", type: "input", attributes: { placeholder: "请输入内容" } },
  ],
};

export default function Page() {
  return (
    <main style={{ padding: 24 }}>
      <h2>Renderer Demo</h2>
      <Renderer schema={schema} registry={registry} context={{ viewport: "md" }} />
    </main>
  );
}
