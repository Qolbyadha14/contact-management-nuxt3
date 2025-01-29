<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="fixed inset-y-0 left-0 bg-gray-800 w-64 transition-transform duration-300 ease-in-out">
      <div class="flex items-center justify-between h-16 px-4 bg-gray-900">
        <span class="text-white text-xl font-semibold">Contact App</span>
      </div>
      <nav class="mt-5 px-2">
        <NuxtLink 
          to="/dashboard" 
          class="group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-white hover:bg-gray-700"
        >
          Dashboard
        </NuxtLink>
        <NuxtLink 
          to="/dashboard/contacts" 
          class="mt-1 group flex items-center px-2 py-2 text-base leading-6 font-medium rounded-md text-white hover:bg-gray-700"
        >
          Contacts
        </NuxtLink>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="pl-64">
      <!-- Top Navigation -->
      <header class="bg-white shadow">
        <div class="flex justify-between items-center px-4 py-4">
          <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <button 
            @click="logout" 
            class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </header>

      <!-- Page Content -->
      <main class="p-6">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
const authStore = useAuthStore()

const logout = async () => {
  authStore.token = null
  authStore.user = null
  await router.push('/login')
}
</script>