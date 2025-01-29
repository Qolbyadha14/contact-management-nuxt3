<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create new account
        </h2>
      </div>
      <form ref="form" class="mt-8 space-y-6" @submit.prevent="handleRegister">
        <AuthInput
          id="name"
          label="Name"
          v-model="formData.name"
          placeholder="Enter your full name"
        />
        <AuthInput
          id="username"
          label="Username"
          v-model="formData.username"
          placeholder="Choose a username"
        />
        <AuthInput
          id="password"
          label="Password"
          type="password"
          v-model="formData.password"
          placeholder="Choose a password"
        />
        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {{ isLoading ? 'Registering...' : 'Register' }}
          </button>
        </div>
      </form>
      <div class="text-center">
        <NuxtLink to="/login" class="text-blue-600 hover:text-blue-500">
          Already have an account? Login here
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const isLoading = ref(false)

const formData = ref({
  name: '',
  username: '',
  password: ''
})

async function handleRegister() {
  if (isLoading.value) return
  
  try {
    isLoading.value = true
    await authStore.register(formData.value)
    await router.push('/login')
  } catch (error: any) {
    alert(error.message)
  } finally {
    isLoading.value = false
  }
}
</script>