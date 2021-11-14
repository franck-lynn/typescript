const reg1 = /^vue/ 
const reg2 = new RegExp('^(?!(vuer-))')
const str = 'vuer'
console.log(
    reg1.test(str) && reg2.test(str) 
)