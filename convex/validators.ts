import { z } from "zod";

const viewportEnum = z.enum(["sm", "md", "lg"]);

export interface FormComponentPayload {
  id: string;
  type: string;
  category?: string;
  attributes?: Record<string, unknown>;
  properties?: {
    style?: Record<string, unknown>;
    [key: string]: unknown;
  } & Record<string, unknown>;
  overrides?: Partial<Record<z.infer<typeof viewportEnum>, Record<string, unknown>>>;
  children?: FormComponentPayload[];
}

export const componentSchema: z.ZodType<FormComponentPayload> = z.lazy(() =>
  z.object({
    id: z.string().min(1, "Component id is required"),
    type: z.string().min(1, "Component type is required"),
    category: z.string().optional(),
    attributes: z.record(z.any()).optional(),
    properties: z
      .object({
        style: z.record(z.any()).optional(),
      })
      .catchall(z.any())
      .optional(),
    overrides: z
      .record(viewportEnum, z.record(z.any()))
      .optional(),
    children: z.lazy(() => componentSchema.array()).optional(),
  })
);

export const formComponentsSchema = z.array(componentSchema);

export type FormComponentsPayload = z.infer<typeof formComponentsSchema>;
