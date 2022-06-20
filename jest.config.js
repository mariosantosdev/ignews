// Add any custom config to be passed to Jest
const customJestConfig = {
  testPathIgnorePatterns: ["node_modules", "/.next/"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    "^@/styles/(.*)$": "<rootDir>/src/styles/$1",
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/services/(.*)$": "<rootDir>/src/services/$1",
  },
  testEnvironment: "jsdom",
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = customJestConfig;
