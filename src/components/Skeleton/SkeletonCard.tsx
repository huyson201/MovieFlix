import classNames from 'classnames'
import React from 'react'
import Skeleton from 'react-loading-skeleton'

type Props = {
    size?: "normal" | "large"
}

const SkeletonCard = ({ size = 'large' }: Props) => {
    return (
        <div className="card overflow-hidden rounded-2xl" >
            <div className={classNames(`list__card-content`, { 'h-60': size === 'normal', 'h-[280px]': size === 'large' })}>
                <Skeleton baseColor="#202020" highlightColor="#444" className=' w-full h-full' />
            </div>


        </div>
    )
}

export default SkeletonCard