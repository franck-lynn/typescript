const login = `mutation  {
    login (email: "lry_demry@163.com", password: "12345"){
            token
        }
    }`

    
 const register = `mutation {
    register(name: "franck.lynn", email: "lry_demry@163.com", password: "12345"){
        msg
    }
}
 `   

// const reg = /^.*(mutation).*{.|\n|\t*(login).|\n|\t*\(.|n|\t*}$/
// const reg = /mutation\b\s*{\s*login\s*\(\s|\w+/m
// mutation 开头, 后面跟着 任意个空字符或者回车或者换行 后 { 后或空字符回车或换行
// 后 login 后或空字符回车或换行 后 (
const reg = /mutation(?=\s*\{\s*(register|login)\s*\()/ 

console.log(reg.test(register))
console.log(reg.test(login))
