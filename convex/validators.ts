import { z } from "zod";

const viewportEnum = z.enum(["sm", "md", "lg"]);

export const componentSchema: z.ZodType<Record<string, unknown>> = z.lazy(() =>
  z.object({
    id: z.string().min(1, "Component id is required"),
    type: z.string().min(1, "Component type is required"),
    category: z.string().optional(),
    attributes: z.record(z.any()).optional(),
    properties: z
      .object({
        style: z.record(z.any()).optional(),
      })
      .passthrough()
      .optional(),
    overrides: z
      .record(viewportEnum, z.record(z.any()))
      .optional(),
    children: z.lazy(() => componentSchema.array()).optional(),
  })
);

export const formComponentsSchema = z.array(componentSchema);
