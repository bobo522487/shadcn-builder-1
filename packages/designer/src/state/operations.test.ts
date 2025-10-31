import type { ComponentNode, FormSchema } from "@shadcn-builder/renderer";
import { describe, it, expect } from "vitest";
import {
  insertComponent,
  updateComponent,
  removeComponentById,
  duplicateComponent,
  reorderComponents,
} from "./operations";
import { buildTestSchema } from "./test-utils";

describe("operations", () => {
  it("insertComponent 在指定位置插入并返回 id", () => {
    const schema = buildTestSchema([{ id: "a" }, { id: "b" }]);
    const insertedId = insertComponent(schema, { id: "c", type: "text" } as ComponentNode, { index: 1 });
    expect(insertedId).toBe("c");
    expect(schema.components.map((c) => c.id)).toEqual(["a", "c", "b"]);
  });

  it("updateComponent 替换指定节点内容", () => {
    const schema = buildTestSchema([{ id: "a", properties: { text: "old" } }]);
    updateComponent(schema, "a", (node) => ({ ...node, properties: { text: "new" } } as ComponentNode));
    expect((schema.components[0].properties as any).text).toBe("new");
  });

  it("removeComponentById 删除并维持剩余顺序", () => {
    const schema = buildTestSchema([{ id: "a" }, { id: "b" }, { id: "c" }]);
    const removed = removeComponentById(schema, "b");
    expect(removed).toBe(true);
    expect(schema.components.map((c) => c.id)).toEqual(["a", "c"]);
  });

  it("duplicateComponent 复制节点并返回新 id", () => {
    const schema = buildTestSchema([{ id: "a" }, { id: "b" }]);
    const duplicatedId = duplicateComponent(schema, "a");
    expect(duplicatedId).toBeDefined();
    expect(schema.components.map((c) => c.id)).toEqual(["a", duplicatedId, "b"]);
  });

  it("reorderComponents 调整顺序并保持数量不变", () => {
    const schema = buildTestSchema([{ id: "a" }, { id: "b" }, { id: "c" }]);
    reorderComponents(schema, 0, 2);
    expect(schema.components.map((c) => c.id)).toEqual(["b", "c", "a"]);
  });
});
