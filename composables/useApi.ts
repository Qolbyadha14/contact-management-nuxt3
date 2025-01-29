// composables/useApi.ts
export const useApi = () => {
  const config = useRuntimeConfig()
  const authStore = useAuthStore()

  const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
    try {
      const response = await fetch(`${config.public.apiBase}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          ...(authStore.token ? { 'Authorization': `Bearer ${authStore.token}` } : {}),
          ...options.headers,
        },
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.errors || data.message || 'Request failed')
      }

      return data
    } catch (error: any) {
      console.error('API Error:', error)
      throw new Error(error.message || 'Request failed')
    }
  }

  return {
    fetchApi
  }
}