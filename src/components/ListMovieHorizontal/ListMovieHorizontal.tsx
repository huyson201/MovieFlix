import classNames from 'classnames'
import React, { useRef, memo } from 'react'
import { Pagination, Navigation, Swiper as SwiperType, } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import Card from '../Card/Card'
import { Movie, TV, TrendingVideo } from '../../Types/Movie'
import { MediaType } from '../../services/tmdbApi'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'
import SkeletonCard from '../Skeleton/SkeletonCard'

type Props = {
    className?: string,
    data: TrendingVideo[] | Movie[] | TV[],
    mediaType: MediaType,
    skeleton?: boolean
}


const ListMovieHorizontal = memo((props: Props) => {
    const navigationPrevRef = React.useRef<HTMLDivElement>(null)
    const navigationNextRef = React.useRef<HTMLDivElement>(null)
    const swiperRef = useRef<SwiperType>();

    const handleSlideChange = (swiper: SwiperType) => {
        if (!swiperRef.current || !navigationNextRef.current || !navigationPrevRef.current) return

        if (swiper.isBeginning) {
            navigationPrevRef.current?.classList.remove("active")
        }
        else {
            navigationPrevRef.current.classList.add("active")
        }


        if (swiper.activeIndex === swiper.slides.length - 2) {
            navigationNextRef.current.classList.remove("active")
        }
        else {
            navigationNextRef.current.classList.add("active")
        }
    }
    return (

        <Swiper
            slidesPerView={"auto"}
            modules={[Navigation, Pagination]}
            pagination={{
                dynamicBullets: true,
            }}
            onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
            }}
            className={classNames(props.className)}
            onSlideChange={handleSlideChange}

        >

            {
                props.skeleton && new Array(10).fill(0).map((_, index) => {
                    return (
                        <SwiperSlide key={index.toString() + "list-horizontal"} className='w-44 pr-4 self-stretch'>
                            <SkeletonCard size='normal' />
                        </SwiperSlide>
                    )
                })
            }

            {
                !props.skeleton && props.data.map((movie, index) => {
                    if (!movie.poster_path) return
                    return (
                        <SwiperSlide className='w-44 pr-4 self-stretch' key={movie.id.toString() + `-${Math.random()}`}>
                            <Card mediaType={props.mediaType} size='normal' data={movie} />
                        </SwiperSlide>
                    )
                })
            }
            <div ref={navigationNextRef} onClick={() => swiperRef.current?.slideNext()} className='absolute w-28 h-28 bg-black/30 pl-1 [&.active]:flex hover:bg-black transition duration-300 rounded-full translate-x-[65%] hidden active justify-start items-center cursor-pointer top-2/4 right-0 -translate-y-2/4 hover:text-white text-white/30 z-10 text-4xl'><MdKeyboardArrowRight /></div>
            <div ref={navigationPrevRef} onClick={() => swiperRef.current?.slidePrev()} className='absolute w-28 h-28 bg-black/30 pr-1 [&.active]:flex hover:bg-black transition duration-300 rounded-full -translate-x-[65%] hidden  justify-end items-center cursor-pointer top-2/4 left-0 -translate-y-2/4 hover:text-white text-white/30 z-10 text-4xl'><MdKeyboardArrowLeft /> </div>
        </Swiper>
    )
})

export default ListMovieHorizontal