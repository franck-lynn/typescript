import { AnyObject } from "mongoose"
import { User } from "../models/user.model"

const createUser = async (input: AnyObject) => {
    return await User.create(input)
}

export { createUser }
