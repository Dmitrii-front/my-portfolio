import { describe, expect, it } from "vitest";

import { isSiteLocale, siteConfig } from "./site-config";

describe("siteConfig", () => {
  it("keeps the baseline public locales explicit", () => {
    expect(siteConfig.locales).toEqual(["en", "ru"]);
    expect(isSiteLocale("ru")).toBe(true);
    expect(isSiteLocale("de")).toBe(false);
  });
});
