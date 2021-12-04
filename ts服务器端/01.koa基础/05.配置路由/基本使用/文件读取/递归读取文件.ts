import fs from 'fs'

const readdir = (dir: string) => {
    return new Promise((resolve, reject) => {
        return fs.readdir(dir, 'utf-8', (error, data) => {
            if(error) return reject(error)
            resolve(data)
        })
    })
}

const readfiles = async (dir: string) => {
    const files = await readdir(dir)
}




