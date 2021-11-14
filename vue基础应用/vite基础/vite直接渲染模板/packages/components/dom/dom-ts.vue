<template>
    <div class="wrapper">
        <h1>Finance Logger</h1>

        <!-- output list -->
        <ul class="item-list"></ul>
    </div>
    <footer>
        <form class="new-item-form">
            <div class="field">
                <label>type:</label>
                <select id="type">
                    <option value="invoice">Invoice</option>
                    <option value="payment">Payment</option>
                </select>
            </div>
            <div class="field">
                <label>To / From:</label>
                <input id="tofrom" type="text" />
            </div>
            <div class="field">
                <label>Detail:</label>
                <input id="detail" type="text" />
            </div>
            <div class="field">
                <label>Amount (€):</label>
                <input id="amount" type="text" />
            </div>
            <button>Add</button>
        </form>
        <a href="https://www.thenetninja.co.uk">The Net Ninja</a>
    </footer>
</template>

<script lang="ts">
// https://github.com/iamshaunjp/typescript-tutorial/blob/lesson-2/styles.css
// https://space.bilibili.com/52375596/channel/detail?cid=141407&ctype=0
import {defineComponent, onMounted} from "vue"
export default defineComponent({
    name: "dom-ts",
    props: {},
    setup() {
        // const anchor = document.querySelector("a")!
        // // if(anchor){
        // //     console.log(anchor.href)
        // // }
        // console.log(anchor.href)
        onMounted(() => {
            // 定义一个类
            class Invoice {
                // readonly client: string
                // private detail: string
                // public amount: number
                // constructor(c: string, d: string, a: number) {
                //     this.client = c
                //     this.detail = d
                //     this.amount = a
                // }
                constructor(readonly client: string, private detail: string, public amount: number) {}

                format() {
                    return `${this.client} owes € ${this.amount} for ${this.detail}`
                }
            }

            const invOne = new Invoice("mario", "work on the mario website", 250)
            const invTwo = new Invoice("liugi", "work on the liugi website", 300)

            let invoices: Invoice[] = []
            invoices.push(invOne)
            invoices.push(invTwo)

            // invOne.client = 'yoshi'
            // invTwo.amount = 400

            // console.log(invoices)
            invoices.forEach((inv) => {
                // console.log(inv.client, inv.detail, inv.amount, inv.format())
                console.log(inv.client, inv.amount, inv.format())
                console.log()
            })

            const form = document.querySelector(".new-item-form") as HTMLFormElement
            // if(anchor){
            //     console.log(anchor.href)
            // }
            // console.log(form.children)

            // classes

            // interfaces
            interface IsPerson {
                name: string
                age: number
                speak(a: string): void
                spend(a: number): number
            }
            const me: IsPerson = {
                name: "sjaun",
                age: 30,
                speak: (text: string): void => console.log(text),
                spend: (amount: number): number => {
                    console.log("I spend", amount)
                    return amount
                }
            }
            // https://www.bilibili.com/video/BV1M54y1m72Q/?spm_id_from=autoNext
            const greetPerson = (person: IsPerson) => {
                console.log("hello", person.name)
            }

            greetPerson(me)

            // inputs
            const type = document.querySelector("#type") as HTMLSelectElement
            const tofrom = document.querySelector("#tofrom") as HTMLInputElement
            const detail = document.querySelector("#detail") as HTMLInputElement
            const amount = document.querySelector("#amount") as HTMLInputElement

            form.addEventListener("submit", (e: Event) => {
                e.preventDefault()
                console.log(
                    type.value,
                    tofrom.value,
                    detail.value,
                    amount.valueAsNumber // 值作为数字
                )
            })
        })

        return {}
    }
})
</script>

<style lang="scss" scoped>
// body{
//   margin: 0;
//   font-family: Roboto;
// }
.wrapper {
    max-width: 960px;
    margin: 0 auto;
}
h1 {
    margin: 40px auto;
    color: #ff0aa7;
    text-align: center;
}
ul {
    padding: 0;
    list-style-type: none;
}
li {
    padding: 6px 10px;
    border: 1px solid #eee;
    margin: 10px auto;
}
li h4 {
    color: #ff0aa7;
    margin: 0;
    text-transform: capitalize;
}
li p {
    color: #333;
    margin: 8px 0 0;
}
footer {
    background: #eee;
    padding: 60px;
    margin-top: 60px;
}
form {
    max-width: 960px;
    margin: 0 auto;
    text-align: center;
}
label {
    display: block;
    font-weight: bold;
    font-size: 0.8em;
    color: #333;
    margin: 16px 0 6px;
}
input,
select {
    padding: 6px;
    border: 1px solid #e1e1e1;
    border-radius: 4px;
}
.field {
    display: inline-block;
    margin: 0 10px;
}
button {
    color: white;
    border: 0;
    background: #ff0aa7;
    padding: 6px;
    min-width: 80px;
    border-radius: 4px;
}
footer a {
    text-align: center;
    display: block;
    color: #999;
    margin-top: 40px;
    font-size: 0.7em;
}
</style>
