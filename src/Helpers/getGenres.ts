import { Genres } from "../Types/Genres";

const getGenres = (id: number, genres?: Genres[]) => {
    if (!genres) return
    return genres.find(item => item.id === id)
}

export default getGenres