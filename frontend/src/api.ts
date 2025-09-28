import axios from "axios";
import { ICart, IProduct, } from "./types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333",
})

export async function getCatalog(search?: string | null) {
  const response = await api.get('/catalog', {
     params: { search}
  })

  return response.data as IProduct[]
}

export async function getCart() {
  const response = await api.get('/cart')
  return response.data as ICart
}

export async function addToCart(productId: number, quantity: number) {
  const response = await api.post('/cart', {
    productId,
    quantity
  })

  return response.data as { id: number}
}

export async function updateCartItemQuantity(cartId: number, productId: number, quantity: number) {
  const response = await api.put(`/cart/${cartId}/items/${productId}`, {
    quantity
  })

  return response.data as ICart
}

export async function removeCartItem(cartId: number, productId: number) {
  await api.delete(`/cart/${cartId}/items/${productId}`)
}