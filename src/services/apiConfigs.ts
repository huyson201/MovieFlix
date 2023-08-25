const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE_URL = "https://api.themoviedb.org/3";
const originalImage = (imagePath: string, width?: number) => {
  if (!imagePath) return "#";
  if (!width) {
    return `https://image.tmdb.org/t/p/original/${imagePath}`;
  }
  return `https://image.tmdb.org/t/p/w${width}/${imagePath}`;
};

export { API_KEY, API_BASE_URL, originalImage };
