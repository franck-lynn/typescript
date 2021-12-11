import { AnyObject } from "mongoose"
import { User } from "../models/user.model"

const createUser = async (input: AnyObject) => {
    return await User.create(input)
}

const findUser = async(name: string) => {
    return User.findOne({name})
}

export { createUser, findUser }
