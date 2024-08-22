module.exports = {
  testEnvironment: "jsdom",
  testMatch: ["**/?(*.)+(spec|test).ts?(x)"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/?(*.)+(spec|test).ts?(x)",
    "!src/**/*.{spec,test}.tsx",
    "!src/pages/_app.tsx",
    "!src/pages/_document.tsx",
  ],

  setupFilesAfterEnv: ["<rootDir>/.jest/setup.ts"],

  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },

  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/.jest/mocks/file.js",
  },
};
