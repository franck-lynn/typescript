import { Resolvers } from "../../types"
const users = [
  { id: "1", name: "franck.lynn", email: "lry_demry@163.com", password: "123456Aa" },
  { id: "2", name: "赵敏", email: "zm@163.com", password: "123456Aa" },
  { id: "3", name: "周芷若", email: "zzr@163.com", password: "123456Aa" },
]

export const usersResolvers: Resolvers = {
  query: {
    allUsers: async () => {
      return users
    },
  },
}
