const FALLBACK_ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";

function fallbackRandomId(): string {
  let id = "";
  for (let i = 0; i < 16; i++) {
    id += FALLBACK_ALPHABET[Math.floor(Math.random() * FALLBACK_ALPHABET.length)];
  }
  return id;
}

export function createComponentId(prefix?: string): string {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
      const uuid = crypto.randomUUID();
      return prefix ? `${prefix}-${uuid}` : uuid;
    }
  } catch (error) {
    // Ignore and fall back
  }

  return prefix ? `${prefix}-${fallbackRandomId()}` : fallbackRandomId();
}
