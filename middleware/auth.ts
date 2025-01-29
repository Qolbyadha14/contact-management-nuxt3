// middleware/auth.ts
export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  // Public routes
  const publicRoutes = ['/login', '/register']
  
  if (!authStore.token && !publicRoutes.includes(to.path)) {
    return navigateTo('/login')
  }

  if (authStore.token && publicRoutes.includes(to.path)) {
    return navigateTo('/dashboard')
  }
})