// stores/auth.ts
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
  persist: true,
    
  actions: {
    async login(payload: UserPayload) {
      try {
        const { fetchApi } = useApi()
        const response = await fetchApi('/api/users/login', {
          method: 'POST',
          body: JSON.stringify(payload)
        })
        
        // Assuming response format: { data: { token: string } }
        if (response.data && response.data.token) {
          this.token = response.data.token
          this.user = payload // or response.data.user if available
        } else {
          throw new Error('Invalid response format')
        }
        return response
      } catch (error) {
        console.error('Login error:', error)
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
    },

    logout() {
      this.token = null
      this.user = null
      navigateTo('/login')
    }
  }
})