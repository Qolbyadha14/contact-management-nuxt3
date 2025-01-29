<template>
  <div>
    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 border-b border-gray-200 sm:px-6">
        <h3 class="text-lg leading-6 font-medium text-gray-900">
          Contacts
        </h3>
      </div>
      
      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-if="contactStore.loading" class="animate-pulse">
              <td colspan="4" class="px-6 py-4">Loading...</td>
            </tr>
            <tr v-else v-for="contact in contactStore.contacts" :key="contact.id">
              <td class="px-6 py-4 whitespace-nowrap">
                {{ contact.first_name }} {{ contact.last_name }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ contact.email }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ contact.phone_number }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <button class="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
                <button class="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="prevPage"
            :disabled="contactStore.currentPage === 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            @click="nextPage"
            :disabled="contactStore.currentPage === contactStore.totalPages"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Page {{ contactStore.currentPage }} of {{ contactStore.totalPages }}
            </p>
          </div>
          <div>
            <button
              @click="prevPage"
              :disabled="contactStore.currentPage === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 mr-2"
            >
              Previous
            </button>
            <button
              @click="nextPage"
              :disabled="contactStore.currentPage === contactStore.totalPages"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useContactStore } from '~/stores/contact'

definePageMeta({
  layout: 'dashboard'
})

const contactStore = useContactStore()

onMounted(async () => {
  await contactStore.fetchContacts()
})

const nextPage = () => {
  if (contactStore.currentPage < contactStore.totalPages) {
    contactStore.fetchContacts(contactStore.currentPage + 1)
  }
}

const prevPage = () => {
  if (contactStore.currentPage > 1) {
    contactStore.fetchContacts(contactStore.currentPage - 1)
  }
}
</script>