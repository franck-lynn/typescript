import { ref } from "vue"

// import { defineStore } from "pinia"

/*
 * isNarrow 用到的地方,
 * units-layout/c2-x-movable/useXMovable.ts
 * units-layout/xy-mavable/useXYMovable.ts
 */
export const isNarrow = ref<boolean>(true)
/**
 * units-layout/xy-mavable/useAllDirectionResizeable.ts
 */
export const position = ref<number>()

// export const useIsNarrow = defineStore("isNarrow", {
//   state: () => ({ isNarrow: false }),
// })

// export const useSidebarPosition = defineStore("sidebarPosition", {
//   state: () => ({ position: 45 }),
// })
