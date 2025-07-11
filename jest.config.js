const preset = require("jest-expo/jest-preset");

module.exports = {
  ...preset,
  preset: "jest-expo",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/__tests__/**",
    "!src/**/mocks/**",
    "!src/**/*.d.ts",
  ],
};
