import classNames from 'classnames'
import React from 'react'
import { Pagination } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import HorizontalCard from '../HorizontalCard/HorizontalCard'
import card from '../../assets/images/card.jpg'
import { Movie, TV, TrendingVideo } from '../../Types/Movie'
import { MediaType } from '../../services/tmdbApi'

type Props = {
    className?: string,
    data: TrendingVideo[] | Movie[] | TV[],
    mediaType: MediaType
}

const ListMovieHorizontal = (props: Props) => {
    return (
        <Swiper
            slidesPerView={"auto"}
            modules={[Pagination]}
            pagination={{
                dynamicBullets: true,
            }}
            className={classNames(props.className)}

        >
            {
                props.data.map((movie, index) => {
                    if (!movie.poster_path) return
                    return (
                        <SwiperSlide className='w-44 pr-4 self-stretch' key={movie.id.toString() + `-${Math.random()}`}>
                            <HorizontalCard mediaType={props.mediaType} size='normal' data={movie} />
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    )
}

export default ListMovieHorizontal