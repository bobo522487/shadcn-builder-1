"use client";
import React, { useEffect, useMemo, useState } from "react";
import { ComponentRegistry, type FormSchema } from "@shadcn-builder/renderer";
import { useDesignerStore } from "./state/store";
import { useSchemaCommands } from "./state/commands";
import { LeftPanel } from "./panels/LeftPanel";
import { RightPanel } from "./panels/RightPanel";
import { Canvas } from "./Canvas";
import { Header } from "./ui/Header";

function isEditingElement(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  const editable = target.closest("input, textarea, select, [contenteditable=true]");
  return Boolean(editable);
}

export function Designer({
  value,
  defaultValue,
  onChange,
  registry,
  viewport = "sm",
  showJSON,
}: {
  value?: FormSchema;
  defaultValue?: FormSchema;
  onChange?: (next: FormSchema) => void;
  registry: ComponentRegistry;
  viewport?: "sm" | "md" | "lg";
  showJSON?: boolean;
}) {
  const schema = useDesignerStore((state) => state.schema);
  const setSchema = useDesignerStore((state) => state.setSchema);
  const setViewport = useDesignerStore((state) => state.setViewport);
  const currentViewport = useDesignerStore((state) => state.viewport);
  const { duplicate, remove, clearSelection } = useSchemaCommands();

  const [jsonVisible, setJsonVisible] = useState(Boolean(showJSON));
  const isControlled = value !== undefined;

  useEffect(() => {
    setViewport(viewport);
  }, [viewport, setViewport]);

  useEffect(() => {
    if (showJSON !== undefined) {
      setJsonVisible(Boolean(showJSON));
    }
  }, [showJSON]);

  useEffect(() => {
    if (!isControlled && defaultValue) {
      setSchema(defaultValue, { pushHistory: false, clearFuture: true });
    }
  }, [isControlled, defaultValue, setSchema]);

  useEffect(() => {
    if (isControlled) {
      const next = value ?? { components: [] };
      setSchema(next, { pushHistory: false, clearFuture: false });
    }
  }, [isControlled, value, setSchema]);

  useEffect(() => {
    if (!isControlled && onChange) {
      onChange(schema);
    }
  }, [schema, isControlled, onChange]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isEditingElement(event.target)) return;
      const key = event.key.toLowerCase();
      const isMod = event.metaKey || event.ctrlKey;
      const state = useDesignerStore.getState();
      if (isMod && !event.shiftKey && key === "z") {
        event.preventDefault();
        state.undo();
        return;
      }
      if ((isMod && event.shiftKey && key === "z") || (isMod && key === "y")) {
        event.preventDefault();
        state.redo();
        return;
      }
      if (isMod && key === "d" && state.selectedId) {
        event.preventDefault();
        duplicate(state.selectedId);
        return;
      }
      if (key === "escape") {
        event.preventDefault();
        clearSelection();
        return;
      }
      if ((key === "delete" || key === "backspace") && state.selectedId) {
        event.preventDefault();
        remove(state.selectedId);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [clearSelection, duplicate, remove]);

  const schemaPreview = useMemo(() => JSON.stringify(schema, null, 2), [schema]);

  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden">
      <Header onToggleJson={() => setJsonVisible((prev) => !prev)} jsonVisible={jsonVisible} />
      <div className="flex min-h-0 flex-1 bg-slate-100">
        <aside className="hidden w-[260px] shrink-0 border-r bg-white/70 backdrop-blur md:block">
          <div className="h-full overflow-y-auto p-4">
            <LeftPanel />
          </div>
        </aside>
        <main className="flex-1 overflow-auto p-6">
          <Canvas registry={registry} viewport={currentViewport} />
        </main>
        <aside className="hidden w-[320px] shrink-0 border-l bg-white md:block">
          <div className="h-full overflow-y-auto p-4">
            <RightPanel />
          </div>
        </aside>
      </div>
      {jsonVisible ? (
        <div className="pointer-events-auto absolute right-6 top-24 z-40 w-[420px] overflow-hidden rounded-xl border bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b px-3 py-2 text-xs font-medium text-slate-500">
            <span>Schema JSON</span>
            <button
              type="button"
              className="text-slate-500 transition hover:text-slate-900"
              onClick={() => setJsonVisible(false)}
            >
              关闭
            </button>
          </div>
          <pre className="h-[50vh] overflow-auto bg-slate-950 p-4 text-[11px] leading-relaxed text-slate-100">
            {schemaPreview}
          </pre>
        </div>
      ) : null}
    </div>
  );
}
