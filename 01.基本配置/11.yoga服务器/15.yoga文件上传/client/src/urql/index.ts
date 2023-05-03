import { createClient, dedupExchange, cacheExchange } from "@urql/vue"
import { multipartFetchExchange } from "@urql/exchange-multipart-fetch"
// import Cookies from "js-cookie"

// import { HOST_NAME, PORT } from "../constants"
// https://formidable.com/open-source/urql/docs/

const client = createClient({
  url: "http://localhost:3000/graphql",
  exchanges: [dedupExchange, cacheExchange, multipartFetchExchange],
})

export default client
