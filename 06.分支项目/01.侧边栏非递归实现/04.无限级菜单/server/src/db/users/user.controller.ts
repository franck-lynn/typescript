import jwt from "jsonwebtoken"

import { SECRET } from "../../contstants"

import { IUser, User } from "./user.model"

export const getUserByEmail = async (email: string): Promise<IUser | null | undefined> => {
  return await User.findOne({ email })
}

export const getUserByToken = async (token: string) => {
  try {
    const raw = token.split(" ").pop() || ""
    const { id } = SECRET ? (jwt.verify(raw, SECRET) as { id: string; iat: number }) : { id: null }
    return (await User.findById(id)) as IUser
  } catch (error) {
    throw new Error("授权token不可用, 请重新登录. " + error)
  }
}
