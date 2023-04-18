import React, { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'
import Wrapper from '../../components/Wrapper/Wrapper'
import { AiOutlineSearch } from 'react-icons/ai'
import { mediaDisplayName } from '../../Types/common'
import classNames from 'classnames'
import { useQuery } from '@tanstack/react-query'
import tmdbApi from '../../services/tmdbApi'
import GridContainer from '../../components/GridContainer/GridContainer'
import { Movie, TV } from '../../Types/Movie'
import Card from '../../components/Card/Card'
import Pagination from '../../components/Pagination/Pagination'
import { useSearchParams } from 'react-router-dom'
import axios, { AxiosError } from 'axios'
import Error404Page from '../Error/Error404Page'
import Error500Page from '../Error/Error500Page'
import Loader from '../../components/Loader/Loader'
import SkeletonCard from '../../components/Skeleton/SkeletonCard'
import useDebounce from '../../hooks/useDebounce'
import { MagnifyingGlass } from 'react-loader-spinner'

type Props = {}

const Search = (props: Props) => {
    const [media, setMedia] = useState<"movie" | "tv">("movie")
    const [showDrop, setShowDrop] = useState<boolean>(false)
    const [searchKey, setSearchKey] = useState<string>("")

    const [searchParams, setSearchParams] = useSearchParams()

    const params = useMemo(() => {
        let currPage = parseInt(searchParams.get("page") || "1")
        let search = searchParams.get("q") || ""
        return {
            page: currPage,
            search
        }
    }, [searchParams])

    const debounceValue = useDebounce(searchKey, 1200)

    useEffect(() => {
        searchParams.set("q", debounceValue)
        setSearchParams(searchParams)
    }, [debounceValue])

    const handleSelect = (media: "movie" | "tv") => {
        setMedia(media)
        setShowDrop(false)
    }

    //* handle input change
    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchKey(event.target.value)
    }



    const { data, error, isLoading, isFetching, isFetched } = useQuery({
        queryKey: [`search`, media, params],
        queryFn: () => tmdbApi.search<Movie | TV>(media, params.search, { page: params.page }),
        enabled: params.search !== ""
    })

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [data])

    if (error) {
        if (axios.isAxiosError(error && (error as AxiosError).response?.status === 404)) {
            return <Error404Page />
        }

        return <Error500Page />
    }


    return (
        <div className='pt-20 pb-12 min-h-[100vh] bg-black-2'>
            <Wrapper>
                <form action='#' >
                    <div className="flex relative  bg-[#212529]  rounded">
                        <button id="dropdown-button" data-dropdown-toggle="dropdown" className="flex-shrink-0  inline-flex 
                        items-center py-3 md:py-5 px-2 sm:px-4 text-sm font-medium text-center
                         text-white/70 border-r border-white/70 bg-transparent" type="button" onClick={() => setShowDrop(prev => !prev)}>{mediaDisplayName[media]}
                            <svg aria-hidden="true" className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                        </button>
                        <div id="dropdown" className={classNames("z-10 absolute top-full hidden mt-2 [&.active]:block e divide-y bg-[#212529]  rounded-lg  w-44", { active: showDrop })}>
                            <ul className="py-2 text-sm text-white/70 " aria-labelledby="dropdown-button">
                                <li onClick={() => handleSelect("movie")}>
                                    <a href="#" className="block px-4 py-2  ">Movies</a>
                                </li>
                                <li onClick={() => handleSelect("tv")}>
                                    <a href="#" className="block px-4 py-2 ">TV-Series</a>
                                </li>

                            </ul>
                        </div>
                        <div className="relative w-full">
                            <input type="text" id="search-dropdown" name='search' onChange={handleOnChange} className="h-full pr-10 sm:pr-14 pl-4  placeholder:text-white/40 text-center block  w-full z-20 md:text-2xl bg-transparent text-white/70  focus:outline-none" placeholder="Enter your keywords..." required />
                            <div className={`absolute loader top-2/4  -translate-y-2/4 right-0  text-sm font-medium text-white/70 ${isFetching ? "block" : "hidden"}`}>
                                <MagnifyingGlass
                                    visible={true}
                                    height="40"
                                    width="40"
                                    ariaLabel="MagnifyingGlass-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="MagnifyingGlass-wrapper"
                                    glassColor='#c0efff'
                                    color='#7a7c7f'
                                />
                            </div>
                        </div>
                    </div>
                </form>

                {/* search results */}

                <div className='mt-12'>
                    {
                        isFetched && (!data || data.data.results.length <= 0) && <div className='text-white/70 text-center text-2xl'>Results not found for "{params.search}".</div>
                    }

                    {
                        params.search === "" && <div className='text-white/70 text-center text-2xl'>Search results will be displayed below.</div>
                    }
                    <GridContainer className='lg:gap-x-3 gap-y-6 gap-x-2'>
                        {
                            params.search !== "" && isLoading && new Array(14).fill(0).map((_, index) => {
                                return (
                                    <SkeletonCard key={index.toString() + "movies"} />
                                )
                            })
                        }
                        {
                            data?.data.results.map(el => {
                                if (!el.poster_path) return null
                                return (
                                    <Card key={el.id.toString()} data={el} mediaType={media} />
                                )
                            })
                        }
                    </GridContainer>
                </div>

                {data && data.data.results.length > 0 && <Pagination total={data && data.data.total_pages > 500 ? 10000 : Math.floor((data.data.total_results / 20))} pageSize={20} defaultCurrent={1} className='mt-6 w-fully' />}

            </Wrapper>


        </div>
    )
}

export default Search