import classNames from 'classnames'
import React from 'react'

interface SpinLoaderProps {
    className?: string
}
const SpinLoader = ({ className }: SpinLoaderProps) => {
    return (
        <div className={classNames(className, 'w-5 h-5 my-1 mx-auto rounded-full border-2 border-dark-teal border-b-transparent animate-spin')}></div>
    )
}

export default SpinLoader