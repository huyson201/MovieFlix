import classNames from 'classnames'
import React, { useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { useVideoModal } from '../../context/VideoModal/VideoModal.context'

type Props = {
    embed: string,
    show?: boolean,
    requestClosePopup?: () => void

}

const VideoModal = () => {
    const modalState = useVideoModal()
    const [loading, setLoading] = useState(false)

    return (
        <div className={classNames('hidden [&.open]:flex  fixed items-center justify-center w-full h-[100vh] bg-black/80 text-white z-50 top-0 left-0', { open: modalState?.isOpen })}>
            <div className='w-full px-4 sm:w-[55%]  '>
                <div className='sm:py-1 bg-black-2 rounded-t-3xl text-white text-right text-2xl'><button onClick={() => modalState?.close()} className='inline-block mr-4 mt-2 hover:text-dark-teal transition-colors'><AiOutlineClose /></button></div>
                {loading && <div className='text-white py-8 text-center bg-black'>Loading...</div>}
                <iframe
                    allow='autoplay; encrypted-media'
                    allowFullScreen title='video'
                    src={modalState?.video_url || ''}
                    className='h-[240px] sm:h-[360px] w-[100%] rounded-b-3xl'
                ></iframe>
            </div>
        </div>
    )
}

export default VideoModal