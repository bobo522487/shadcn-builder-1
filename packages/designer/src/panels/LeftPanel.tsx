"use client";
import React, { useMemo, useState } from "react";
import type { ComponentNode } from "@shadcn-builder/renderer";
import { useDesignerStore } from "../state/store";

interface PaletteItem {
  label: string;
  description: string;
  node: ComponentNode;
}

const palette: { title: string; items: PaletteItem[] }[] = [
  {
    title: "文本",
    items: [
      {
        label: "主标题",
        description: "用于页面或模块标题",
        node: { id: "-", type: "text", properties: { text: "欢迎使用表单设计器", className: "text-2xl font-semibold tracking-tight" } },
      },
      {
        label: "副标题",
        description: "用于段落引导",
        node: { id: "-", type: "text", properties: { text: "这里可以放置补充说明文字。", className: "text-sm text-slate-600" } },
      },
      {
        label: "提示标签",
        description: "强调信息或状态",
        node: { id: "-", type: "text", properties: { text: "信息提示", className: "inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600" } },
      },
    ],
  },
  {
    title: "表单",
    items: [
      {
        label: "输入框",
        description: "常规文本输入",
        node: { id: "-", type: "input", properties: { className: "w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-slate-900 focus:outline-none" }, attributes: { placeholder: "请输入内容" } },
      },
      {
        label: "邮箱输入",
        description: "带占位符的输入",
        node: { id: "-", type: "input", properties: { className: "w-full rounded-md border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-slate-900 focus:outline-none" }, attributes: { placeholder: "your@email.com", type: "email" } },
      },
      {
        label: "提交按钮",
        description: "用于提交表单",
        node: { id: "-", type: "text", properties: { text: "提交", className: "inline-flex items-center justify-center rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800" } },
      },
    ],
  },
];

function PaletteGroup({ title, items, onInsert }: { title: string; items: PaletteItem[]; onInsert: (node: ComponentNode) => void }) {
  return (
    <section className="space-y-2">
      <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">{title}</h3>
      <div className="grid gap-2">
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => onInsert(item.node)}
            className="flex flex-col items-start rounded-lg border border-slate-200 bg-white px-3 py-2 text-left transition hover:border-slate-300 hover:shadow-sm"
          >
            <span className="text-sm font-medium text-slate-800">{item.label}</span>
            <span className="text-xs text-slate-500">{item.description}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export function LeftPanel() {
  const insertNode = useDesignerStore((state) => state.insertNode);
  const [term, setTerm] = useState("");

  const filtered = useMemo(() => {
    if (!term.trim()) return palette;
    const keyword = term.trim().toLowerCase();
    return palette
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => item.label.toLowerCase().includes(keyword) || item.description.toLowerCase().includes(keyword)),
      }))
      .filter((group) => group.items.length > 0);
  }, [term]);

  const handleInsert = (node: ComponentNode) => {
    insertNode(node);
  };

  return (
    <div className="flex h-full flex-col gap-4">
      <div>
        <label className="text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">组件搜索</label>
        <input
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          placeholder="输入关键字..."
          className="mt-2 w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
        />
      </div>
      <div className="flex-1 space-y-6 overflow-y-auto pr-2">
        {filtered.length === 0 ? (
          <p className="text-xs text-slate-500">没有找到匹配项，尝试使用其他关键词。</p>
        ) : (
          filtered.map((group) => (
            <PaletteGroup key={group.title} title={group.title} items={group.items} onInsert={handleInsert} />
          ))
        )}
      </div>
    </div>
  );
}
