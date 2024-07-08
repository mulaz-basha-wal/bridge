/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ["<rootDir>/src/test"],
  testPathIgnorePatterns: ["/node_modules"],
  moduleNameMapper: {
    "@src": "<rootDir>/src",
    "@routes": "<rootDir>/src/routes",
  },
  moduleFileExtensions: ["js", "ts"],
  clearMocks: true
};