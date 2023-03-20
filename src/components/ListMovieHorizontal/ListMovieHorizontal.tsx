import classNames from 'classnames'
import React from 'react'
import { Pagination, Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import HorizontalCard from '../HorizontalCard/HorizontalCard'
import { Movie, TV, TrendingVideo } from '../../Types/Movie'
import { MediaType } from '../../services/tmdbApi'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

type Props = {
    className?: string,
    data: TrendingVideo[] | Movie[] | TV[],
    mediaType: MediaType
}

const NextButton = () => {
    return (<>
        <div>Next</div>
    </>)
}
const ListMovieHorizontal = (props: Props) => {
    const navigationPrevRef = React.useRef(null)
    const navigationNextRef = React.useRef(null)
    return (

        <Swiper
            slidesPerView={"auto"}
            modules={[Navigation, Pagination]}
            pagination={{
                dynamicBullets: true,
            }}
            navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
            }}
            rewind={true}
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
            <div ref={navigationNextRef} className='absolute w-28 h-28 bg-black/30 pl-1 hover:bg-black transition duration-300 rounded-full translate-x-[65%] flex justify-start items-center cursor-pointer top-2/4 right-0 -translate-y-2/4 hover:text-white text-white/30 z-10 text-4xl'><MdKeyboardArrowRight /></div>
            <div ref={navigationPrevRef} className='absolute w-28 h-28 bg-black/30 pr-1 hover:bg-black transition duration-300 rounded-full -translate-x-[65%] flex justify-end items-center cursor-pointer top-2/4 left-0 -translate-y-2/4 hover:text-white text-white/30 z-10 text-4xl'><MdKeyboardArrowLeft /> </div>
        </Swiper>
    )
}

export default ListMovieHorizontal