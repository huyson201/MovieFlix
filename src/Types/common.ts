export interface Paginate<T> {
    results: T[],
    total_results: number,
    total_pages: number,
    page: number
}


export interface Country {
    iso_3166_1: string,
    english_name: string
}

export const mediaDisplayName = {
    "movie": "Movies",
    "tv": "TV-Series"
}

export const urlMap = {
    "movie": "/movies",
    "tv": "/tv-series",
    "search": "/search"
}

export const siteMap = {
    "YouTube": "https://www.youtube.com/embed/",
    "Vimeo": "https://vimeo.com/"
}