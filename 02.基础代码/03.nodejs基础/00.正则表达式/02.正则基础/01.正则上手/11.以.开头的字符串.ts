
console.log(
    /^\..+/.test('separator')
)
const ext = '.separator'.match(/^\.(?<extname>.+)/)
console.log(
    ext?.groups?.extname
)