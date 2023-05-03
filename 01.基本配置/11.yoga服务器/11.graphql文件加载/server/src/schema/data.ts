import { CartItemModel, CartModel, CurrencyCode } from "./model"

export const CART_ITEMS: CartItemModel[] = [
  {
    _id: "1",
    name: "T-Shirt",
    quantity: 3,
    price: 1000,
    currency: CurrencyCode.USD,
  },
  {
    _id: "2",
    name: "Stickers",
    quantity: 1,
    price: 500,
    currency: CurrencyCode.USD,
  },
]
export const CARTS: CartModel[] = [
  {
    _id: "wtf",
    items: CART_ITEMS,
    currency: CurrencyCode.USD,
  },
]
