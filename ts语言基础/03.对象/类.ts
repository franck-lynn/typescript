//单一职责
class Email {
    public email: string
    constructor (email: string){
        if(this.validateEmail(email)){ // 验证通过才能构造对象
            this.email = email
        }else{
            throw new Error('错误的邮件地址')
        }
    }
    validateEmail(email: string)  {
        const re = /\S+@\S+\.\S+/
        return re.test(email)
    }
}

class Person {
    public name: string
    public surname: string
    public email: Email // email 作为了 Person 类的一个属性了 
    constructor (name: string, surname: string, email: Email){
        this.email = email
        this.name = name
        this.surname = surname
    }
    greet(){
        console.log("Hi")
    }
}

const p = new Person('aaa', 'bbb', new Email('ccc@163.com'))
p.greet()