// 基础类型
enum Choose {
    Red = "red",
    Blue= 'blue'
}

const question = (choose: Choose): void => {console.log("选择", choose)}

class Person{
    name: string
    age: number
    labels: Array<string>
    wives: string[]
    contact: [string, number] // 元组
    
    show: boolean = true
    other: any
    constractor() { }
    answer(): Choose {
        if(this.show === false){
            return Choose.Red
        }else{
            return Choose.Blue
        }
    }
    
    hello(): void {
        console.log("hello " + this.name)
    }
    empty(){}
    down(): never{
        while(true){}
    }
}

let zhangsan = new Person()

zhangsan.name = "张三"
zhangsan.age = 28
zhangsan.labels = ["颜值逆天", "年轻多金"]
zhangsan.wives = ["一号", "二号", "三号"]
zhangsan.contact = ["北京xxxxxxx别墅", 2]
zhangsan.show = false
zhangsan.other = '不好不坏的人'
let len = (<string>zhangsan.other).length
console.log(len)
question(zhangsan.answer())
zhangsan.hello()
console.log(zhangsan.empty)