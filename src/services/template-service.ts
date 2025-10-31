import { z } from "zod";

const TemplateComponentSchema = z.record(z.any());

const TemplateEntrySchema = z.object({
  formTitle: z.string().default(""),
  formDescription: z.string().default(""),
  tags: z.array(z.string()).default([]),
  category: z.string().default("general"),
  components: z.array(TemplateComponentSchema),
});

const TemplateFileSchema = z.record(TemplateEntrySchema);

export type RawTemplateEntry = z.infer<typeof TemplateEntrySchema>;

const templateCache = new Map<string, RawTemplateEntry>();

function cacheKey(name: string, key?: string): string {
  return `${name}:${key ?? "default"}`;
}

async function fetchTemplateFile(templateName: string): Promise<Record<string, RawTemplateEntry>> {
  const response = await fetch(`/templates/${templateName}.json`);
  if (!response.ok) {
    throw new Error(`Failed to load template: ${templateName} (status ${response.status})`);
  }
  const json = await response.json();
  return TemplateFileSchema.parse(json);
}

export async function loadTemplatePayload(templateName: string, templateKey?: string): Promise<RawTemplateEntry> {
  const key = cacheKey(templateName, templateKey);
  if (templateCache.has(key)) {
    return templateCache.get(key)!;
  }

  const file = await fetchTemplateFile(templateName);
  const selectedKey = templateKey ?? Object.keys(file)[0];
  if (!selectedKey || !file[selectedKey]) {
    throw new Error(`Template not found: ${templateName}/${templateKey ?? "default"}`);
  }

  const entry = file[selectedKey];
  templateCache.set(key, entry);
  return entry;
}

export function clearTemplateCache(): void {
  templateCache.clear();
}
