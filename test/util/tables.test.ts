// @ts-nocheck

import { setKeyField } from "@/util/tables";

describe("tables", () => {
  describe("setKeyField()", () => {
    it("should duplicate the provided property to 'key'", () => {
      const testObj = [
        {
          a: 1,
          b: 2,
          c: 3,
        },
      ];
      const result = setKeyField(testObj, "b");
      expect(result[0].key).toEqual(2 + `${0}`);
    });
  });
});
