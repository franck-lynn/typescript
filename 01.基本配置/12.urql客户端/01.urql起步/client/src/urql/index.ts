import { createClient } from "@urql/vue"
// import Cookies from "js-cookie"

import { HOST_NAME, PORT } from "../constants"
// https://formidable.com/open-source/urql/docs/

const client = createClient({
  url: `${HOST_NAME}:${PORT}/graphql`,
  fetchOptions: () => {
    // 令牌是放在 cookie 里面, 可以从 cookie 里拿
    // const token = Cookies.get("token") || "Bearer xxxx "
    const token = "xxxx bbbbbb "
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" },
    }
  },
})

export default client
