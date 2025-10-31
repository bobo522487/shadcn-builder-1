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

const memoryCache = new Map<string, RawTemplateEntry>();
const STORAGE_PREFIX = "shadcn-template:";

function getStorage(): Storage | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    return window.localStorage ?? window.sessionStorage ?? null;
  } catch {
    return null;
  }
}

function readFromStorage(key: string): RawTemplateEntry | null {
  const storage = getStorage();
  if (!storage) return null;
  try {
    const value = storage.getItem(`${STORAGE_PREFIX}${key}`);
    if (!value) return null;
    const parsed = JSON.parse(value);
    return TemplateEntrySchema.parse(parsed);
  } catch {
    return null;
  }
}

function writeToStorage(key: string, entry: RawTemplateEntry): void {
  const storage = getStorage();
  if (!storage) return;
  try {
    storage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(entry));
  } catch {
    // Swallow storage errors silently (quota exceeded, etc.)
  }
}

function removeFromStorage(key: string): void {
  const storage = getStorage();
  if (!storage) return;
  try {
    storage.removeItem(`${STORAGE_PREFIX}${key}`);
  } catch {
    // ignore
  }
}

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
  if (memoryCache.has(key)) {
    return memoryCache.get(key)!;
  }

  const storedEntry = readFromStorage(key);
  if (storedEntry) {
    memoryCache.set(key, storedEntry);
    return storedEntry;
  }

  try {
    const file = await fetchTemplateFile(templateName);
    const selectedKey = templateKey ?? Object.keys(file)[0];
    if (!selectedKey || !file[selectedKey]) {
      throw new Error(`Template not found: ${templateName}/${templateKey ?? "default"}`);
    }

    const entry = file[selectedKey];
    memoryCache.set(key, entry);
    writeToStorage(key, entry);
    return entry;
  } catch (error) {
    const fallback = readFromStorage(key);
    if (fallback) {
      memoryCache.set(key, fallback);
      return fallback;
    }
    throw error;
  }
}

export function clearTemplateCache(): void {
  memoryCache.clear();
  const storage = getStorage();
  if (!storage) return;
  const keysToRemove: string[] = [];
  for (let i = 0; i < storage.length; i += 1) {
    const key = storage.key(i);
    if (key && key.startsWith(STORAGE_PREFIX)) {
      keysToRemove.push(key);
    }
  }
  keysToRemove.forEach((key) => {
    try {
      storage.removeItem(key);
    } catch {
      // ignore
    }
  });
}
