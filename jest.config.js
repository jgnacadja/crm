module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  testEnvironment: "jsdom",
  verbose: true,
  setupFiles: ['<rootDir>/setup.js'],
  moduleDirectories: ["node_modules", "src"],
  modulePaths: ["<rootDir>/src", "<rootDir>/node_modules"],
  moduleFileExtensions: ["js", "ts", "json", "node", "html"],
  transform: {
    "^[^.]+.vue$": "vue-jest",
    "^.+\\.js$": "babel-jest",
  },
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/__tests__/__mocks__/styleMock.js',
  },
  transformIgnorePatterns: ["node_modules/(?!(bootstrap-vue)/)"],
  testPathIgnorePatterns: [
    "/build/",
    "/config/",
    "/data/",
    "/dist/",
    "/node_modules/",
    "/test/",
    "/vendor/",
  ],
  globals: {
    NODE_ENV: "test",
  },
};
