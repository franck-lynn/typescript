// 直接运行 vite 命令

const anchor = document.querySelector("a")
anchor && anchor.href ? console.log(anchor.href) : console.log("没有这个元素")

const button = document.querySelector('button')

const input1 = document.getElementById('num1')! as HTMLInputElement
const input2 = document.getElementById('num2')! as HTMLInputElement 

const add = (x: number, y: number): number => x + y

button?.addEventListener('click', function (){
    console.log(add(+input1.value, +input2.value))
})


