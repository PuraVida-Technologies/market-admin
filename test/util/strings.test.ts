// @ts-nocheck

import { indicatesEnabled } from "@/util/strings";

describe("strings", () => {
  describe("indicatesEnabled()", () => {
    it("should return false when provided a known 'disabled' value", () => {
      ["0", "off", "disable", "disabled", "no", "n", "false"].forEach((str) => {
        expect(indicatesEnabled(str, true)).toEqual(false);
      });
    });

    it("should return true when provided a known 'enabled' value", () => {
      ["1", "on", "enable", "enabled", "yes", "y", "true"].forEach((str) => {
        expect(indicatesEnabled(str, false)).toEqual(true);
      });
    });

    it("should return the default when an unknown value is passed", () => {
      expect(indicatesEnabled("unknown_value", false)).toEqual(false);
      expect(indicatesEnabled("unknown_value", true)).toEqual(true);
      expect(indicatesEnabled("unknown_value")).toEqual(false);
    });
  });
});
