// @ts-nocheck

import { flexPercent } from "@/util/layout";

describe("layout", () => {
  describe("flexPercent()", () => {
    it("should calculate flex values as expected", () => {
      const testValues = {
        a: 1,
        b: 2,
        c: 4,
        d: 1,
      };
      const result = flexPercent(testValues);
      expect(result.a).toEqual("13%");
      expect(result.b).toEqual("25%");
      expect(result.c).toEqual("50%");
      expect(result.d).toEqual("13%");
    });
  });
});
