// composables/useApi.ts
import { useRuntimeConfig } from '#app'

export const useApi = () => {
  const config = useRuntimeConfig()
  const apiBase = config.public.apiBase

  const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
    const url = `${apiBase}${endpoint}`
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.message || 'API request failed')
    
    return data
  }

  return {
    fetchApi
  }
}