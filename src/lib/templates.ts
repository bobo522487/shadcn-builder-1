import { TemplateData } from "@/types/form-builder.types";
import { loadTemplatePayload, RawTemplateEntry } from "@/services/template-service";

function toTemplateData(entry: RawTemplateEntry): TemplateData {
  return {
    components: entry.components.map((component) => JSON.parse(JSON.stringify(component))),
    formTitle: entry.formTitle,
    formDescription: entry.formDescription,
    tags: entry.tags ?? [],
    category: entry.category,
  };
}

export async function fetchTemplate(
  templateName: string,
  templateKey?: string
): Promise<TemplateData> {
  const entry = await loadTemplatePayload(templateName, templateKey);
  return toTemplateData(entry);
}

export function mapTemplateEntry(entry: RawTemplateEntry): TemplateData {
  return toTemplateData(entry);
}
