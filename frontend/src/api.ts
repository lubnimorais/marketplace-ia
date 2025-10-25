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

export const getChatSessions = async () => {
  const response = await api.get("/chat");
  return response.data;
};

export const getChatSession = async (sessionId: number) => {
  const response = await api.get(`/chat/${sessionId}`);
  return response.data;
};

export const createChatSession = async () => {
  try {
    const response = await api.post<{ id: number }>("/chat");
    return response.data;
  } catch (error) {
    console.error("Error creating chat session:", error);
    return null;
  }
};

export const sendMessageToChat = async (sessionId: number, message: string) => {
  try {
    const response = await api.post(`/chat/${sessionId}/messages`, {
      content: message,
    });
    return response.data;
  } catch (error) {
    console.error("Error sending message to chat:", error);
    return null;
  }
};

export const chooseCartFromComparison = async (cartId: number) => {
  try {
    await api.post(`/chat/${cartId}/choose`);
  } catch (error) {
    console.error("Error choosing cart from comparison:", error);
    return null;
  }
};

export const confirmAction = async (actionId: number, sessionId: number) => {
  try {
    const response = await api.post(`/chat/${sessionId}/actions/${actionId}/confirm`);
    return response.data;
  } catch (error) {
    console.error("Error confirming action:", error);
    return null;
  }
};