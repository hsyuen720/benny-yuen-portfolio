import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig: Config = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  moduleNameMapper: {
    "^~/components/(.*)$": "<rootDir>/src/components/$1",
    "^~/contexts/(.*)$": "<rootDir>/src/contexts/$1",
    "^~/hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^~/modules/(.*)$": "<rootDir>/src/modules/$1",
    "^~/settings/(.*)$": "<rootDir>/src/settings/$1",
    "^~/styles/(.*)$": "<rootDir>/src/styles/$1",
    "^~/types/(.*)$": "<rootDir>/src/types/$1",
    "^~/utils/(.*)$": "<rootDir>/src/utils/$1",
    "^react-icons/(.*)$": "<rootDir>/__mocks__/react-icons.ts",
    "\\.css\\.ts$": "identity-obj-proxy",
  },
  testMatch: ["**/__tests__/**/*.test.[jt]s?(x)"],
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.stories.{js,jsx,ts,tsx}",
    "!src/**/__tests__/**",
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig);
