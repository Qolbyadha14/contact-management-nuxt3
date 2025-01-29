import { defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'

interface UserPayload {
  username: string
  password: string
  name?: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    user: null as any
  }),
  
  actions: {
    async login(payload: UserPayload) {
      try {
        const { fetchApi } = useApi()
        const data = await fetchApi('/api/users/login', {
          method: 'POST',
          body: JSON.stringify(payload)
        })
        
        this.token = data.token
        this.user = data.user
        return data
      } catch (error) {
        throw error
      }
    },

    async register(payload: UserPayload) {
      try {
        const { fetchApi } = useApi()
        return await fetchApi('/api/users/register', {
          method: 'POST',
          body: JSON.stringify(payload)
        })
      } catch (error) {
        throw error
      }
    }
  }
})