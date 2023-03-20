import React, { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react'
import Wrapper from '../../components/Wrapper/Wrapper'
import { AiOutlineSearch } from 'react-icons/ai'
import { mediaDisplayName } from '../../Types/common'
import classNames from 'classnames'
import { useQuery } from '@tanstack/react-query'
import tmdbApi from '../../services/tmdbApi'
import GridContainer from '../../components/GridContainer/GridContainer'
import { Movie, TV } from '../../Types/Movie'
import HorizontalCard from '../../components/HorizontalCard/HorizontalCard'
import Pagination from '../../components/Pagination/Pagination'
import { useSearchParams } from 'react-router-dom'
import axios, { AxiosError } from 'axios'
import Error404Page from '../Error/Error404Page'
import Error500Page from '../Error/Error500Page'

type Props = {}

const Search = (props: Props) => {
    const [media, setMedia] = useState<"movie" | "tv">("movie")
    const [showDrop, setShowDrop] = useState<boolean>(false)
    const [searchKey, setSearchKey] = useState<string>("")

    const [searchParams, setSearchParams] = useSearchParams()

    const page = useMemo(() => {
        let currPage = parseInt(searchParams.get("page") || "1")
        return currPage
    }, [searchParams])

    const search = useMemo(() => {
        let search = searchParams.get("q")
        return search
    }, [searchParams])

    const handleSelect = (media: "movie" | "tv") => {
        setMedia(media)
        setShowDrop(false)
    }

    //* handle input change
    const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchKey(event.target.value)
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        searchParams.set("q", searchKey)
        setSearchParams(searchParams)
    }

    const { data, error } = useQuery({
        queryKey: [`search`, media, search, page],
        queryFn: () => tmdbApi.search<Movie | TV>(media, searchKey, { page }),
        enabled: search !== null
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
                <form action='#' onSubmit={handleSubmit}>
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
                            <button type="submit" className="absolute top-2/4 -translate-y-2/4 right-2 sm:right-4  text-sm font-medium text-white/70  ">
                                <AiOutlineSearch className='text-3xl' />
                            </button>
                        </div>
                    </div>
                </form>
                <div className='mt-12  '>
                    <GridContainer className='lg:gap-x-3 gap-y-6 gap-x-2'>
                        {
                            data?.data.results.map(el => {
                                if (!el.poster_path) return null
                                return (
                                    <HorizontalCard key={el.id.toString()} data={el} mediaType={media} />
                                )
                            })
                        }
                    </GridContainer>
                </div>

                {data && <Pagination defaultCurrent={1} className='mt-12' total={data?.data.total_pages} pageSize={20} />}
            </Wrapper>


        </div>
    )
}

export default Search