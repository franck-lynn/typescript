/// <reference path = "../typings/index.d.ts" />

function globalLib(options: globalLib.Options) {
    console.log(options)
}

globalLib({ x: 1 })
// globalLib.doSomething()

//! tsconfig.json 配置 typeRoots 不起作用, 还是采用 /// <reference path="...">
// ts-node src/index.ts --project tsconfig.json
// tsc src/index.ts --project tsconfig.json
