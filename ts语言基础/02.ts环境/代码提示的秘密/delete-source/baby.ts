// https://nodelover.gitbook.io/typescript/ji-chu-ren-zhi
export class Baby{
    private _name: string
    constructor (name: string){
        this._name = name
        console.log("小宝贝正在哭泣，哇哇哇哇哇~~~")
    }
    static smile() {
        console.log('O(∩_∩)O哈！')
    }
    public getBabyName(): string{
        return this._name
    }
}

export let baby = new Baby('Nico')
// 在 tsconfig.json 中配置
// "declaration": true,  
// 就可以得到 baby.d.ts 声明文件
// 现在移除 baby.ts 文件, 只剩 baby.js，baby.d.ts