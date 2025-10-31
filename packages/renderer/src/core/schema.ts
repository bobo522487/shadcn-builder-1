export type Viewport = "sm" | "md" | "lg";

export interface FormStyle {
  colSpan?: string;
  [k: string]: unknown;
}

export interface ComponentBase {
  id: string;
  type: string;
  category?: string;
  attributes?: Record<string, unknown>;
  properties?: {
    style?: FormStyle;
    [k: string]: unknown;
  };
  overrides?: Partial<Record<Viewport, Partial<ComponentBase>>>;
  children?: ComponentNode[];
}

export type ComponentNode = ComponentBase;

export interface FormSchema {
  formTitle?: string;
  components: ComponentNode[];
}

export interface RenderContext {
  viewport?: Viewport;
}
