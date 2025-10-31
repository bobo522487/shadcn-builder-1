"use client";
import React from "react";
import { Monitor, Smartphone, Tablet, PanelsTopLeft, Redo2, Undo2 } from "lucide-react";
import { useDesignerStore } from "../state/store";

const viewportItems: { value: "sm" | "md" | "lg"; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: "sm", label: "移动端", icon: Smartphone },
  { value: "md", label: "平板", icon: Tablet },
  { value: "lg", label: "桌面", icon: Monitor },
];

function ToolbarButton({ icon: Icon, label, shortcut, onClick, disabled, active }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  shortcut?: string;
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-1 rounded-md border px-2 py-1 text-xs transition ${
        active
          ? "border-slate-900 bg-slate-900 text-white"
          : disabled
          ? "cursor-not-allowed opacity-50"
          : "hover:bg-slate-100"
      }`}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>{label}</span>
      {shortcut ? <span className="text-[10px] text-slate-500">{shortcut}</span> : null}
    </button>
  );
}

function ViewportSwitch() {
  const viewport = useDesignerStore((state) => state.viewport);
  const setViewport = useDesignerStore((state) => state.setViewport);
  return (
    <div className="flex items-center gap-1 rounded-md border px-1 py-1">
      {viewportItems.map((item) => {
        const Icon = item.icon;
        const active = item.value === viewport;
        return (
          <button
            key={item.value}
            type="button"
            onClick={() => setViewport(item.value)}
            className={`flex items-center gap-1 rounded px-2 py-1 text-xs transition ${
              active ? "bg-slate-900 text-white" : "hover:bg-slate-100"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            <span>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function Header({ onToggleJson, jsonVisible }: { onToggleJson?: () => void; jsonVisible?: boolean }) {
  const undo = useDesignerStore((state) => state.undo);
  const redo = useDesignerStore((state) => state.redo);
  const canUndo = useDesignerStore((state) => state.history.past.length > 0);
  const canRedo = useDesignerStore((state) => state.history.future.length > 0);
  return (
    <div className="flex h-14 shrink-0 items-center gap-3 border-b bg-white/80 px-4 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="text-sm font-medium">Form Designer</div>
      <div className="flex items-center gap-2">
        <ToolbarButton icon={Undo2} label="撤销" shortcut="⌘/Ctrl Z" onClick={undo} disabled={!canUndo} />
        <ToolbarButton icon={Redo2} label="重做" shortcut="⇧⌘/Ctrl Z" onClick={redo} disabled={!canRedo} />
      </div>
      <div className="ml-auto flex items-center gap-2">
        <ViewportSwitch />
        <ToolbarButton
          icon={PanelsTopLeft}
          label={jsonVisible ? "隐藏 JSON" : "查看 JSON"}
          onClick={onToggleJson}
          active={jsonVisible}
        />
      </div>
    </div>
  );
}
