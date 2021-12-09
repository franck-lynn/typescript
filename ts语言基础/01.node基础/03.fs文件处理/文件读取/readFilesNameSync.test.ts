/**
* Created by franck.lynn on 2021-12-09.
* lry_demry@163.com 
* filename:  readFilesNameSync.test 
* 测试 readFilesNameSync.test.ts 文件
*/

import { readFilesNameSync } from './readFilesNameSync'

// 没有忽略
const filenamesNoIgnore = readFilesNameSync(__dirname)
console.log(filenamesNoIgnore)

// 忽略掉 index.ts
const filenamesIgnoreIndex = readFilesNameSync(__dirname, ["index.ts"])
console.log(filenamesIgnoreIndex)
