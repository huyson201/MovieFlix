import React, { useEffect, useMemo } from 'react'
import Wrapper from '../../components/Wrapper/Wrapper'
import Pagination from '../../components/Pagination/Pagination'
import { useQuery } from '@tanstack/react-query'
import tmdbApi from '../../services/tmdbApi'
import { Movie, TV } from '../../Types/Movie'
import { useSearchParams } from 'react-router-dom'
import FilterBar, { FilterData } from '../../components/FilterBar/FilterBar'
import Card from '../../components/Card/Card'
import axios, { AxiosError } from 'axios'
import Error404Page from '../Error/Error404Page'
import Error500Page from '../Error/Error500Page'
import Loader from '../../components/Loader/Loader'
import SkeletonCard from '../../components/Skeleton/SkeletonCard'


type Props = {
    media_type: "movie" | "tv"
}


const ListMovie = ({ media_type }: Props) => {
    const [searchParams, setSearchParams] = useSearchParams()

    const params = useMemo(() => {
        let currPage = parseInt(searchParams.get("page") || "1")
        let currGenres = searchParams.getAll("genres").join("|")
        let currLanguages = searchParams.getAll("languages").join("|")
        let currYear = searchParams.get("year")

        let param: {
            page: number, with_genres?: string,
            with_original_language?: string,
            primary_release_year?: string,
            first_air_date_year?: string
        } = {
            page: currPage
        }
        if (currLanguages) {
            param.with_original_language = currLanguages
        }

        if (currGenres) {
            param.with_genres = currGenres
        }
        if (currYear && media_type === "movie") {
            param.primary_release_year = currYear
        }
        if (currYear && media_type === "tv") {
            param.first_air_date_year = currYear
        }

        return param
    }, [searchParams])




    const { data, error, isError, isLoading } = useQuery({
        queryKey: [`latest_${media_type}`, params],
        queryFn: () => tmdbApi.getDiscoverList<Movie | TV>(media_type, params),
        keepPreviousData: true,
        retry: 2
    })

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [data])


    const handleOnFilter = (data: FilterData) => {
        let search: any = {}
        if (data.year !== "") {
            search.year = data.year
        }
        search.genres = data.genres
        search.languages = data.languages

        setSearchParams({ ...searchParams, ...search })
    }

    if (isError && error) {
        if (axios.isAxiosError(error && (error as AxiosError).response?.status === 404)) {
            return <Error404Page />
        }

        return <Error500Page />
    }


    return (
        <div className='pt-20 pb-12 bg-black-2'>
            <section className='top-rated py-6 bg-black-2'>
                <Wrapper>
                    <h2 className='text-light-gray capitalize py-1 text-2xl relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[1px] after:bg-white/40'>
                        {media_type === 'movie' ? "movie" : "tv-series"}
                    </h2>

                    {/* filter opts */}
                    <FilterBar media_type={media_type} onFilter={handleOnFilter} />

                    <div className='grid gap-y-8 gap-x-4 md:grid-cols-5 sm:grid-cols-4 xs:grid-cols-3 grid-cols-2 lg:grid-cols-6 mt-8'>

                        {
                            isLoading && new Array(14).fill(0).map((_, index) => {
                                return (
                                    <SkeletonCard key={index.toString() + "all"} />
                                )
                            })
                        }
                        {
                            data && data.data.results.map((item, index) => {
                                return (
                                    <Card data={item} mediaType={media_type} key={item.id + `${Math.random().toString()}`} />
                                )
                            })
                        }
                    </div>


                    {data && <Pagination total={data && data.data.total_pages > 500 ? 10000 : Math.floor(data?.data.total_results / 20)} pageSize={20} defaultCurrent={1} className='mt-6 w-fully' />}

                </Wrapper>
            </section>
        </div>
    )
}

export default ListMovie
