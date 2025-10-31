import { expect } from "vitest";

// 在 ESM 环境下显式导入 vitest globals，确保 describe/test 等可用
const { describe, test, beforeEach, afterEach, beforeAll, afterAll } = globalThis as typeof globalThis & {
  describe: typeof globalThis extends { describe: infer T } ? T : undefined;
  test: typeof globalThis extends { test: infer T } ? T : undefined;
  beforeEach: typeof globalThis extends { beforeEach: infer T } ? T : undefined;
  afterEach: typeof globalThis extends { afterEach: infer T } ? T : undefined;
  beforeAll: typeof globalThis extends { beforeAll: infer T } ? T : undefined;
  afterAll: typeof globalThis extends { afterAll: infer T } ? T : undefined;
};

if (!describe || !test) {
  throw new Error("Vitest globals are not available in the current environment.");
}

export { describe, test, expect, beforeEach, afterEach, beforeAll, afterAll };
