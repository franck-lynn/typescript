import { createYoga } from "graphql-yoga"
// import type { CORSOptions } from "graphql-yoga"

import { schema } from "../schema"

// import { plugins } from "./plugins"

export const yoga = createYoga({
  schema,
  // plugins,
})
