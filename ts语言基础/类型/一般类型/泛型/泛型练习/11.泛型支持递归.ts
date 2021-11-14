export type ListNode<T> = {
    data: T
    next: ListNode<T> | null
}

// 递归地将类型中所有的属性都变成可选
// export type DeepPartial<T> = T extends Function
//     ? T : T extends object 
//     ? {[p in keyof T]?:  DeepPartial<T[p]>} : T
    
// export type PartialWindow = DeepPartial<Window> // 现在 window 上所有属性都变成可选的了