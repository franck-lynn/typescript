/**
 * https://adrianhall.github.io/web/2018/07/04/run-typescript-mocha-tests-in-vscode/
 * 实现一个堆栈类
 */
export class Stack<T>{
    // 内部栈存储数组
    private _items: T[] = []
    constructor (initialData: Array<T> = []){
        this._items.push(...initialData)
    }
    push(item: T): void{
        this._items.push(item)
    }
    
    pop(): T | undefined{
        return this._items.pop()
    }
    peek(): T | undefined{
        if(this.isEmpty()){
            return undefined
        }else{
            return this._items[this._items.length - 1]
        }
    }
    isEmpty(): boolean{
        return this._items.length === 0
    }
    size(): number{
        return this._items.length
    }
}
