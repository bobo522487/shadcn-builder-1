"use client";
import React from "react";
import type { ComponentNode } from "@shadcn-builder/renderer";
import { useDesignerStore } from "../state/store";
import { getSpan, GRID_COLUMNS, setSpan } from "../utils/grid";

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <div>
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">{title}</h3>
        {description ? <p className="text-[11px] text-slate-500">{description}</p> : null}
      </div>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function TextField({ label, value, onChange, placeholder = "" }: { label: string; value: string; onChange: (value: string) => void; placeholder?: string }) {
  return (
    <label className="block text-xs text-slate-600">
      <span className="font-medium">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
      />
    </label>
  );
}

export function RightPanel() {
  const schema = useDesignerStore((state) => state.schema);
  const selectedId = useDesignerStore((state) => state.selectedId);
  const updateSelected = useDesignerStore((state) => state.updateSelected);
  const duplicateSelected = useDesignerStore((state) => state.duplicateSelected);
  const removeSelected = useDesignerStore((state) => state.removeSelected);

  const selected = schema.components.find((component) => component.id === selectedId);

  if (!selected) {
    return (
      <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50/80 text-sm text-slate-500">
        请选择一个组件以进行编辑
      </div>
    );
  }

  const handleTextChange = (value: string) => {
    updateSelected((node) => {
      node.properties = { ...(node.properties || {}), text: value } as ComponentNode["properties"];
      return node;
    });
  };

  const handlePlaceholderChange = (value: string) => {
    updateSelected((node) => {
      node.attributes = { ...(node.attributes || {}), placeholder: value };
      return node;
    });
  };

  const handleClassNameChange = (value: string) => {
    updateSelected((node) => {
      node.properties = { ...(node.properties || {}), className: value } as ComponentNode["properties"];
      return node;
    });
  };

  const handleSpanChange = (value: number) => {
    updateSelected((node) => setSpan(node, value));
  };

  const span = getSpan(selected);

  return (
    <div className="flex h-full flex-col gap-6">
      <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs text-slate-500">
        <div className="flex items-center justify-between">
          <span className="font-medium text-slate-700">{selected.type}</span>
          <span className="rounded bg-slate-100 px-2 py-1">{selected.id}</span>
        </div>
      </div>
      <Section title="内容" description="根据组件类型调整显示文本或占位符">
        {selected.type === "text" ? (
          <TextField label="显示文本" value={(selected.properties as any)?.text ?? ""} onChange={handleTextChange} placeholder="请输入文本" />
        ) : null}
        {selected.type === "input" ? (
          <TextField
            label="占位符"
            value={(selected.attributes as any)?.placeholder ?? ""}
            onChange={handlePlaceholderChange}
            placeholder="请输入占位文案"
          />
        ) : null}
        <TextField
          label="className"
          value={(selected.properties as any)?.className ?? ""}
          onChange={handleClassNameChange}
          placeholder="tailwind 样式"
        />
      </Section>
      <Section title="布局" description="设置组件在栅格中的占位列数">
        <div className="rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-600">
          <div className="flex items-center justify-between text-[11px]">
            <span>列宽 (1-{GRID_COLUMNS})</span>
            <span className="font-semibold text-slate-900">{span}</span>
          </div>
          <input
            type="range"
            min={1}
            max={GRID_COLUMNS}
            value={span}
            onChange={(event) => handleSpanChange(Number(event.target.value))}
            className="mt-2 w-full"
          />
        </div>
      </Section>
      <Section title="操作" description="快捷调整当前组件">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={duplicateSelected}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            复制一份
          </button>
          <button
            type="button"
            onClick={removeSelected}
            className="rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-medium text-red-600 transition hover:border-red-300 hover:bg-red-50"
          >
            删除组件
          </button>
        </div>
      </Section>
    </div>
  );
}
