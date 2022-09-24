/* eslint-disable @typescript-eslint/no-var-requires */
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customSettings = {
  collectCoverage: true,
  collectCoverageFrom: ["./src/**/*.ts", "!./src/errors/*.ts"],
  coverageThreshold: {
    global: {
      lines: 90,
    },
  },
  moduleDirectories: ["node_modules", "<rootDir>/src"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@mocks/(.*)$": "<rootDir>/test/mocks/$1",
    "^@mock-data/(.*)$": "<rootDir>/test/mocks/data/$1",
    "^jsonpath-plus$":
      "<rootDir>/node_modules/jsonpath-plus/dist/index-node-cjs.cjs",
  },
  preset: "ts-jest",
  setupFilesAfterEnv: ["jest-extended/all", "<rootDir>/test/jest.setup.ts"],
  testEnvironment: "node",
  testPathIgnorePatterns: ["node_modules", "dist"],
  transform: {
    "\\.[jt]sx?$": "babel-jest",
  },
};

module.exports = createJestConfig(customSettings);
