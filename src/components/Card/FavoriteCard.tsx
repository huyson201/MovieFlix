
import React, { useMemo } from 'react'
import { DetailMovie, DetailTV } from '../../Types/Movie'
import { Link, useSearchParams } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { urlMap } from '../../Types/common'
import classNames from 'classnames'
import { AiTwotoneStar } from 'react-icons/ai'
import { originalImage } from '../../services/apiConfigs'
import { BsFillPlayCircleFill, BsFillPlayFill } from 'react-icons/bs'
import { FaTimes } from 'react-icons/fa'
import { MdOutlineFavorite } from 'react-icons/md'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import authServices from '../../services/axiosBackend/auth/auth.services'
import { useRotatingLoader } from '../../context/RotatingLoader/RotatingLoader.context'

type Props = {
    data: DetailMovie & { mediaType: 'movie' } | DetailTV & { mediaType: "tv" },
    mediaType: "movie" | "tv"
    size?: "normal" | "large"
}

const FavoriteCard = ({ data, mediaType, size }: Props) => {
    if (!data) return null;

    const [searchParams, setSearchParams] = useSearchParams()
    const queryClient = useQueryClient()
    const rotatingLoader = useRotatingLoader()

    const page = useMemo(() => {
        const page = parseInt(searchParams.get("page") || "1")
        return page
    }, [searchParams])

    const parserData = useMemo(() => {
        let name: string
        let media_type: 'movie' | 'tv'
        let date: string

        if (mediaType === 'movie') {
            let parseData = (data as DetailMovie)
            name = parseData.title
            date = parseData.release_date
            media_type = 'movie'
        } else {
            let parseData = (data as DetailTV)
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

    const delFavoriteMutation = useMutation({
        mutationFn: (data: { type: "movie" | "tv", id: string }) => {
            rotatingLoader?.showLoader()
            return authServices.removeFavorite(data)
        },
        onSuccess(data, variables, context) {
            console.log(data)
            queryClient.invalidateQueries({
                queryKey: ["favorites", { page }],
                exact: true
            })
            return data
        },
        onError(error, variables, context) {
            return error
        },
        onSettled(data, error, variables, context) {
            rotatingLoader?.hiddenLoader()
            return data
        },
    })

    const handleRemoveFavorite = () => {
        delFavoriteMutation.mutate({ type: mediaType, id: data.id + "" })
        console.log("click")
    }

    return (
        <div>
            <div className="card hover:scale-105 transition-transform duration-300 overflow-hidden rounded-xl" >
                <Link to={`${urlMap[parserData.media_type]}/${encodeURIComponent(parserData.name?.toLowerCase()).replace(/%20/g, '-') || ""}/${data.id}`} className='w-full block h-full'>
                    <div className={classNames(`list__card-content group`, { 'h-60': size === 'normal', 'h-[280px]': size === 'large' })}>
                        <LazyLoadImage wrapperClassName='w-full h-full block' effect='blur' loading='lazy' className='w-full h-full block object-cover' src={originalImage(data.poster_path)} alt={data.poster_path} />
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
                        group-hover:opacity-100 group-hover:scale-100 transition-all duration-300'>
                            <BsFillPlayCircleFill />
                        </div>
                    </div>
                </Link>
            </div>
            <button className='text-red-400 text-xs flex items-center gap-0.5 pr-1 float-right mt-1.5' onClick={handleRemoveFavorite}><FaTimes className='scale-105' /> Unfavorite</button>
        </div>
    )
}

export default FavoriteCard