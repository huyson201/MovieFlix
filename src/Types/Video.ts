
export interface VideoResult {

    id: number,
    results: Video[]

}

export interface Video {
    iso_639_1: string,
    iso_3166_1: string,
    name: string,
    key: string,
    site: string,
    size: number,
    type: string,
    official: false,
    published_at: string,
    id: string
}