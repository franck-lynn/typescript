# codegen初体验

目录结构

```ts
|-- .env 
|-- .eslintrc.cjs
|-- .esmrc
|-- .gitignore
|-- client
|   |-- .eslintrc.cjs
|   |-- .stylelintrc.cjs
|   |-- index.html
|   |-- package.json
|-- |-- src
|   |   |-- App.vue
|   |   |-- main.ts
|-- |-- |-- typings
|   |   |   |-- fragment-masking.ts
|   |   |   |-- gql.ts
|   |   |   |-- graphql.ts
|   |   |   |-- index.ts
|   |   |   |-- shims.d.ts
|   |   |   |-- vue-shim.d.ts
|-- |-- |-- urql
|   |   |   |-- index.ts
|   |-- tsconfig.json
|   |-- vite.config.ts
|-- codegen.ts
|-- package.json
|-- server
|   |-- .eslintrc.cjs
|   |-- package.json
|-- |-- src
|   |   |-- codegen初体验.md
|-- |-- |-- constants
|   |   |   |-- index.ts
|   |   |-- main.ts
|-- |-- |-- schema
|   |   |   |-- index.ts
|-- |-- |-- types
|   |   |   |-- index.ts
|   |-- tsconfig.json
|-- test
|   |-- test-server.http
|-- tsconfig.json
```

codegen 是利用后端的模式文件来生成类型约束的, 模式文件可以是 ts文件, gql文件等.

生成的文件可以给后端使用, 也可以给前端使用