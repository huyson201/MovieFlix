import React, { useState } from "react"

interface RotatingLoaderState {
    show: boolean,
    showLoader: () => void,
    hiddenLoader: () => void
}

const RotatingLoaderContext = React.createContext<RotatingLoaderState | null>(null)
export const useRotatingLoader = () => React.useContext(RotatingLoaderContext)


const RotatingLoaderProvider = ({ children }: { children: any }) => {
    const [show, setShow] = useState(false)
    const showLoader = () => setShow(true)
    const hiddenLoader = () => setShow(false)

    return (
        <RotatingLoaderContext.Provider value={{ show, showLoader, hiddenLoader }}>
            {children}
        </RotatingLoaderContext.Provider>
    )
}

export default RotatingLoaderProvider