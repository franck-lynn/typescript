class Point{
    // 类的成员
    private x:number
    public y: number
    readonly name: string = 'world'
    // 类的构造
    constructor (x: number, y: number){
        this.x = x
        this.y = y
    }
    // 类的方法
    show(n: number): void{
        console.log(`${this.x}--${this.y = n}--${this.name}`)
    }
}
const pt = new Point(0, 0)
pt.y = 10
pt.show(12)

// super
class Base {k = 4}
class Derived extends Base{
    _length = 0
    _size = 0
    constructor (){
        super()
        console.log(this.k)
    }
    get length(){
        // 可以加入逻辑, 如果不徐
        return this._length
    }
    set length(value){
        this._length = value
    }
    get size(): number {
        return this._size
    }
    set size(value: string | number | boolean){
        const num = Number(value) 
        // Don't allow NaN, Infinity, etc
       if (!Number.isFinite(num)) {
        this._size = 0;
        return;
      }
      this._size = num
    }
    
}
const d = new Derived()
d.size = false
console.log(d.size)

export {}