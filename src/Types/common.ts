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