const API_KEY = '7af28237158e0b14256b6de93dd4330f'
const API_BASE_URL = 'https://api.themoviedb.org/3'
const originalImage = (imagePath: string) => {
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