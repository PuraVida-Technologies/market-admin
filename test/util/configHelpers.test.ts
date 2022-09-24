// @ts-nocheck
import {
  parseEnvString,
  parseEnvNumber,
  parseEnvEnabler,
} from "@/util/configHelpers";
import InvalidEnvironmentVariableError from "@/errors/InvalidEnvironmentVariableError";
import MissingEnvironmentVariableError from "@/errors/MissingEnvironmentVariableError";

describe("configHelpers", () => {
  describe("parseEnvEnabler()", () => {
    it("should parse enabled strings as expected", () => {
      const testValue = "enabled";
      const result = parseEnvEnabler("TEST", testValue);
      expect(typeof result).toBe("boolean");
      expect(result).toEqual(true);
    });

    it("should parse disabled strings as expected", () => {
      const testValue = "off";
      const result = parseEnvEnabler("TEST", testValue);
      expect(typeof result).toBe("boolean");
      expect(result).toEqual(false);
    });

    it("should return false for unknown values", () => {
      const testValue = "_an_invalid_value_";
      const result = parseEnvEnabler("TEST", testValue);
      expect(typeof result).toBe("boolean");
      expect(result).toEqual(false);
    });

    it("should throw an error for undefined values", () => {
      expect(() => {
        parseEnvEnabler("TEST");
      }).toThrow(MissingEnvironmentVariableError);
    });

    it("should throw an error for null values", () => {
      expect(() => {
        parseEnvEnabler("TEST", null);
      }).toThrow(MissingEnvironmentVariableError);
    });

    it("should throw an error for the '_required' value", () => {
      expect(() => {
        parseEnvEnabler("TEST", "_required_");
      }).toThrow(MissingEnvironmentVariableError);
    });
  });

  describe("parseEnvNumber()", () => {
    it("should parse numbers as expected", () => {
      const testValue = "1";
      const result = parseEnvNumber("TEST", testValue);
      expect(typeof result).toBe("number");
      expect(result).toEqual(1);
    });

    it("should throw an error for undefined values", () => {
      expect(() => {
        parseEnvNumber("TEST");
      }).toThrow(MissingEnvironmentVariableError);
    });

    it("should throw an error for null values", () => {
      expect(() => {
        parseEnvNumber("TEST", null);
      }).toThrow(MissingEnvironmentVariableError);
    });

    it("should throw an error for the '_required' value", () => {
      expect(() => {
        parseEnvNumber("TEST", "_required_");
      }).toThrow(MissingEnvironmentVariableError);
    });

    it("should throw an error for non-numeric values", () => {
      expect(() => {
        parseEnvNumber("TEST", "abc");
      }).toThrow(InvalidEnvironmentVariableError);
    });
  });

  describe("parseEnvString()", () => {
    it("should parse strings as expected", () => {
      const testValue = "hello";
      const result = parseEnvString("TEST", testValue);
      expect(result).toBeString();
      expect(result).toEqual(testValue);
    });

    it("should throw an error for undefined values", () => {
      expect(() => {
        parseEnvString("TEST");
      }).toThrow(MissingEnvironmentVariableError);
    });

    it("should throw an error for null values", () => {
      expect(() => {
        parseEnvString("TEST", null);
      }).toThrow(MissingEnvironmentVariableError);
    });

    it("should throw an error for the '_required' value", () => {
      expect(() => {
        parseEnvString("TEST", "_required_");
      }).toThrow(MissingEnvironmentVariableError);
    });
  });
});
