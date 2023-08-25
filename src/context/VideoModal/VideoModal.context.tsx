import React, { useState } from 'react'

interface VideoModalState {
    isOpen: boolean
    video_url: string
    open: (url: string) => void
    close: () => void
}
const VideoModalContext = React.createContext<null | VideoModalState>(null)
export const useVideoModal = () => React.useContext(VideoModalContext)

const VideoModalProvider = ({ children }: any) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [videoUrl, setVideoURl] = useState<string>('')

    const open = (url: string) => {
        setVideoURl(url)
        setIsOpen(true)
    }
    const close = () => {
        setIsOpen(false)
        setVideoURl("")
    }

    return (
        <VideoModalContext.Provider value={{ isOpen, video_url: videoUrl, open, close }}>
            {children}
        </VideoModalContext.Provider>
    )
}

export default VideoModalProvider