import { model, Schema } from "mongoose"
import { ObjectId } from "mongodb"

export interface IUser {
  _id: ObjectId
  name: string
  email: string
  password: string
  status: string
  meta: {
    createdAt: Date
    updatedAt: Date
  }
  avatar: string
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  status: { type: String },
  meta: {
    createdAt: { type: Schema.Types.Date, required: true },
    updatedAt: { type: Schema.Types.Date, required: true },
  },
  avatar: { type: String },
})

export const User = model<IUser>("User", userSchema)
