
// http://www.javashuo.com/article/p-dypxmoau-c.html
// https://www.orcode.com/question/995345_kd50b6.html
// 也叫 PascalCase , kababCase --> PascalCase

console.log(
    'foo-style-css'.replace(/-(\w)/g, (_, $1) => {
        // 连字符转驼峰 $1匹配到 s, c
        return $1.toUpperCase()
    })
)


const titlecase = input => input[0].toLocaleUpperCase() + input.slice(1);

const toPascalCase =  value => {
    if (value === null || value === void 0) return '';
    if (typeof value.toString !== 'function') return '';

    let input = value.toString().trim();
    if (input === '') return '';
    if (input.length === 1) return input.toLocaleUpperCase();

    let match = input.match(/[a-zA-Z0-9]+/g);
    if (match) {
        return match.map(m => titlecase(m)).join('');
    }

    return input;
}

console.log(
    toPascalCase('foo-style-css')
)