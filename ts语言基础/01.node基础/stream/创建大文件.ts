import fs from "fs"

const file = fs.createWriteStream('./big.file')
for (let i = 0; i < 100; i++){
    file.write('Lorem ipsum dolor sit amet, consectetur adipisicing elit. \n')
}
file.end()



