import { defineStore } from 'pinia'
import { useApi } from '~/composables/useApi'

interface Contact {
  id: number
  first_name: string
  last_name: string
  email: string
  phone_number: string
}

interface ContactResponse {
  data: Contact[]
  paging: {
    current_page: number
    total_page: number
    size: number
  }
}

export const useContactStore = defineStore('contact', {
  state: () => ({
    contacts: [] as Contact[],
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    loading: false
  }),
  
  actions: {
    async fetchContacts(page = 1) {
      try {
        this.loading = true
        const { fetchApi } = useApi()
        
        const response: ContactResponse = await fetchApi(`/api/contacts?page=${page}&size=${this.pageSize}`)
        
        this.contacts = response.data
        this.currentPage = response.paging.current_page
        this.totalPages = response.paging.total_page
      } catch (error) {
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})