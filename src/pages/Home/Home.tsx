import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import SwiperCore, { Autoplay } from 'swiper'

import banner1 from '../../assets/images/baner1.jpg'
import banner2 from '../../assets/images/baner2.jpg'
import banner3 from '../../assets/images/baner3.jpg'
import card from '../../assets/images/card.jpg'

import { FaStar } from 'react-icons/fa';
import { BsDot, BsFillPlayFill } from 'react-icons/bs'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import Wrapper from '../../components/Wrapper/Wrapper';
import SocialList from '../../components/SocialList/SocialList';
import GridCard from '../../components/GridCard/GridCard';
import GridContainer from '../../components/GridContainer/GridContainer';
import tmdbApi from '../../services/tmdbApi';
import { Movie, TV, TrendingVideo } from '../../Types/Movie';
import ListMovieHorizontal from '../../components/ListMovieHorizontal/ListMovieHorizontal';
import HorizontalCard from '../../components/HorizontalCard/HorizontalCard';
import { originalImage } from '../../services/apiConfigs';
import { useQuery } from '@tanstack/react-query';
import { Genres } from '../../Types/Genres';
import getGenres from '../../Helpers/getGenres';

SwiperCore.use([Autoplay])
type Props = {}

const Home = (props: Props) => {

    const genresMovieQuery = useQuery({
        queryKey: ["genres_movie"],
        queryFn: () => tmdbApi.getGenres("movie")
    })

    const genresTVQuery = useQuery({
        queryKey: ["genres_tv"],
        queryFn: () => tmdbApi.getGenres("tv")
    })


    const trendingQuery = useQuery({
        queryKey: ["trending"],
        queryFn: () => tmdbApi.getTrendingMovies()
    })

    const popularMVQuery = useQuery({
        queryKey: ["popular_mv"],
        queryFn: () => tmdbApi.getList<Movie>("movie", "popular")
    })

    const popularTVQuery = useQuery({
        queryKey: ["popular_tv"],
        queryFn: () => tmdbApi.getList<TV>("tv", "popular")
    })

    const topRatedMovieQuery = useQuery({
        queryKey: ["top_rated_movie"],
        queryFn: () => tmdbApi.getList<Movie>("movie", "top_rated")
    })

    const topRatedTVQuery = useQuery({
        queryKey: ["top_rated_tv"],
        queryFn: () => tmdbApi.getList<Movie>("tv", "top_rated")
    })

    const latestMovieQuery = useQuery({
        queryKey: ["latest_movie", { page: 1 }],
        queryFn: () => tmdbApi.getDiscoverList<Movie>("movie")
    })

    const latestTVQuery = useQuery({
        queryKey: ["latest_tv", { page: 1 }],
        queryFn: () => tmdbApi.getDiscoverList<TV>("tv")
    })


    return (
        <div className='home'>
            {/* hero slide */}
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
                        trendingQuery.data?.data.results.slice(0, 5).map(movie => {
                            let genres: Genres[] = []
                            if (movie.media_type === 'movie') {
                                movie.genre_ids.forEach(id => {
                                    let value = getGenres(id, genresMovieQuery.data?.data.genres)
                                    if (value) {
                                        genres = [...genres, value]
                                    }
                                })
                            }
                            else {
                                movie.genre_ids.forEach(id => {
                                    let value = getGenres(id, genresTVQuery.data?.data.genres)
                                    if (value) {
                                        genres = [...genres, value]
                                    }
                                })
                            }



                            return (
                                <SwiperSlide key={`${movie.id}-${movie.original_name}`}>
                                    <div className={`hero-slide`} style={{ backgroundImage: `url(${originalImage(movie.backdrop_path)})` }}>
                                        <Wrapper className='h-full relative z-10'>
                                            <div className="slide-content w-full md:w-[65%] pr-6 ">
                                                <div className="movie-name text-3xl md:text-4xl text-white font-bold  drop-shadow-lg pr-6">{movie.name || movie.title}</div>
                                                <div className="movie-info flex items-center gap-2 sm:gap-4 md:gap-6 mt-2">
                                                    <span className="quality px-2 rounded bg-dark-teal font-medium">{movie.media_type.toUpperCase()}</span>
                                                    <span className="rating flex  gap-1 text-white text-sm">
                                                        <FaStar size={16} />{movie.vote_average.toFixed(1)}
                                                    </span>

                                                    <div className="cate">
                                                        {
                                                            genres.map(item => {
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
                                                    <button className="watch-btn banner-btn  border-dark-teal text-dark-teal  hover:bg-dark-teal hover:text-white ">
                                                        <BsFillPlayFill size={20} /> Watch now
                                                    </button>
                                                    <button className="add-btn banner-btn  border-white/50 text-white/50 hover:bg-white hover:text-black"><MdOutlineFavoriteBorder size={16} /> add to list
                                                    </button>
                                                </div>
                                            </div>
                                        </Wrapper>

                                    </div>
                                </SwiperSlide>
                            )
                        })
                    }

                </Swiper>
            </div>

            <div className="main-content bg-black-2">
                {/* about info */}
                <section className="about py-3">
                    <Wrapper>
                        <h2 className='text-light-gray text-xl'>Watch Movies Online Free</h2>
                        <p className='text-light-gray text-xs sm:text-sm mt-2'>my app - Just a better place to watch movies online for free. It allows you to watch movies online in high quality for free. No registration is required. The content is updated daily with fast streaming servers, multi-language subtitles supported. Just open fmovies.to and watch your favorite movies, tv-shows. We have almost any movie, tv-shows you want to watch!</p>
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
                    </Wrapper>

                </section>

                <section >
                    <Wrapper>
                        <h2 className='text-light-gray py-1 text-2xl relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[1px] after:bg-white/40'>Top Rating Movies </h2>
                        {
                            topRatedMovieQuery.data && <ListMovieHorizontal mediaType='movie' className='pb-8 pt-6' data={topRatedMovieQuery.data?.data.results} />
                        }
                    </Wrapper>

                </section>

                <section >
                    <Wrapper>
                        <h2 className='text-light-gray py-1 text-2xl relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[1px] after:bg-white/40'>Popular Movies </h2>
                        {
                            popularMVQuery.data && <ListMovieHorizontal mediaType='movie' className='pb-8 pt-6' data={popularMVQuery.data?.data.results} />
                        }
                    </Wrapper>

                </section>

                <section >
                    <Wrapper>
                        <h2 className='text-light-gray py-1 text-2xl relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[1px] after:bg-white/40'>Top Rating TV</h2>
                        {
                            topRatedTVQuery.data && <ListMovieHorizontal mediaType='tv' className='pb-8 pt-6' data={topRatedTVQuery.data?.data.results} />
                        }
                    </Wrapper>

                </section>

                <section >
                    <Wrapper>
                        <h2 className='text-light-gray py-1 text-2xl relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[1px] after:bg-white/40'>Popular TV</h2>
                        {
                            popularTVQuery.data && <ListMovieHorizontal mediaType='tv' className='pb-8 pt-6' data={popularTVQuery.data?.data.results} />
                        }
                    </Wrapper>

                </section>


                <section className='top-rated py-6 bg-black-2'>
                    <Wrapper>
                        <h2 className='text-light-gray py-1 text-2xl relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[1px] after:bg-white/40'>Movies </h2>

                        <GridContainer>
                            {
                                latestMovieQuery.data && latestMovieQuery.data.data.results.map((movie, index) => {
                                    return (
                                        <GridCard key={movie.id + `-${Math.random().toString()}`} mediaType='movie' data={movie} />
                                    )
                                })
                            }
                        </GridContainer>
                    </Wrapper>
                </section>

                <section className='top-rated py-6 bg-black-2'>
                    <Wrapper>
                        <h2 className='text-light-gray py-1 text-2xl relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-16 after:h-[1px] after:bg-white/40'>TV-Series </h2>

                        <GridContainer>
                            {
                                latestTVQuery.data && latestTVQuery.data.data.results.map((tv, index) => {
                                    return (
                                        <GridCard key={tv.id + `-${Math.random().toString()}`} mediaType='tv' data={tv} />
                                    )
                                })
                            }
                        </GridContainer>
                    </Wrapper>
                </section>


            </div>
        </div>
    )
}

export default Home