import { ComponentNode, RenderContext } from "./schema";

export type ComponentRender = (node: ComponentNode, ctx: RenderContext) => React.ReactNode;

export class ComponentRegistry {
  private map = new Map<string, ComponentRender>();
  register(type: string, render: ComponentRender) {
    this.map.set(type, render);
  }
  get(type: string) {
    return this.map.get(type);
  }
}
