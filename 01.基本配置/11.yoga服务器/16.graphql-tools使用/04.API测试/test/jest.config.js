/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  // 指定 Jest 运行环境为 node 环境. 可用的选项有 node、jsdom等
  testEnvironment: "node",
  moduleNameMapper: { "^/(.*)\\.js$": "./$1" },
  // 指定 Jest 在运行测试文件之前，将 TypeScript 文件转换为 JavaScript 文件
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  // 告诉 Jest 我们使用 TypeScript 和 JavaScript 文件作为模块。
  moduleFileExtensions: ["ts", "tsx", "js"],
  // 使用正则表达式匹配测试文件。匹配文件的名称可以是以 `.test` 和 `.spec` 结尾的文件
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  // 指定 Jest 忽略 "node_modules" 目录下的测试文件
  // testPathIgnorePatterns: ["/node_modules/"],
  // 在运行测试之前，在 Jest 根目录下的 "setupTests.ts" 文件中执行一次性设置
  // setupFilesAfterEnv: ["./src/setupTests.ts"],
  // 使用这个选项可以让 Jest 忽略特定文件路径下的代码覆盖率检查
  coveragePathIgnorePatterns: ["./test/"],
  // 配置 Jest 用哪些文件或目录来生成覆盖率报告
  collectCoverageFrom: ["src/**/*.ts"],
}
