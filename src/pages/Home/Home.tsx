import React, { useCallback, useEffect, useState } from 'react'


import { MdKeyboardArrowRight, MdLiveTv } from 'react-icons/md'
import Wrapper from '../../components/Wrapper/Wrapper';
import SocialList from '../../components/SocialList/SocialList';
import GridContainer from '../../components/GridContainer/GridContainer';
import tmdbApi, { TmdbMediaType } from '../../services/tmdbApi';
import { Movie, TV } from '../../Types/Movie';
import ListMovieHorizontal from '../../components/ListMovieHorizontal/ListMovieHorizontal';
import Card from '../../components/Card/Card';
import { useQuery } from '@tanstack/react-query';
import { AiFillPlayCircle } from 'react-icons/ai';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { VideoResult } from '../../Types/Video';
import HeroSlide from '../../components/HeroSlide/HeroSlide';
import VideoModal from '../../components/VideoModal/VideoModal';
import { siteMap } from '../../Types/common';
import SkeletonCard from '../../components/Skeleton/SkeletonCard';

type Props = {}

const Home = (props: Props) => {
    const [topRatingSelect, setTopRatingSelect] = useState<"movie" | "tv">("movie")
    const [popularSelect, setPopularSelect] = useState<"movie" | "tv">("movie")
    const [trailer, setTrailer] = useState<{ mediaType: TmdbMediaType, id: number }>()
    const [showPopup, setShowPopup] = useState<boolean>(false)


    const trendingQuery = useQuery({
        queryKey: ["trending"],
        queryFn: () => tmdbApi.getTrendingMovies()
    })


    const topRatedQuery = useQuery({
        queryKey: ["top_rated", topRatingSelect],
        queryFn: () => tmdbApi.getList<Movie | TV>(topRatingSelect, "top_rated"),
        keepPreviousData: true

    })

    const popularQuery = useQuery({
        queryKey: ["popular", popularSelect],
        queryFn: () => tmdbApi.getList<Movie | TV>(popularSelect, "popular"),
        keepPreviousData: true
    })

    const latestMovieQuery = useQuery({
        queryKey: ["latest_movie", { page: 1 }],
        queryFn: () => tmdbApi.getDiscoverList<Movie>("movie")
    })

    const latestTVQuery = useQuery({
        queryKey: ["latest_tv", { page: 1 }],
        queryFn: () => tmdbApi.getDiscoverList<TV>("tv")
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

    const handleClickTrailer = useCallback((media_type: TmdbMediaType, id: number) => {
        setTrailer({ mediaType: media_type, id })
        setShowPopup(true)
    }, [trendingQuery.data])



    return (
        <div className='home'>
            {/* hero slide */}
            <HeroSlide onClickTrailer={handleClickTrailer} />

            <div className="main-content bg-black-2">
                {/* about info */}
                <section className="about py-3">
                    <Wrapper>
                        <h2 className='text-light-gray text-xl'>Watch Movies Online Free</h2>
                        <p className='text-light-gray text-xs sm:text-sm mt-2'><span className='text-white text-sm'>Movie<span className='text-dark-teal'>Flix</span></span> - Just a better place to watch movies online for free. It allows you to watch movies online in high quality for free. No registration is required. The content is updated daily with fast streaming servers, multi-language subtitles supported. Just open fmovies.to and watch your favorite movies, tv-shows. We have almost any movie, tv-shows you want to watch!</p>
                        <p className='text-light-gray mt-2 text-xs sm:text-sm'>Please help us by sharing this site with your friends. Thanks!</p>
                        <SocialList className='mt-2' />
                    </Wrapper>
                </section>



                <section >
                    <Wrapper>
                        <h2 className='text-light-gray py-1 text-2xl relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[1px] after:bg-white/40'>Top Trending </h2>
                        {
                            trendingQuery.data && <ListMovieHorizontal mediaType='all' className='pb-8 pt-6' data={trendingQuery.data?.data.results.slice(5)} />
                        }
                        {
                            trendingQuery.isLoading && <ListMovieHorizontal mediaType='all' className='pb-8 pt-6' data={[]} skeleton />
                        }
                    </Wrapper>

                </section>

                <section >
                    <Wrapper>
                        <h2 className='text-light-gray flex-col xs:flex-row gap-x-6 gap-y-4 flex  py-1 text-2xl relative  '>
                            <span className='after:content-[""] relative after:absolute after:bottom-0 pb-1 after:left-0 after:w-16 after:h-[1px] after:bg-white/40'>Top Rating</span>
                            <div className='flex'>
                                <button onClick={() => setTopRatingSelect("movie")} className={classNames('flex  items-center justify-center text-xs gap-1 font-medium bg-blue-gray hover:bg-blue-gray-2 transition duration-300  p-2 rounded [&.active]:bg-dark-teal [&.active]:text-white ', { active: topRatingSelect === 'movie' })}><AiFillPlayCircle className='text-xl' /> Movies</button>
                                <button onClick={() => setTopRatingSelect("tv")} className={classNames('flex ml-2 items-center justify-center text-xs gap-1 font-medium bg-blue-gray hover:bg-blue-gray-2 transition duration-300  p-2 rounded [&.active]:bg-dark-teal [&.active]:text-white ', { active: topRatingSelect === 'tv' })}><MdLiveTv className='text-xl' /> <span className='mt-0.5'>TV-Series</span></button>
                            </div>
                        </h2>
                        {
                            topRatedQuery.data && <ListMovieHorizontal mediaType={topRatingSelect} className='pb-8 pt-6' data={(topRatedQuery.data.data.results as Movie[]) || (topRatedQuery.data.data.results as TV[]) || []} />
                        }
                        {
                            topRatedQuery.isLoading && <ListMovieHorizontal mediaType='all' className='pb-8 pt-6' data={[]} skeleton />
                        }
                    </Wrapper>

                </section>

                <section >
                    <Wrapper>
                        <h2 className='text-light-gray flex-col xs:flex-row gap-x-6 gap-y-4 flex-wrap flex py-1 text-2xl'>
                            <span className='after:content-[""] relative after:absolute after:bottom-0 pb-1 after:left-0 after:w-16 after:h-[1px] after:bg-white/40'>Popular</span>
                            <div className='flex'>
                                <button onClick={() => setPopularSelect("movie")} className={classNames('flex items-center justify-center text-xs gap-1 font-medium bg-blue-gray hover:bg-blue-gray-2 transition duration-300  p-2 rounded [&.active]:bg-dark-teal [&.active]:text-white ', { active: popularSelect === 'movie' })}><AiFillPlayCircle className='text-xl' /> Movies</button>
                                <button onClick={() => setPopularSelect("tv")} className={classNames('flex ml-2 items-center justify-center text-xs gap-1 font-medium bg-blue-gray hover:bg-blue-gray-2 transition duration-300  p-2 rounded [&.active]:bg-dark-teal [&.active]:text-white ', { active: popularSelect === 'tv' })}><MdLiveTv className='text-xl' /> <span className='mt-0.5'>TV-Series</span></button>
                            </div>
                        </h2>
                        {
                            popularQuery.data && <ListMovieHorizontal mediaType={popularSelect} className='pb-8 pt-6' data={(popularQuery.data.data.results as Movie[]) || (popularQuery.data.data.results as TV[]) || []} />
                        }
                        {
                            popularQuery.isLoading && <ListMovieHorizontal mediaType='all' className='pb-8 pt-6' data={[]} skeleton />
                        }
                    </Wrapper>

                </section>

                {/* latest movies */}
                <section className='top-rated py-6 bg-black-2'>
                    <Wrapper>
                        <h2 className='text-light-gray flex py-1 text-2xl relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[1px] after:bg-white/40'>
                            <span>Movies</span>
                            <Link to={"/movies"} className='flex ml-auto items-center text-sm text-dark-teal transition-opacity duration-300 hover:opacity-75'>View all <span className='text-base bg-dark-teal rounded-full text-black ml-2'><MdKeyboardArrowRight /></span></Link>
                        </h2>

                        <GridContainer className='lg:gap-x-3 gap-y-6 gap-x-2'>
                            {
                                latestMovieQuery.data && latestMovieQuery.data.data.results.map((movie, index) => {
                                    return (
                                        <Card key={movie.id + `-${Math.random().toString()}`} mediaType='movie' data={movie} />
                                    )
                                })
                            }

                            {
                                latestMovieQuery.isLoading && new Array(14).fill(0).map((_, index) => {
                                    return (
                                        <SkeletonCard key={index.toString() + "movies"} />
                                    )
                                })
                            }
                        </GridContainer>
                    </Wrapper>
                </section>

                {/* latest tv-series */}
                <section className='top-rated py-6 bg-black-2'>
                    <Wrapper>
                        <h2 className='text-light-gray flex py-1 text-2xl relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[1px] after:bg-white/40'>
                            <span>TV-Series</span>
                            <Link to={"/tv-series"} className='flex ml-auto items-center text-sm text-dark-teal transition-opacity duration-300 hover:opacity-75'>View all <span className='text-base bg-dark-teal rounded-full text-black ml-2'><MdKeyboardArrowRight /></span></Link>
                        </h2>

                        <GridContainer className='lg:gap-x-3 gap-y-6 gap-x-2'>
                            {
                                latestTVQuery.data && latestTVQuery.data.data.results.map((tv, index) => {
                                    if (!tv.poster_path) return
                                    return (
                                        <Card key={tv.id + `-${Math.random().toString()}`} mediaType='tv' data={tv} />
                                    )
                                })
                            }

                            {
                                latestTVQuery.isLoading && new Array(14).fill(0).map((_, index) => {
                                    return (
                                        <SkeletonCard key={index.toString() + "tv-series"} />
                                    )
                                })
                            }
                        </GridContainer>
                    </Wrapper>
                </section>


            </div>

            <VideoModal requestClosePopup={handleRequestClosePopup} show={showPopup} embed={trailer ? `${queryVideos.data?.data.results[0].site === "YouTube" ? siteMap.YouTube : siteMap.Vimeo || ""}${queryVideos.data?.data.results[0].key || ""}` : "#"} />
        </div>
    )
}

export default Home