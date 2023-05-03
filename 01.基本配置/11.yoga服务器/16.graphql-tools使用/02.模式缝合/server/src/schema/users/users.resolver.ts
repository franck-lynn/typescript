export const usersResolvers = {
  query: {
    allUsers: async () => {
      return [{ id: "1", name: "franck.lynn", email: "lry_demry@163.com", password: "123456Aa" }]
    },
  },
}
