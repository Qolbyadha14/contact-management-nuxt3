// middleware/auth.ts
export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()
  console.log('Auth middleware - token:', authStore.token)
  console.log('Auth middleware - route:', to.path)

  // Public routes
  const publicRoutes = ['/login', '/register']
  
  if (!authStore.token && !publicRoutes.includes(to.path)) {
    console.log('Redirecting to login - no token')
    return navigateTo('/login')
  }

  if (authStore.token && publicRoutes.includes(to.path)) {
    console.log('Redirecting to dashboard - has token')
    return navigateTo('/dashboard')
  }
})