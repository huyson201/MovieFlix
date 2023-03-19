import { MediaType } from "../services/tmdbApi"
import { Genres } from "./Genres"

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

export interface DetailMovie extends Movie {
    belongs_to_collection: null | any,
    budget: number,
    genres: Genres[],
    homepage: string,
    imdb_id: string,
    production_companies: any[],
    production_countries: any[],
    revenue: number,
    runtime: number,
    spoken_languages: any[],
    status: "Rumored" | "Planned" | "In" | "Production" | "Post" | "Production" | "Released" | "Canceled",
    tagline: string,
}

export interface DetailTV extends TV {
    created_by: any,
    episode_run_time: number[],
    genres: Genres[],
    homepage: string,
    in_production: false,
    languages: string[],
    last_air_date: string,
    last_episode_to_air: any,
    next_episode_to_air: null,
    networks: any[],
    number_of_episodes: number,
    number_of_seasons: number,
    origin_country: string[],
    production_companies: any[]
    production_countries: any[]
    seasons: any[],
    spoken_languages: any[],
    status: string,
    tagline: string,
    type: string

}