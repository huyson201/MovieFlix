import React from 'react'
import { SwiperSlide } from 'swiper/react'
import Wrapper from '../Wrapper/Wrapper'
import Skeleton from 'react-loading-skeleton'

type Props = {}

const SkeletonHeroSlice = (props: Props) => {
    return (
        <Skeleton baseColor="#202020" highlightColor="#444" className="hero-slide w-full h-full skeleton" />
    )
}

export default SkeletonHeroSlice