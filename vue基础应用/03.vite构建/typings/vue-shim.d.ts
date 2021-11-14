/// <reference types="vite/client" />

// declare module "*.vue" {
//     // https://vuejs.github.io/vetur/guide/setup.html#project-setup
//     import { App, defineComponent } from 'vue'
//     const component: ReturnType<typeof defineComponent> & {
//       install(app: App): void
//     }
//     export default component
// }

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}


declare type Nullable<T> = T | null

declare type CustomizedHTMLElement<T> = HTMLElement & T

declare type Indexable<T> = {
    [key: string]: T
}

declare type Hash<T> = Indexable<T>

declare type TimeoutHandle = ReturnType<typeof global.setTimeout>

declare type ComponentSize = "large" | "medium" | "small" | "mini"
