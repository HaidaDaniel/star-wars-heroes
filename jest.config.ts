// eslint-disable-next-line import/no-anonymous-default-export
export default {
  testEnvironment: "jsdom",
  preset: "ts-jest",
  transform: { "^.+\\.ts?$": "ts-jest" },
  setupFilesAfterEnv: ["./src/setupTests.ts"],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/src/test-utils.tsx",
  ],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
};
