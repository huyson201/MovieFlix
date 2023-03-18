import React from 'react'
import { BsFillPlayFill } from 'react-icons/bs'
import { FaStar } from 'react-icons/fa'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import Wrapper from '../Wrapper/Wrapper'
import banner1 from '../../assets/images/baner1.jpg'

type Props = {}

const HeroSlide = (props: Props) => {
    return (
        <div className={`hero-slide`} style={{ backgroundImage: `url(${banner1})` }}>
            <Wrapper className='h-full relative z-10'>
                <div className="slide-content w-full md:w-[65%] pr-6 ">
                    <div className="movie-name text-3xl md:text-4xl text-white font-bold  drop-shadow-lg pr-6">Avatar: The Way of Water</div>
                    <div className="movie-info flex items-center gap-2 sm:gap-4 md:gap-6 mt-2">
                        <span className="quality px-2 rounded bg-dark-teal font-medium">SD</span>
                        <span className="rating flex  gap-1 text-white text-sm">
                            <FaStar size={16} />7.5
                        </span>
                        <div className="min text-white/50 text-xs ">120 min</div>
                        <div className="cate">
                            <a href="cates" className='cates inline-block ml-3 text-xs text-white/60 hover:text-white transition-colors duration-300 ease-out'>Adventure</a>
                            <a href="cates" className='cates inline-block ml-3 text-xs text-white/60 hover:text-white transition-colors duration-300 ease-out'>Action</a>
                            <a href="cates" className='cates inline-block ml-3 text-xs text-white/60 hover:text-white transition-colors duration-300 ease-out'>Fantasy</a>
                        </div>

                    </div>
                    <div className="movie-desc hidden  sm:block mt-4 text-white/50 font-thin text-sm">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui voluptatibus officia quidem exercitationem non, atque eaque nesciunt aliquam dolorum quia alias voluptas, ullam ipsam error fugiat sed odio tempora sint?
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
    )
}

export default HeroSlide