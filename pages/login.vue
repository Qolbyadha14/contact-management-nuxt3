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
        />
        <AuthInput
          id="password"
          label="Password"
          type="password"
          v-model="formData.password"
          placeholder="Enter your password"
        />
        <div>
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign in
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

const router = useRouter()
const authStore = useAuthStore()

const formData = ref({
  username: '',
  password: ''
})

async function handleLogin() {
  try {
    await authStore.login(formData.value)
    router.push('/dashboard')
  } catch (error: any) {
    alert(error.message)
  }
}
</script>