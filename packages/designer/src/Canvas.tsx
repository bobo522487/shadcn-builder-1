"use client";
import React, { useCallback, useMemo } from "react";
import { ComponentRegistry, Renderer, type FormSchema, type ComponentNode } from "@shadcn-builder/renderer";
import { useDesignerStore } from "./state/store";
import { useSchemaCommands } from "./state/commands";
import { DndContext, PointerSensor, useSensor, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Copy, GripVertical, Trash2 } from "lucide-react";
import { computeRows, GRID_COLUMNS, getSpan } from "./utils/grid";

const viewportEditorStyles: Record<"sm" | "md" | "lg", string> = {
  sm: "w-[360px]",
  md: "w-[768px]",
  lg: "w-[1024px]",
};

interface SortableCardProps {
  node: ComponentNode;
  selected: boolean;
  onSelect: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  children: React.ReactNode;
}

function SortableCard({ node, selected, onSelect, onDuplicate, onDelete, children }: SortableCardProps) {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({ id: node.id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <article
      ref={setNodeRef}
      style={style}
      onClick={(event) => {
        event.stopPropagation();
        onSelect();
      }}
      className={`relative flex h-full flex-col overflow-hidden rounded-xl border bg-white text-left shadow-sm transition ${
        selected ? "border-slate-900 ring-2 ring-slate-900/30" : "border-slate-200"
      } ${isDragging ? "scale-[1.01] shadow-lg" : ""}`}
    >
      <header className="flex items-center justify-between border-b bg-slate-50/60 px-3 py-2 text-[11px] uppercase tracking-wide text-slate-500">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-6 w-6 items-center justify-center rounded border bg-white text-slate-500 transition hover:bg-slate-100"
            onClick={(event) => {
              event.stopPropagation();
            }}
            {...listeners}
            {...attributes}
          >
            <GripVertical className="h-3 w-3" />
          </button>
          <span className="font-medium text-slate-600">{node.type}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="rounded bg-white px-1.5 py-0.5 text-[10px] text-slate-500">span {getSpan(node)}</span>
          <button
            type="button"
            className="flex h-6 w-6 items-center justify-center rounded border bg-white text-slate-500 transition hover:bg-slate-100"
            onClick={(event) => {
              event.stopPropagation();
              onDuplicate();
            }}
          >
            <Copy className="h-3 w-3" />
          </button>
          <button
            type="button"
            className="flex h-6 w-6 items-center justify-center rounded border bg-white text-red-500 transition hover:bg-red-50"
            onClick={(event) => {
              event.stopPropagation();
              onDelete();
            }}
          >
            <Trash2 className="h-3 w-3" />
          </button>
        </div>
      </header>
      <div className="flex-1 bg-white px-4 py-5 text-sm text-slate-700">{children}</div>
    </article>
  );
}

export function Canvas({ registry, viewport }: { registry: ComponentRegistry; viewport: "sm" | "md" | "lg" }) {
  const schema = useDesignerStore((state) => state.schema);
  const selectedId = useDesignerStore((state) => state.selectedId);
  const select = useDesignerStore((state) => state.select);
  const { reorder, duplicate, remove, clearSelection } = useSchemaCommands();

  const ids = useMemo(() => schema.components.map((component) => component.id), [schema.components]);
  const rows = useMemo(() => computeRows(schema.components), [schema.components]);
  const pointer = useSensor(PointerSensor, { activationConstraint: { distance: 6 } });
  const sensors = useMemo(() => [pointer], [pointer]);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over) {
        if (selectedId === active.id) clearSelection();
        return;
      }
      if (active.id === over.id) return;
      const fromIndex = ids.indexOf(active.id as string);
      const toIndex = ids.indexOf(over.id as string);
      if (fromIndex === -1 || toIndex === -1) return;
      reorder(fromIndex, toIndex);
    },
    [clearSelection, ids, reorder, selectedId]
  );

  const handleDuplicate = useCallback(
    (id: string) => {
      duplicate(id);
    },
    [duplicate]
  );

  const handleDelete = useCallback(
    (id: string) => {
      remove(id);
    },
    [remove]
  );

  const handleBackgroundClick = useCallback(() => {
    clearSelection();
  }, [clearSelection]);

  return (
    <div className="flex justify-center">
      <div
        className={`relative mx-auto flex w-full max-w-full flex-col gap-4 rounded-2xl border bg-white/90 p-6 shadow-inner ${viewportEditorStyles[viewport]}`}
        onClick={handleBackgroundClick}
      >
        <div className="text-xs text-slate-500">
          拖拽组件可重新排序，列宽会自动均分；在右侧属性面板中调整样式与布局。
        </div>
        {schema.components.length === 0 ? (
          <div className="flex min-h-[320px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/80 text-center text-sm text-slate-500">
            <p className="max-w-[220px] leading-relaxed">左侧选择组件进行添加，或拖拽已有组件以调整顺序。</p>
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={ids} strategy={verticalListSortingStrategy}>
              <div className="flex flex-col gap-4">
                {rows.map((row, rowIndex) => (
                  <div
                    key={`row-${rowIndex}`}
                    className="grid gap-3"
                    style={{ gridTemplateColumns: `repeat(${GRID_COLUMNS}, minmax(0, 1fr))` }}
                  >
                    {row.map((component) => {
                      const span = getSpan(component);
                      const selected = selectedId === component.id;
                      return (
                        <div
                          key={component.id}
                          style={{ gridColumn: `span ${span} / span ${span}` }}
                          className="relative"
                        >
                          <SortableCard
                            node={component}
                            selected={selected}
                            onSelect={() => select(component.id)}
                            onDuplicate={() => handleDuplicate(component.id)}
                            onDelete={() => handleDelete(component.id)}
                          >
                            <Renderer
                              schema={{ components: [component] } as FormSchema}
                              registry={registry}
                              context={{ viewport }}
                            />
                          </SortableCard>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>
    </div>
  );
}
