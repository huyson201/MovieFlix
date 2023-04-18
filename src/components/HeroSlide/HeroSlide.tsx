import React, { memo } from 'react'
import { BsFillPlayFill } from 'react-icons/bs'
import { FaStar } from 'react-icons/fa'
import { MdLiveTv, MdOutlineFavoriteBorder } from 'react-icons/md'
import Wrapper from '../Wrapper/Wrapper'
import banner1 from '../../assets/images/baner1.jpg'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import SwiperCore, { Autoplay } from 'swiper'
import { Genres } from '../../Types/Genres'
import { originalImage } from '../../services/apiConfigs'
import { Link } from 'react-router-dom'
import { urlMap } from '../../Types/common'
import { BiMoviePlay } from 'react-icons/bi'
import { useQuery } from '@tanstack/react-query'
import tmdbApi, { TmdbMediaType } from '../../services/tmdbApi'
import { RiMovie2Fill } from 'react-icons/ri'
import SkeletonHeroSlice from '../Skeleton/SkeletonHeroSlice'
import { TrendingVideo } from '../../Types/Movie'

type Props = {
    onClickTrailer?: (mediaType: TmdbMediaType, id: number) => void
}

SwiperCore.use([Autoplay])

const HeroSlide = ({ onClickTrailer }: Props) => {
    const trendingQuery = useQuery({
        queryKey: ["trending"],
        queryFn: () => tmdbApi.getTrendingMovies()
    })

    const genresMovieQuery = useQuery({
        queryKey: ["genres_movie"],
        queryFn: () => tmdbApi.getGenres("movie")
    })

    const genresTVQuery = useQuery({
        queryKey: ["genres_tv"],
        queryFn: () => tmdbApi.getGenres("tv")
    })


    return (
        <div className="hero-box">
            <Swiper
                slidesPerView={1}
                modules={[Pagination]}
                pagination={true}
                autoplay={
                    {
                        delay: 5000,
                        disableOnInteraction: false
                    }
                }

            >
                {
                    trendingQuery.isLoading &&
                    (<SwiperSlide>
                        <SkeletonHeroSlice />
                    </SwiperSlide>)
                }

                {
                    trendingQuery.data?.data.results.slice(0, 5).map(movie => {
                        let genres: Genres[] | undefined = []
                        if (movie.media_type === 'movie') {
                            genres = genresMovieQuery.data?.data.genres.filter(genre => movie.genre_ids.includes(genre.id))
                        }
                        else {
                            genres = genresTVQuery.data?.data.genres.filter(genre => movie.genre_ids.includes(genre.id))

                        }



                        return (
                            <SwiperSlide key={`${movie.id}-${movie.original_name}`}>
                                {/* <div className={`hero-slide`} style={{ backgroundImage: `url(${originalImage(movie.backdrop_path)})` }}>
                                    <Wrapper className='h-full relative z-10'>
                                        <div className="slide-content w-full md:w-[65%] pr-6 ">
                                            <Link to={`${urlMap[movie.media_type]}/${encodeURIComponent(movie.name?.toLowerCase()).replace(/%20/g, '-') || "na"}/${movie.id}`} className="movie-name duration-300 transition-colors hover:text-dark-teal text-3xl md:text-4xl  text-white font-bold  drop-shadow-lg pr-6">{movie.name || movie.title}</Link>
                                            <div className="movie-info flex items-center gap-2 sm:gap-4 md:gap-6 mt-2">
                                                <Link to={`${urlMap[movie.media_type]}`} className="quality px-3 py-0.5 flex items-center rounded bg-dark-teal font-medium text-white text-xl">{movie.media_type === "movie" ? <RiMovie2Fill /> : <MdLiveTv />}</Link>
                                                <span className="rating flex  gap-1 text-white text-sm">
                                                    <FaStar size={16} />{movie.vote_average.toFixed(1)}
                                                </span>

                                                <div className="cate">
                                                    {
                                                        genres?.map(item => {
                                                            return (
                                                                <a href="#" key={item.id.toString()} className='cates inline-block mr-3 text-xs text-white/60 hover:text-white transition-colors duration-300 ease-out'>{item.name}</a>
                                                            )
                                                        })
                                                    }

                                                </div>

                                            </div>
                                            <div className="movie-desc hidden  sm:block mt-4 text-white/50 font-thin text-sm">
                                                {movie.overview}
                                            </div>
                                            <div className="buttons mt-8 flex gap-6">
                                                <Link to={`${urlMap[movie.media_type]}/${encodeURIComponent(movie.name?.toLowerCase()).replace(/%20/g, '-') || "na"}/${movie.id}`} className="watch-btn banner-btn  border-dark-teal text-dark-teal  hover:bg-dark-teal hover:text-white ">
                                                    <BsFillPlayFill size={20} /> Watch now
                                                </Link>
                                                <button onClick={() => onClickTrailer && onClickTrailer(movie.media_type, movie.id)} className="add-btn banner-btn  border-white/50 text-white/50 hover:bg-white hover:text-black"><BiMoviePlay size={16} /> Trailer
                                                </button>
                                            </div>
                                        </div>
                                    </Wrapper>

                                </div> */}
                                <Slice movie={movie} genres={genres} onClickTrailer={onClickTrailer} />
                            </SwiperSlide>
                        )
                    })
                }

            </Swiper>
        </div>
    )
}

