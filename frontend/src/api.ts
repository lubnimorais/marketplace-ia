import axios from "axios";
import { IProduct } from "./types";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
})

export async function getCatalog(search?: string | null) {
  const response = await api.get('/catalog', {
     params: { search}
  })

  return response.data as IProduct[]
}