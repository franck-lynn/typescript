import type { RequireFields, Resolvers, QueryCartArgs } from "../types"

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
      console.log("amount===> ", amount)
      return {
        amount,
        // formatted: currencyFormatter.format(amount / 100, {
        //   code: cart.currency,
        // }),
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat
        // https://zhuanlan.zhihu.com/p/356991916
        // formatted: new Intl.NumberFormat("zh-Hans-CN-u-nu-hanidec").format(amount),
        formatted: new Intl.NumberFormat("zh-CN", { style: "currency", currency: "CNY" }).format(amount),
      }
    },
  },
  CartItem: {
    id: (item: CartItemModel) => item._id,
    unitTotal: (item: CartItemModel) => {
      const amount = item.price

      return {
        amount,
        formatted: new Intl.NumberFormat().format(amount / 100),
      }
    },
    lineTotal: (item: CartItemModel) => {
      const amount = item.quantity * item.price

      return {
        amount,
        formatted: new Intl.NumberFormat().format(amount / 100),
      }
    },
  },
  Currency: {
    USD: CurrencyCode.USD,
    GBP: CurrencyCode.GBP,
    TRY: CurrencyCode.TRY,
  },
}
