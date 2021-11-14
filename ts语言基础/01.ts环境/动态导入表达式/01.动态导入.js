import('./add').then(module => {
    const add = module.default
    console.log(add.toString())
    console.log(add(1, 2))
})