import classNames from 'classnames'
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

type Props = {
    embed: string,
    show?: boolean,
    requestClosePopup?: () => void

}

const VideoModal = ({ embed, show, requestClosePopup }: Props) => {
    if (!show) return null
    return (
        <div className={classNames('fixed flex items-center justify-center w-full h-[100vh] bg-black/80 text-white z-50 top-0 left-0')}>
            <div className='w-full px-4 sm:w-[55%]  '>
                <div className='sm:py-1 bg-black-2 rounded-t-3xl text-white text-right text-2xl'><button onClick={requestClosePopup} className='inline-block mr-4 mt-2 hover:text-dark-teal transition-colors'><AiOutlineClose /></button></div>
                <iframe allow='autoplay; encrypted-media'
                    allowFullScreen title='video' src={embed} className='h-[240px] sm:h-[360px] w-[100%] rounded-b-3xl' ></iframe>
            </div>
        </div>
    )
}

export default VideoModal