<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your account
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
        <AuthInput
          id="username"
          label="Username"
          v-model="formData.username"
          placeholder="Enter your username"
          :disabled="isLoading"
        />
        <AuthInput
          id="password"
          label="Password"
          type="password"
          v-model="formData.password"
          placeholder="Enter your password"
          :disabled="isLoading"
        />
        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="isLoading">
              Logging in...
            </span>
            <span v-else>
              Sign in
            </span>
          </button>
        </div>
      </form>
      <div class="text-center">
        <NuxtLink to="/register" class="text-blue-600 hover:text-blue-500">
          Don't have an account? Register here
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: 'default'
})

const router = useRouter()
const authStore = useAuthStore()
const isLoading = ref(false)
const errorMessage = ref('')

const formData = ref({
  username: '',
  password: ''
})

async function handleLogin() {
  if (isLoading.value) return
  errorMessage.value = ''
  
  try {
    isLoading.value = true
    const result = await authStore.login(formData.value)
    
    if (authStore.token) {
      await router.push('/dashboard')
    } else {
      throw new Error('No token received')
    }
  } catch (error: any) {
    console.error('Login error:', error)
    errorMessage.value = error.message || 'Failed to login. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>