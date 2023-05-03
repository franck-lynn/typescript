import type { RequireFields, Resolvers, QueryCartArgs } from "../types"
import * as currencyFormatter from "currency-formatter"
import { CARTS } from "./data"
import { CartModel, CurrencyCode, CartItemModel } from "./model"

export const resolvers: Resolvers = {
  Query: {
    cart: (root: unknown, { id }: RequireFields<QueryCartArgs, "id">) => {
      return CARTS.find((cart: CartModel) => cart._id === id) as CartModel
    },
  },
  Cart: {
    id: (cart: CartModel) => cart._id,
    totalItems: (cart: CartModel) => cart.items.length,
    subTotal: (cart: CartModel) => {
      const amount = cart.items.reduce((acc: number, item: CartItemModel) => acc + item.price * item.quantity, 0)

      return {
        amount,
        formatted: currencyFormatter.format(amount / 100, {
          code: cart.currency,
        }),
      }
    },
  },
  CartItem: {
    id: (item: CartItemModel) => item._id,
    unitTotal: (item: CartItemModel) => {
      const amount = item.price

      return {
        amount,
        formatted: currencyFormatter.format(amount / 100, {
          code: item.currency,
        }),
      }
    },
    lineTotal: (item: CartItemModel) => {
      const amount = item.quantity * item.price

      return {
        amount,
        formatted: currencyFormatter.format(amount / 100, {
          code: item.currency,
        }),
      }
    },
  },
  Currency: {
    USD: CurrencyCode.USD,
    GBP: CurrencyCode.GBP,
    TRY: CurrencyCode.TRY,
  },
}
