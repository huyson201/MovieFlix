import { Genres } from "../Types/Genres"
import { TrendingVideo } from "../Types/Movie"
import { Country, Paginate } from "../Types/common"
import axiosInstance from "./axiosInstance"


export type MediaType = "movie" | "tv" | "all"
export type TmdbMediaType = 'movie' | "tv"

type VideoType = 'popular' | 'top_rated' | 'upcoming'

const tmdbApi = {
    getDiscoverList: <T>(media_type: "movie" | "tv", params?: any) => {
        const url = `discover/${media_type}`
        return axiosInstance.get<Paginate<T>>(url, { params: { ...params } })
    },
    getTrendingMovies: (params?: any) => {
        const url = `trending/all/week`
        return axiosInstance.get<Paginate<TrendingVideo>>(url, { params })
    },
    getGenres: (media_type: MediaType) => {
        const url = `genre/${media_type}/list`
        return axiosInstance.get<{ genres: Genres[] }>(url)
    },
    getList: <T>(media_type: MediaType, video_type: VideoType, params?: any) => {
        const url = `${media_type}/${video_type}`
        return axiosInstance.get<Paginate<T>>(url, { params })
    },
    getCountries: () => {
        const url = `configuration/countries`
        return axiosInstance.get<Country[]>(url)
    },
    search: <T>(media_type: "movie" | "tv", query: string, params?: any) => {
        const url = `search/${media_type}`
        return axiosInstance.get<Paginate<T>>(url, { params: { query, ...params } })
    },
    getDetail: <T>(media_type: TmdbMediaType, id: number) => {
        const url = `${media_type}/${id}`
        return axiosInstance.get<T>(url)
    },
    getCast: <T>(media_type: TmdbMediaType, id: number) => {
        const url = `${media_type}/${id}/credits`
        return axiosInstance.get<T>(url)
    },
    getRecommendations: <T>(media_type: TmdbMediaType, id: number, params?: any) => {
        const url = `${media_type}/${id}/recommendations`
        return axiosInstance.get<Paginate<T>>(url, { params })
    },
    getVideo: <T>(media_type?: TmdbMediaType, id?: number) => {
        const url = `${media_type}/${id}/videos`
        return axiosInstance.get<T>(url)
    }

}

export default tmdbApi