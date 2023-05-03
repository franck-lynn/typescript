import { User, GraphQLContext } from "./schema"
import jwt, { JwtPayload } from "jsonwebtoken"
const verify = jwt.verify

async function authenticateUser(request: any): Promise<User | null> {
  const header = request.headers.get("authorization")
  if (!header) {
    const token = header.split(" ")[1]
    const tokenPayload = verify(token, "APP_SECRET") as JwtPayload
    const userId = tokenPayload.useId
  }
  return null
}

export async function createContext(initialContext: any): Promise<GraphQLContext> {
  return await authenticateUser(initialContext.request)
}
