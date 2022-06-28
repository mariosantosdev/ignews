// Add any custom config to be passed to Jest
const customJestConfig = {
  testPathIgnorePatterns: ["node_modules", "/.next/"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    "\\.(scss|css|sass)$": "identity-obj-proxy",
    "^@styles/(.*)$": "<rootDir>/src/styles/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
  },
  testEnvironment: "jsdom",
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.tsx",
    "!src/**/_*.tsx",
    "!src/**/*.test.tsx",
    "!**/node_modules/**",
  ],
  coverageReporters: ["lcov", "json"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = customJestConfig;
