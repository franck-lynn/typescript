
const extname = (filepath: string) => {
    const re = /.+(?<extname>\.[\w\d\s]*)$/ 
    const ext = filepath.match(re)
    return ext?.groups?.extname
}

console.log("01. 获取扩展名---> ", extname('index.html'))
console.log("02. 获取扩展名---> ", extname('index.coffee.md'))
console.log("03. 获取扩展名---> ", extname('index.'))
console.log("04. node 返回 '', 这里返回 undefined ---> ", extname('index'))
console.log("05. node 返回 '', 这里返回 undefined ---> ", extname('.index'))
console.log("06. 获取扩展名---> ", extname('.index.md'))
