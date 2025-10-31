"use client";
import { Designer } from "@shadcn-builder/designer";
import { createBasicRegistry } from "@shadcn-builder/renderer";
import React, { useState } from "react";

const registry = createBasicRegistry();

export default function Page() {
  const [schema, setSchema] = useState({ components: [{ id: "text-1", type: "text", properties: { text: "可编辑文本", className: "" } }] });
  return (
    <main style={{ padding: 24, height: "calc(100vh - 48px)" }}>
      <h2>Designer Demo</h2>
      <p className="text-sm text-slate-600">左侧“物料”可添加组件；点击画布内“选择”按钮后，右侧可编辑属性；用上下箭头重排。</p>
      <div style={{ height: "100%", border: "1px solid #e5e7eb", marginTop: 12 }}>
        <Designer value={schema as any} onChange={setSchema as any} registry={registry} showJSON />
      </div>
    </main>
  );
}
