
const reg = /^\.[\w\d]+$/

console.log(
    reg.test('.html'),
    "\n",
    reg.test('html'),
    "\n",
    reg.test('.nb3'),
    "\n",
    reg.test('.2b'),
    "\n",
    reg.test('.3.o'),
    "\n",
    reg.test('.h/5'),
    "\n",
    reg.test(''),
    "\n",
    reg.exec('.nb3'),
)

export {reg}