import fs from 'fs'

const readfile = (filepath: string): Promise<unknown> => {
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, (err, data) => {
            if(err) reject(err)
            resolve(data)
        })
    })
}
export { readfile }