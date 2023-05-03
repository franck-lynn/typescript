import { createClient, cacheExchange, fetchExchange } from "@urql/vue"
// import Cookies from "js-cookie"

import { HOST_NAME, PORT } from "../constants"

const client = createClient({
  url: `${HOST_NAME}:${PORT}/graphql`,
  exchanges: [cacheExchange, fetchExchange],
})

export default client
