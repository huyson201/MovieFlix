

import React from 'react'
import { RotatingLines } from 'react-loader-spinner'
import { useRotatingLoader } from '../../context/RotatingLoader/RotatingLoader.context'
import classNames from 'classnames'

type Props = {}

const RotatingLoader = (props: Props) => {
    const rotatingLoader = useRotatingLoader()

    return (
        <div className={classNames(`bg-black rounded py-1 px-2 fixed z-[5] top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4
         flex items-center text-white gap-1`, { hidden: !rotatingLoader?.show })}>
            <RotatingLines strokeColor='gray' width='26' />
            Loading...
        </div>
    )
}

export default RotatingLoader