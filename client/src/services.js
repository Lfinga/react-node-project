import { HOST } from './constants'

export const fetchOrderedProducts = async () => {
  const response = await fetch(`${HOST}/commande`, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91dGlsaXNhdGV1ciI6MiwiaWF0IjoxNjk5NjAyNTgwLCJleHAiOjE3MDczNzg1ODB9.3XPPrRp3a30nJgyk3hBWkTpgCn9-t54T2MxbUkZ4QII',
    },
  })
  const data = await response.json()
  return data
}

export const fetchOrderDelete = async () => {
  const response = await fetch(`${HOST}/commande`, {
    method: 'DELETE',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91dGlsaXNhdGV1ciI6MiwiaWF0IjoxNjk5NjAyNTgwLCJleHAiOjE3MDczNzg1ODB9.3XPPrRp3a30nJgyk3hBWkTpgCn9-t54T2MxbUkZ4QII',
    },
  })
}

export const fetchConfirmOrder = async () => {
  const response = await fetch(`${HOST}/etatCommande`, {
    method: 'POST',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91dGlsaXNhdGV1ciI6MiwiaWF0IjoxNjk5NjAyNTgwLCJleHAiOjE3MDczNzg1ODB9.3XPPrRp3a30nJgyk3hBWkTpgCn9-t54T2MxbUkZ4QII',
    },
  })
}

export const fetchDeleteProduct = async (id_product) => {
  const response = await fetch(`${HOST}/commande/${id_product}`, {
    method: 'DELETE',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91dGlsaXNhdGV1ciI6MiwiaWF0IjoxNjk5NjAyNTgwLCJleHAiOjE3MDczNzg1ODB9.3XPPrRp3a30nJgyk3hBWkTpgCn9-t54T2MxbUkZ4QII',
    },
  })
}

export const fetchOrders = async () => {
  const response = await fetch(`${HOST}/etatCommande`, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91dGlsaXNhdGV1ciI6MiwiaWF0IjoxNjk5NjAyNTgwLCJleHAiOjE3MDczNzg1ODB9.3XPPrRp3a30nJgyk3hBWkTpgCn9-t54T2MxbUkZ4QII',
    },
  })
  const data = await response.json()
  return data
}
