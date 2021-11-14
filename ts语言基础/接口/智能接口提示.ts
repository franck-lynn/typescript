interface Seal {
    name: string
    url: string
}
interface API {
    "/user": {name: string, age: number, phone: number}
    "/seals": {seal: Seal[]}
}
// url 参数只能是 2 个中的一个. 返回的 Promise 里的数据类型是 API里的2个属性值
const api = async <URL extends keyof API>(url: URL): Promise<API[URL]> => {
    const res = await fetch(url)
    return await res.json()
}
// 现在, 调用api函数就有了智能提示
api('/seals').then((res) => res.seal)
api('/user').then((res) => res.name)
