const reg =  /.+?\\(?=\w+)|\.\w+$|\\$/


console.log(
    '.a.aa.aa'.replace(reg, '')
)