

const im = import('./index')
console.log(im)

im.then(module => {
    console.log(module)
})
