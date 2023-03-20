import React from 'react'
import image from "../../assets/images/404.svg"
import { Link } from 'react-router-dom'
import { urlMap } from '../../Types/common'
import Wrapper from '../../components/Wrapper/Wrapper'
type Props = {}

const Error404Page = (props: Props) => {
    return (
        <div className='flex items-center fixed z-50 bg-white w-full h-[100vh] flex-col'>
            <img src={image} className='max-w-[400px] w-full' alt="error-img" />

            <Wrapper>
                <h2 className='text-2xl text-[#2563eb] font-semibold capitalize text-center'>404 not found</h2>
                <h1 className='text-black font-bold mt-4 text-3xl md:text-4xl text-center'>Whoops! That page doesn’t exist.</h1>
                <div className='mt-6 text-gray-600 text-center'>Here are some helpful links instead:</div>
                <div className='mt-4 space-x-2 underline transition-colors text-gray-600 capitalize text-center '>
                    <Link className='capitalize hover:text-black transition-colors duration-300' to={"/"}>home</Link>
                    <Link className='capitalize hover:text-black transition-colors duration-300' to={urlMap.movie}>Movies</Link>
                    <Link className='capitalize hover:text-black transition-colors duration-300' to={urlMap.tv}>TV-series</Link>
                    <Link className='capitalize hover:text-black transition-colors duration-300' to={urlMap.search}>Search</Link>
                </div>
            </Wrapper>
        </div>
    )
}

export default Error404Page