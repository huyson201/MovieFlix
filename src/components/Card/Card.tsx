import React, { useMemo } from 'react'
import { Movie, TV, TrendingVideo } from '../../Types/Movie'
import { originalImage } from '../../services/apiConfigs'
import { AiTwotoneStar } from 'react-icons/ai'
import { MediaType } from '../../services/tmdbApi'
import classNames from 'classnames'
import { Link } from 'react-router-dom'
import { urlMap } from '../../Types/common'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { BsFillPlayCircleFill } from 'react-icons/bs'


type Props = {
    data: TrendingVideo | Movie | TV,
    mediaType: MediaType
    size?: "normal" | "large"
}



const Card = ({ data, mediaType, size = 'large' }: Props) => {
    let parserData = useMemo(() => {
        let name: string
        let media_type: MediaType
        let date: string

        if (mediaType === 'all') {
            let parseData = (data as TrendingVideo)
            name = parseData.title || parseData.name
            date = parseData.release_date || parseData.first_air_date
            media_type = parseData.media_type
        }
        else if (mediaType === 'movie') {
            let parseData = (data as Movie)
            name = parseData.title
            date = parseData.release_date
            media_type = 'movie'
        } else {
            let parseData = (data as TV)
            name = parseData.name
            date = parseData.first_air_date
            media_type = "tv"
        }

        return {
            name,
            media_type,
            date
        }

    }, [data])

    return (
        <div className="card hover:scale-105 transition-transform duration-300 overflow-hidden rounded-xl" >
            <Link to={`${urlMap[parserData.media_type]}/${encodeURIComponent(parserData.name?.toLowerCase()).replace(/%20/g, '-') || ""}/${data.id}`} className='w-full block h-full'>
                <div className={classNames(`list__card-content group`, { 'h-60': size === 'normal', 'h-[280px]': size === 'large' })}>
                    <LazyLoadImage
                        wrapperClassName='w-full h-full block'
                        effect='blur' loading='lazy'
                        className='w-full h-full block object-cover'
                        alt={data.poster_path}
                        srcSet={`${originalImage(data.poster_path, 300)} 300w`}
                    />

                    <div className='absolute bottom-0  py-3 left-0 w-full px-3  z-[6]'>
                        <div className='text-white block font-light text-[14px] hover:text-dark-teal transition-colors duration-300'>{parserData.name}</div>
                        <div className='flex items-end  text-light-gray text-xs'>
                            <span>{parserData.date ? (new Date(parserData.date)).getFullYear() : "N/A"}</span>
                            <span className='flex items-center ml-2 text-[10px] gap-[2px]'><AiTwotoneStar className='text-sm' />{data.vote_average.toFixed(1)}</span>
                            <span className='inline-block text-[10px] border border-light-gray px-1 py-[2px] rounded ml-auto'>{parserData.media_type}</span>
                        </div>
                    </div>
                    <div className='absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 bg-white rounded-full text-dark-teal 
                        text-[36px] flex z-[6] scale-50 opacity-0 
                        group-hover:opacity-100 group-hover:scale-100 transition-all duration-300'><BsFillPlayCircleFill /></div>
                </div>
            </Link>
        </div>

    )
}

export default Card