import { HOST } from './constants'

export const fetchOrderedProducts = async () => {
  const response = await fetch(`${HOST}/commande`, {
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91dGlsaXNhdGV1ciI6MiwiaWF0IjoxNjk4Nzk2NTA1LCJleHAiOjE3MDY1NzI1MDV9.DtxZWl0nQ9VqqiyNGXgUY9QH-Yzqi0ml4MVojntxnTI',
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
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91dGlsaXNhdGV1ciI6MiwiaWF0IjoxNjk4Nzk2NTA1LCJleHAiOjE3MDY1NzI1MDV9.DtxZWl0nQ9VqqiyNGXgUY9QH-Yzqi0ml4MVojntxnTI',
    },
  })
}

export const fetchConfirmOrder = async () => {
  const response = await fetch(`${HOST}/etatCommande`, {
    method: 'POST',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZF91dGlsaXNhdGV1ciI6MiwiaWF0IjoxNjk4Nzk2NTA1LCJleHAiOjE3MDY1NzI1MDV9.DtxZWl0nQ9VqqiyNGXgUY9QH-Yzqi0ml4MVojntxnTI',
    },
  })
}
