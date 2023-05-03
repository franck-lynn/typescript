import { createClient } from "@urql/vue"
// import Cookies from "js-cookie"

// import { HOST_NAME, PORT } from "../constants"
// https://formidable.com/open-source/urql/docs/

const client = createClient({
  url: "https://trygql.formidable.dev/graphql/basic-pokedex",
})

export default client
