import React from 'react'
import detailBg from '../../assets/images/detail-bg.webp'
import detail from '../../assets/images/detail.webp'
import cast1 from '../../assets/images/cast1.webp'
import cast2 from '../../assets/images/cast2.webp'
import cast3 from '../../assets/images/cast3.webp'
import card from '../../assets/images/card.jpg'
import Wrapper from '../../components/Wrapper/Wrapper'
import { BsClockHistory } from 'react-icons/bs'
import { AiFillStar } from 'react-icons/ai'
import { SlArrowRight } from 'react-icons/sl'
import { Pagination } from 'swiper'
import { SwiperSlide, Swiper } from 'swiper/react'
type Props = {}

const Detail = (props: Props) => {
    return (
        <div className='detail-page' >
            <div className="detail" style={{ backgroundImage: `url(${detailBg})` }}>
                <Wrapper className='relative z-[1] flex flex-col md:flex-row gap-8 md:gap-16 py-5'>
                    <div className="detail-card overflow-hidden self-center rounded-2xl w-60">
                        <img src={detail} alt="" />
                    </div>
                    <div className="detail-content text-white md:flex-1">
                        <div className="name text-white text-4xl tracking-widest font-extrabold">The Whale</div>
                        <div className="info flex items-center gap-2 md:gap-4 text-sm mt-4">
                            <span className='tracking-widest'>2022</span>
                            <span className='flex items-center gap-2'><BsClockHistory className='text-xl' /> 120 min</span>
                            <span className='flex items-center'><AiFillStar className='text-xl mr-1' /> 7.8<span className='text-xs font-sans italic opacity-70'>/10</span></span>
                            <button className='flex items-center gap-4 uppercase tracking-[4px] group'>Trailer <SlArrowRight className='text-xl group-hover:translate-x-1 transition-transform duration-300' /></button>
                        </div>
                        <div className='flex items-center gap-6 flex-wrap mt-6'>
                            <span className='genre-items text-sm border border-white rounded-3xl py-1 px-2'>Action</span>
                            <span className='genre-items text-sm border border-white rounded-3xl py-1 px-2'>Adventure</span>
                            <span className='genre-items text-sm border border-white rounded-3xl py-1 px-2'>Comedy</span>
                            <span className='genre-items text-sm border border-white rounded-3xl py-1 px-2'>Documentary</span>
                        </div>
                        <div className='flex items-center mt-5 gap-x-8 gap-y-4 flex-wrap'>
                            <div className='flex items-center gap-4'>
                                <img className='w-10 h-10 rounded-full object-cover' src={cast1} alt="cast" />
                                <span className='text-sm opacity-70 text-white'>Idris Elba</span>
                            </div>
                            <div className='flex items-center gap-4'>
                                <img className='w-10 h-10 rounded-full object-cover' src={cast2} alt="cast" />
                                <span className='text-sm opacity-70 text-white'>Idris Elba</span>
                            </div>
                            <div className='flex items-center gap-4'>
                                <img className='w-10 h-10 rounded-full object-cover' src={cast3} alt="cast" />
                                <span className='text-sm opacity-70 text-white'>Idris Elba</span>
                            </div>

                        </div>
                        <div className='mt-6 text-white text-xs lg:w-[80%]'>
                            Um terrível serial killer está aterrorizando Londres, enquanto o brilhante, mas desgraçado, detetive John Luther está atrás das grades. Assombrado por seu fracasso em capturar o psicopata cibernético que agora o provoca, Luther decide fugir da prisão para terminar o trabalho por qualquer meio necessário.
                        </div>
                    </div>
                </Wrapper>
            </div>
            <div className='bg-black-2 py-5'>
                <Wrapper>
                    <h2 className='text-light-gray text-2xl relative'>Recommends</h2>
                    <div className='list-movie-horizontal'>
                        <Swiper
                            slidesPerView={"auto"}
                            modules={[Pagination]}
                            pagination={{
                                dynamicBullets: true,
                            }}
                            className='pb-8 pt-6'

                        >
                            {
                                new Array(16).fill(0).map((_, index) => {
                                    return (
                                        <SwiperSlide className='w-44 pr-4'>
                                            <div className="card hover:scale-110 transition-transform duration-300 overflow-hidden rounded-xl" key={index.toString()}>
                                                <a href="#" className='w-full'>
                                                    <div className='list__card-content '>
                                                        <img className='w-full  object-cover' src={card} alt="card" />
                                                        <div className='absolute bottom-0  py-3 left-0 w-full px-3 z-[5]'>
                                                            <div className='text-white block font-light text-[14px] hover:text-dark-teal transition-colors duration-300'>Spring Blossom</div>
                                                            <div className='flex items-end  text-light-gray text-xs'>2020 <span className='text-white mx-2'>&bull;</span> 81 min
                                                                <span className='inline-block text-[10px] border border-light-gray px-1 py-[2px] rounded ml-auto'>Movie</span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </a>

                                            </div>
                                        </SwiperSlide>
                                    )
                                })
                            }
                        </Swiper>
                    </div>
                </Wrapper>
            </div>

        </div>
    )
}

export default Detail