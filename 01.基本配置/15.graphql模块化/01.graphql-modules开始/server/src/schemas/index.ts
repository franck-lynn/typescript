import { createApplication } from "graphql-modules"

import { user } from "./user/user"
import { auth } from "./auth/auth"

export const application = createApplication({
  modules: [user, auth],
})
