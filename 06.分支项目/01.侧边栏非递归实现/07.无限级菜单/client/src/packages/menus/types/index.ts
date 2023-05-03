type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never }

type MutualExclusion<T, U> = (Without<T, U> & U) | (Without<U, T> & T)

interface Link {
  id?: string
  icon?: string
  expanded?: boolean
  title?: string
  href?: string
  deep?: number
  marginTop?: number
  width?: number // topleft.vue 里用到的属性
  rootWidth?: number // topleft.vue 里用到的属性
  rootExpanded?: boolean | undefined
  rootId?: string
  parentId?: string
  children?: IMenu[]
}

interface Header {
  header?: string
  clazz?: string
}
export type IMenu = MutualExclusion<Link, Header>
