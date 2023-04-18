import React from 'react'
import { AiOutlineWhatsApp } from 'react-icons/ai'
import { FaFacebookF, FaLinkedinIn, FaPinterestP, FaTelegramPlane, FaTwitter } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
import classnames from 'classnames'
type Props = {
    className?: string
}

const SocialList = (props: Props) => {
    return (
        <div className={classnames(props.className, 'socials flex  items-center gap-2')}>
            <a href="#" className='transition-transform hover:-translate-y-[6px] duration-300 ease-in-out py-[6px] px-2 md:px-3 bg-[#3b5998] flex items-center text-white text-[10px] gap-1'><span className='icon'><FaFacebookF /></span> <span className='md:inline hidden'>Facebook</span></a>
            <a href="#" className='transition-transform hover:-translate-y-[6px] duration-300 ease-in-out py-[6px] px-2 md:px-3 bg-[#1da1f2] flex items-center text-white text-[10px] gap-1'><span className='icon'><FaTwitter /></span> <span className='md:inline hidden'>Twitter</span></a>
            <a href="#" className='transition-transform hover:-translate-y-[6px] duration-300 ease-in-out py-[6px] px-2 md:px-3 bg-[#848484] flex items-center text-white text-[10px] gap-1'><span className='icon'><MdEmail /></span> <span className='md:inline hidden'>Email</span></a>
            <a href="#" className='transition-transform hover:-translate-y-[6px] duration-300 ease-in-out py-[6px] px-2 md:px-3 bg-[#0077b5] flex items-center text-white text-[10px] gap-1'><span className='icon'>< FaLinkedinIn /></span><span className='md:inline hidden'>LinkedIn</span></a>
            <a href="#" className='transition-transform hover:-translate-y-[6px] duration-300 ease-in-out py-[6px] px-2 md:px-3 bg-[#cb2027] flex items-center text-white text-[10px] gap-1'><span className='icon'><FaPinterestP /></span><span className='md:inline hidden'>Pinterest</span></a>
            <a href="#" className='transition-transform hover:-translate-y-[6px] duration-300 ease-in-out py-[6px] px-2 md:px-3 bg-[#4dc247] flex items-center text-white text-[10px] gap-1'><span className='icon'><AiOutlineWhatsApp /></span ><span className='md:inline hidden'>WhatsApp</span></a>
            <a href="#" className='transition-transform hover:-translate-y-[6px] duration-300 ease-in-out py-[6px] px-2 md:px-3 bg-[#0088cc] flex items-center text-white text-[10px] gap-1'><span className='icon'><FaTelegramPlane /></span><span className='md:inline hidden'>Telegram</span></a>
        </div>
    )
}

export default SocialList