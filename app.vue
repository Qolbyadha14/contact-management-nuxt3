<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth'

// Apply middleware globally
const router = useRouter()
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (!authStore.token && to.path !== '/login' && to.path !== '/register') {
    next('/login')
  } else if (authStore.token && (to.path === '/login' || to.path === '/register')) {
    next('/dashboard')
  } else {
    next()
  }
})
</script>