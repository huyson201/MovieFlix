import React, { useEffect, useMemo, useState } from 'react'
import tmdbApi from '../../services/tmdbApi'
import { FaCalendarAlt, FaFilter, FaFolderOpen, FaGlobeAmericas } from 'react-icons/fa'
import Dropdown, { DropItem, DropItemSimple } from '../../components/Dropdown/Dropdown'
import languagesData from '../../data.json'
import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

export interface FilterData {
    genres: string[],
    languages: string[],
    year: string,

}

type Props = {
    media_type: "movie" | "tv",
    onFilter?: (data: FilterData) => void
}


const FilterBar = ({ media_type, onFilter }: Props) => {
    const [searchPrams, setSearchParams] = useSearchParams()
    const [filterData, setFilterData] = useState<FilterData>({
        genres: [],
        languages: [],
        year: ""
    })

    const genresQuery = useQuery({
        queryKey: [`genres_${media_type}`],
        queryFn: () => tmdbApi.getGenres(`${media_type}`)
    })

    let genresSelectedString = useMemo(() => {
        if (filterData.genres.length === 0) return 'All'
        if (filterData.genres.length > 1) return `${filterData.genres.length} selected`
        return genresQuery.data?.data.genres.find(item => item.id === +filterData.genres[0])?.name || "All"

    }, [filterData.genres, genresQuery])

    let languagesSelectedString = useMemo(() => {
        if (filterData.languages.length === 0) return 'All'
        if (filterData.languages.length > 1) return `${filterData.languages.length} selected`
        return languagesData.find(item => item.iso_639_1 === filterData.languages[0])?.english_name || "All"
    }, [filterData])

    let yearSelectedString = useMemo(() => {
        return filterData.year !== "" ? filterData.year : "All"
    }, [filterData.year])


    useEffect(() => {
        let data: FilterData = {
            genres: [],
            languages: [],
            year: ""
        }

        data.genres = searchPrams.getAll("genres")
        data.languages = searchPrams.getAll("languages")
        data.year = searchPrams.get("year") || ""
        setFilterData(data)

    }, [searchPrams])

    //* handle select year
    const handleSelectYear = (checked: boolean, value: string) => {
        let data = filterData
        if (checked) data.year = value
        setFilterData({ ...data })
    }

    //* handle select languages and genres
    const createHandleSelect = (type: "languages" | "genres") => {
        return (checked: boolean, value: string) => {
            let data = { ...filterData }
            if (checked) {
                data[type].push(value)
                setFilterData({ ...filterData })
            }
            else {
                data[type].splice(data[type].indexOf(value), 1)
                setFilterData({ ...filterData })
            }
        }
    }


    //* render list item
    const renderGenre = () => {
        if (!genresQuery.data) return
        return genresQuery.data.data.genres.map(genre => {
            return <DropItem name={genre.name} value={genre.id.toString()} check={filterData.genres.includes(genre.id + "")} onChangeEvent={createHandleSelect("genres")} id={`check-${genre.name}`} key={genre.id.toString()} />
        })
    }

    const renderCountry = () => {
        if (!languagesData) return
        return languagesData.map(data => {
            return <DropItem name={data.english_name} value={data.iso_639_1} check={filterData.languages.includes(data.iso_639_1)} id={`check-${data.english_name}`} key={data.english_name} onChangeEvent={createHandleSelect("languages")} />
        })
    }

    const renderYear = () => {
        let el: React.ReactElement[] = [<DropItemSimple name={"All"} check={filterData.year === ""} value={""} id={`check-all`} key={`all`} onChangeEvent={handleSelectYear} />]
        const now = new Date()
        let currentYears = now.getFullYear()
        for (let index = currentYears; index >= currentYears - 12; index--) {
            el.push(<DropItemSimple name={index + ""} check={filterData.year === index + ""} value={index + ""} id={`check-${index.toString()}`} key={index.toString()} onChangeEvent={handleSelectYear} />)
        }

        return el
    }


    return (
        <div className='mt-6 flex items-center flex-wrap xs:flex-nowrap gap-2'>

            <Dropdown grid key={1} selected={genresSelectedString} buttonIcon={<FaFolderOpen className='text-sm' />} title='Genre' renderItems={renderGenre} />
            <Dropdown grid key={2} selected={languagesSelectedString} dropContentClassName='languages-drop' buttonIcon={<FaGlobeAmericas className='text-sm' />} title='Languages' renderItems={renderCountry} />
            <Dropdown key={3} selected={yearSelectedString} buttonIcon={<FaCalendarAlt className='text-sm' />} title='Years' renderItems={renderYear} />
            <button onClick={() => onFilter && onFilter(filterData)} className=' w-[48%] xs:w-auto px-2 py-1.5 hover:opacity-75 cursor-pointer transition-opacity duration-300 h-full font-light text-sm gap-x-1 flex justify-center items-center bg-dark-teal rounded'><FaFilter className='text-base' />Filter</button>
        </div>
    )
}

export default FilterBar