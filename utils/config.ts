export const getConfig = () => {
  const config = useRuntimeConfig()
  return {
    apiBase: config.public.apiBase
  }
}