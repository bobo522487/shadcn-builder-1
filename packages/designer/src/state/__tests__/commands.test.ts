import { describe, it, expect, beforeEach, afterEach } from "vitest";
import type { ComponentNode } from "@shadcn-builder/renderer";
import { act } from "@testing-library/react";
import { getCommandsForTesting, resetDesignerStore, buildTestSchema } from "../test-utils";
import { useDesignerStore } from "../store";

describe("createSchemaCommands", () => {
  beforeEach(() => {
    resetDesignerStore({
      schema: buildTestSchema([{ id: "a" }]),
      selectedId: "a",
    });
  });

  afterEach(() => {
    resetDesignerStore();
  });

  it("clearSelection 调用 select(null)", () => {
    const commands = getCommandsForTesting();
    act(() => {
      commands.clearSelection();
    });
    expect(useDesignerStore.getState().selectedId).toBeNull();
  });

  it("duplicate 更新选中项并插入节点，可撤销", () => {
    const commands = getCommandsForTesting();
    act(() => {
      commands.duplicate("a");
    });
    const state = useDesignerStore.getState();
    expect(state.schema.components).toHaveLength(2);
    expect(state.selectedId).not.toBe("a");
    act(() => {
      state.undo();
    });
    const afterUndo = useDesignerStore.getState();
    expect(afterUndo.schema.components).toHaveLength(1);
    expect(afterUndo.selectedId === null || afterUndo.selectedId === "a").toBe(true);
  });

  it("remove 删除目标并清除选中，但删除其他节点时保持选中", () => {
    resetDesignerStore({
      schema: buildTestSchema([{ id: "a" }, { id: "b" }]),
      selectedId: "a",
    });
    const commands = getCommandsForTesting();
    act(() => {
      commands.remove("b");
    });
    expect(useDesignerStore.getState().selectedId).toBe("a");
    act(() => {
      commands.remove("a");
    });
    expect(useDesignerStore.getState().selectedId).toBeNull();
  });

  it("reorder 调整顺序并支持撤销", () => {
    resetDesignerStore({
      schema: buildTestSchema([{ id: "a" }, { id: "b" }, { id: "c" }]),
    });
    const commands = getCommandsForTesting();
    act(() => {
      commands.reorder(0, 2);
    });
    expect(useDesignerStore.getState().schema.components.map((c) => c.id)).toEqual(["b", "c", "a"]);
    act(() => {
      useDesignerStore.getState().undo();
    });
    expect(useDesignerStore.getState().schema.components.map((c) => c.id)).toEqual(["a", "b", "c"]);
  });

  it("insert 选择新组件并可撤销", () => {
    const commands = getCommandsForTesting();
    act(() => {
      commands.insert({ id: "b", type: "text" } as ComponentNode);
    });
    expect(useDesignerStore.getState().schema.components.map((c) => c.id)).toEqual(["a", "b"]);
    expect(useDesignerStore.getState().selectedId).toBe("b");
    act(() => {
      useDesignerStore.getState().undo();
    });
    expect(useDesignerStore.getState().schema.components.map((c) => c.id)).toEqual(["a"]);
    expect(useDesignerStore.getState().selectedId === null || useDesignerStore.getState().selectedId === "a").toBe(true);
  });
});
