import { Size } from "../../types"

export function getWidth(size: Size): number {
  if (size === "*") return 10
  if (size === "auto") return 10
  if (typeof size === "number") return size + 0.62
  if (typeof size === "string") return 10
  else return 0
}
