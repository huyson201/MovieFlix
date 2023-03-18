import { MediaType } from "../services/tmdbApi"

export interface TrendingVideo extends Movie, TV {
    media_type: "movie" | "tv"
}

export interface Movie extends MovieCommon {
    adult: false,
    release_date: string,
    original_title: string,
    title: string,
    video: boolean,
}

export interface TV extends MovieCommon {
    first_air_date: string,
    origin_country: string[],
    name: string,
    original_name: string
}

export interface MovieCommon {
    id: number,
    poster_path: string,
    overview: string,
    genre_ids: number[],
    vote_count: number,
    original_language: string,
    vote_average: number,
    popularity: number,
    backdrop_path: string,
}