interface SliceProps {
    movie: TrendingVideo,
    onClickTrailer?: (mediaType: TmdbMediaType, id: number) => void,
    genres: Genres[] | undefined
}
const Slice = memo(({ movie, genres, onClickTrailer }: SliceProps) => {
    return (
        <div className={`hero-slide`} style={{ backgroundImage: `url(${originalImage(movie.backdrop_path)})` }}>
            <Wrapper className='h-full relative z-10'>
                <div className="slide-content w-full md:w-[65%] pr-6 ">
                    <Link to={`${urlMap[movie.media_type]}/${encodeURIComponent((movie.name || movie.title).toLowerCase()).replace(/%20/g, '-') || "na"}/${movie.id}`} className="movie-name duration-300 transition-colors hover:text-dark-teal text-3xl md:text-4xl  text-white font-bold  drop-shadow-lg pr-6">{movie.name || movie.title}</Link>
                    <div className="movie-info flex items-center gap-2 sm:gap-4 md:gap-6 mt-2">
                        <Link to={`${urlMap[movie.media_type]}`} className="quality px-3 py-0.5 flex items-center rounded bg-dark-teal font-medium text-white text-xl">{movie.media_type === "movie" ? <RiMovie2Fill /> : <MdLiveTv />}</Link>
                        <span className="rating flex  gap-1 text-white text-sm">
                            <FaStar size={16} />{movie.vote_average.toFixed(1)}
                        </span>

                        <div className="cate">
                            {
                                genres?.map(item => {
                                    return (
                                        <a href="#" key={item.id.toString()} className='cates inline-block mr-3 text-xs text-white/60 hover:text-white transition-colors duration-300 ease-out'>{item.name}</a>
                                    )
                                })
                            }

                        </div>

                    </div>
                    <div className="movie-desc hidden  sm:block mt-4 text-white/50 font-thin text-sm">
                        {movie.overview}
                    </div>
                    <div className="buttons mt-8 flex gap-6">
                        <Link to={`${urlMap[movie.media_type]}/${encodeURIComponent((movie.name || movie.title).toLowerCase()).replace(/%20/g, '-') || "na"}/${movie.id}`} className="watch-btn banner-btn  border-dark-teal text-dark-teal  hover:bg-dark-teal hover:text-white ">
                            <BsFillPlayFill size={20} /> Watch now
                        </Link>
                        <button onClick={() => onClickTrailer && onClickTrailer(movie.media_type, movie.id)} className="add-btn banner-btn  border-white/50 text-white/50 hover:bg-white hover:text-black"><BiMoviePlay size={16} /> Trailer
                        </button>
                    </div>
                </div>
            </Wrapper>

        </div>
    )
})

export default HeroSlide