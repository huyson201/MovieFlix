const API_KEY = import.meta.env.VITE_API_KEY
const API_BASE_URL = 'https://api.themoviedb.org/3'
const originalImage = (imagePath: string) => {
    if (!imagePath) return "#"
    return `https://image.tmdb.org/t/p/original/${imagePath}`
}
const w500Image = (imagePath: string) => {
    return `https://image.tmdb.org/t/p/w500/${imagePath}`

}
export {
    API_KEY,
    API_BASE_URL,
    originalImage,
    w500Image
}