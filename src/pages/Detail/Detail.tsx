import React, { useEffect, useState } from 'react'
import Wrapper from '../../components/Wrapper/Wrapper'
import { BsClockHistory } from 'react-icons/bs'
import { AiFillStar } from 'react-icons/ai'
import { SlArrowRight } from 'react-icons/sl'
import tmdbApi, { TmdbMediaType } from '../../services/tmdbApi'
import { useQuery } from '@tanstack/react-query'
import { useLocation, useParams } from 'react-router-dom'
import { DetailMovie, DetailTV, Movie, TV, TrendingVideo } from '../../Types/Movie'
import { originalImage } from '../../services/apiConfigs'
import { Cast, Crew } from '../../Types/Cast'
import ListMovieHorizontal from '../../components/ListMovieHorizontal/ListMovieHorizontal'
import { VideoResult } from '../../Types/Video'
import VideoModal from '../../components/VideoModal/VideoModal'
import Error404Page from '../Error/Error404Page'
import axios, { AxiosError } from 'axios'
import Error500Page from '../Error/Error500Page'
import Loader from '../../components/Loader/Loader'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import SkeletonDetail from '../../components/Skeleton/SkeletonDetail'

type Props = {
    mediaType: TmdbMediaType
}

const Detail = ({ mediaType }: Props) => {
    const [trailer, setTrailer] = useState<{ mediaType: TmdbMediaType, id: number }>()
    const [showPopup, setShowPopup] = useState<boolean>(false)
    const { id } = useParams()
    const location = useLocation()
    if (!id || !Number(id)) return <Error404Page />

    const { data, status, error, isFetching, isFetched } = useQuery({
        queryKey: ["detail", mediaType, id],
        queryFn: () => tmdbApi.getDetail<DetailMovie | DetailTV>(mediaType, +id),
        enabled: id !== undefined
    })

    const queryCast = useQuery({
        queryKey: ["cast", mediaType, id],
        queryFn: () => tmdbApi.getCast<{ cast: Cast[], crew: Crew[] }>(mediaType, +id),
        enabled: id !== undefined
    })

    const recommendsQuery = useQuery({
        queryKey: ["recommends", mediaType, id],
        queryFn: () => tmdbApi.getRecommendations<Movie | TV | TrendingVideo>(mediaType, +id),
        enabled: id !== undefined
    })

    const queryVideos = useQuery({
        queryKey: ["video", trailer],
        queryFn: () => tmdbApi.getVideo<VideoResult>(trailer?.mediaType, trailer?.id),
        enabled: trailer?.mediaType !== undefined && trailer.id !== undefined,
        keepPreviousData: false
    })

    const handleRequestClosePopup = () => {
        setTrailer(undefined)
        setShowPopup(false)
    }

    const handleClickTrailer = (media_type: TmdbMediaType, id: number) => {
        setTrailer({ mediaType: media_type, id })
        setShowPopup(true)
    }

    if (!data && isFetched || error) {
        if (axios.isAxiosError(error) && (error as AxiosError).response?.status === 404) {
            return <Error404Page />
        }
        return <Error500Page />
    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [location])


    return (
        <div className='detail-page' >
            {
                data && <div className="detail" style={{ backgroundImage: `url(${originalImage(data.data.backdrop_path)})` }}>
                    <Wrapper className='relative z-[1] flex flex-col md:flex-row gap-8 md:gap-16 py-5'>
                        <div className="detail-card overflow-hidden self-center rounded-2xl w-60">
                            <LazyLoadImage src={originalImage(data.data.poster_path)} loading='lazy' alt={(data.data as DetailMovie).title || (data.data as DetailTV).name || ''} />
                        </div>
                        <div className="detail-content text-white md:flex-1">
                            <div className="name text-white text-4xl tracking-widest font-extrabold">{(data.data as DetailMovie).title || (data.data as DetailTV).name || ''}</div>
                            <div className="info flex items-center gap-2 md:gap-4 text-sm mt-4">
                                <span className='tracking-widest'>{new Date((data.data as DetailMovie).release_date || (data.data as DetailTV).first_air_date).getFullYear() || "N/A"}</span>
                                <span className='flex items-center gap-2'><BsClockHistory className='text-xl' />{(data.data as DetailMovie).runtime || (data.data as DetailTV).episode_run_time[0] || 'N/A'}</span>
                                <span className='flex items-center text-sm'><AiFillStar className='text-xl mr-1' /> {data.data.vote_average.toFixed(2)}<span className='text-xs font-sans italic opacity-70'>/10</span></span>
                                <button onClick={() => handleClickTrailer(mediaType, data.data.id)} className='flex items-center gap-4 uppercase tracking-[4px] group'>Trailer <SlArrowRight className='text-xl group-hover:translate-x-1 transition-transform duration-300' /></button>
                            </div>
                            <div className='flex items-center gap-6 flex-wrap mt-6'>
                                {
                                    data.data.genres.map((genre, index) => {
                                        return (
                                            <span key={genre.id.toString()} className='genre-items text-sm border border-white rounded-3xl py-1 px-2'>{genre.name}</span>

                                        )
                                    })
                                }
                            </div>
                            <div className='flex items-center mt-5 gap-x-8 gap-y-4 flex-wrap'>
                                {queryCast.data && queryCast.data?.data.cast.slice(0, 4).map((cast, index) => {
                                    if (!cast.profile_path) return
                                    return (
                                        <div key={cast.id.toString()} className='flex items-center gap-4'>
                                            <img className='w-10 h-10 rounded-full object-cover' src={originalImage(cast.profile_path)} alt={cast.name} />
                                            <span className='text-sm opacity-70 text-white'>{cast.name}</span>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className='mt-6 text-white text-xs lg:w-[80%]'>
                                {data.data.overview}
                            </div>
                        </div>
                    </Wrapper>
                </div>
            }
            {isFetching && <SkeletonDetail />}
            <div className='bg-black-2 py-5'>
                <Wrapper>
                    {
                        recommendsQuery.data && recommendsQuery.data.data.results.length > 0 && <h2 className='text-light-gray text-2xl relative'>Recommends</h2>
                    }

                    {
                        recommendsQuery.data && recommendsQuery.data.data.results.length > 0 && <div className='list-movie-horizontal'>

                            {
                                <ListMovieHorizontal className='pb-8 pt-6' data={(recommendsQuery.data.data.results as Movie[]) || (recommendsQuery.data.data.results as TV[]) || []} mediaType={mediaType} />
                            }

                        </div>
                    }

                    {
                        recommendsQuery.isFetching && <ListMovieHorizontal skeleton data={[]} mediaType='all' />
                    }

                </Wrapper>
            </div>

            <VideoModal requestClosePopup={handleRequestClosePopup} show={showPopup} embed={trailer ? `https://www.youtube.com/embed/${queryVideos.data?.data.results[0].key || ""}` : "#"} />
        </div >
    )
}

export default Detail