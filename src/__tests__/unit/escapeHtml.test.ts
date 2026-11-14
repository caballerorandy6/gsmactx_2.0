import { describe, it, expect } from "vitest";
import { escapeHtml } from "@/lib/utils/escapeHtml";

describe("escapeHtml", () => {
  it("escapes the five HTML-significant characters", () => {
    expect(escapeHtml(`<a href="x" onclick='y'>&</a>`)).toBe(
      "&lt;a href=&quot;x&quot; onclick=&#39;y&#39;&gt;&amp;&lt;/a&gt;"
    );
  });

  it("leaves plain text untouched", () => {
    expect(escapeHtml("John Smith, 123 Main St")).toBe("John Smith, 123 Main St");
  });

  it("does not double-escape order-sensitive ampersands", () => {
    expect(escapeHtml("&lt;")).toBe("&amp;lt;");
  });
});
