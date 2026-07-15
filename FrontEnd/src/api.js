export const apiBase = import.meta.env.VITE_API_BASE || ''

export const getApiUrl = (path) => `${apiBase}${path.startsWith('/') ? path : `/${path}`}`

export const getImageUrl = (imgPath) => {
  if (!imgPath) return null
  if (imgPath.startsWith('http')) return imgPath
  return `${apiBase}${imgPath.startsWith('/') ? imgPath : `/${imgPath}`}`
}
