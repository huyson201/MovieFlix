import React from 'react'
import card from '../../assets/images/card.jpg'
import { Movie, TV } from '../../Types/Movie'
import { AiTwotoneStar } from 'react-icons/ai'
import { originalImage } from '../../services/apiConfigs'


type Props = {
    data: Movie | TV,
    mediaType: "movie" | "tv"
}

const GridCard = ({ data, mediaType }: Props) => {
    if (!data.poster_path) return null
    return (
        <div className="card flex flex-col" >
            <a href="#" className='w-full'>
                <div className='w-full relative  after:content-[""] after:top-0 after:left-0 after:absolute after:w-full after:h-full after:z-[2] hover:after:opacity-50 after:transition after:duration-300 after:ease-out after:opacity-20 after:bg-black'>
                    <img className='w-full rounded object-cover' src={originalImage(data.poster_path)} alt="card" />
                </div>
            </a>
            <a href="#" className='text-white block py-2 font-light text-[16px] hover:text-dark-teal transition-colors duration-300'>{(data as Movie).title || (data as TV).first_air_date}</a>
            <div className='flex items-end  text-light-gray text-xs mt-auto'>
                <span>{(new Date((data as Movie).release_date || (data as TV).first_air_date)).getFullYear()}</span>
                <span className='flex items-center ml-2 text-[10px] gap-[2px]'><AiTwotoneStar className='text-sm' />{data.vote_average.toFixed(1)}</span>
                <span className='inline-block text-[10px] border border-light-gray px-1 py-[2px] rounded ml-auto'>{mediaType}</span></div>
        </div>
    )
}

export default GridCard