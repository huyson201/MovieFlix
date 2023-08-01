import React from 'react'

export interface BackdropContextType {
    isShow: boolean,
    showBackdrop: () => void,
    hiddenBackdrop: () => void
}
const BackdropContext = React.createContext<BackdropContextType | null>(null)

export const useBackdrop = () => React.useContext(BackdropContext)
export const BackdropProvider = ({ children }: { children: any }) => {
    const [isShow, setIsShow] = React.useState(false)

    const showBackdrop = () => {
        setIsShow(true)
    }
    const hiddenBackdrop = () => setIsShow(false)
    return (
        <BackdropContext.Provider value={{ isShow, showBackdrop, hiddenBackdrop }}>
            {children}
        </BackdropContext.Provider>
    )
}