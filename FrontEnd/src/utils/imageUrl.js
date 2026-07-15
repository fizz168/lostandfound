export const getImageUrl = (imgPath) => {
  if (!imgPath) return null
  if (imgPath.startsWith('http')) return imgPath
  const apiBase = import.meta.env.VITE_API_BASE || ''
  return `${apiBase}${imgPath}`
}
