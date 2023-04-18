import React from 'react'
import { CirclesWithBar } from 'react-loader-spinner'

type Props = {}

const Loader = (props: Props) => {
    return (
        <div className='top-0 left-0 flex items-center justify-center fixed z-50 w-full h-full bg-black'>
            <CirclesWithBar
                height="100"
                width="100"
                color="#00acc1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                outerCircleColor=""
                innerCircleColor=""
                barColor=""
                ariaLabel='circles-with-bar-loading'
            />
        </div>
    )
}

export default Loader