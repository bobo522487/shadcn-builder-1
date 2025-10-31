import { FormComponentModel } from "@/models/FormComponent";
import { TemplateData } from "@/types/form-builder.types";

interface RawTemplateEntry {
  formTitle: string;
  formDescription: string;
  tags: string[];
  category: string;
  components: unknown[];
}

interface TemplateFile {
  [key: string]: RawTemplateEntry;
}

function ensureTemplateData(template: RawTemplateEntry | undefined, templateKey?: string): RawTemplateEntry {
  if (!template || typeof template !== "object") {
    throw new Error(`Template not found: ${templateKey ?? "default"}`);
  }

  if (!Array.isArray(template.components)) {
    throw new Error(`Template components invalid for ${templateKey ?? "default"}`);
  }

  return template;
}

export async function fetchTemplate(
  templateName: string,
  templateKey?: string
): Promise<TemplateData> {
  const response = await fetch(`/templates/${templateName}.json`);

  if (!response.ok) {
    throw new Error(`Failed to load template: ${templateName} (status ${response.status})`);
  }

  const templateData: TemplateFile = await response.json();
  const selectedKey = templateKey ?? Object.keys(templateData)[0];
  const template = ensureTemplateData(templateData[selectedKey], selectedKey);

  return {
    components: template.components.map((component) => new FormComponentModel(component as any)),
    formTitle: template.formTitle,
    formDescription: template.formDescription,
    tags: template.tags ?? [],
    category: template.category,
  };
}
