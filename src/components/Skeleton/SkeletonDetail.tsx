import React from 'react'
import Wrapper from '../Wrapper/Wrapper'
import Skeleton from 'react-loading-skeleton'

type Props = {}

const SkeletonDetail = (props: Props) => {
    return (
        <div className="detail" >
            <Wrapper className='relative z-[1] flex flex-col md:flex-row gap-8 md:gap-16 py-5'>
                <Skeleton baseColor="#202020" highlightColor="#444" className="detail-card self-center rounded-2xl w-60 h-[360px]" />

                <div className="detail-content text-white md:flex-1">
                    <Skeleton baseColor="#202020" highlightColor="#444" count={2} className="name"></Skeleton>
                    <div className='flex items-center gap-6 flex-wrap mt-4'>
                        <Skeleton baseColor="#202020" highlightColor="#444" className="name w-10 h-3"></Skeleton>
                        <Skeleton baseColor="#202020" highlightColor="#444" className="name w-10 h-3"></Skeleton>
                        <Skeleton baseColor="#202020" highlightColor="#444" className="name w-10 h-3"></Skeleton>
                    </div>

                    <div className='flex items-center mt-5 gap-x-8 gap-y-4 flex-wrap'>
                        <div className='flex items-center gap-4'>
                            <Skeleton baseColor="#202020" highlightColor="#444" className='w-10 h-10' circle={true} />
                            <Skeleton baseColor="#202020" highlightColor="#444" />
                        </div>
                        <div className='flex items-center gap-4'>
                            <Skeleton baseColor="#202020" highlightColor="#444" className='w-10 h-10' circle={true} />
                            <Skeleton baseColor="#202020" highlightColor="#444" />
                        </div><div className='flex items-center gap-4'>
                            <Skeleton baseColor="#202020" highlightColor="#444" className='w-10 h-10' circle={true} />
                            <Skeleton baseColor="#202020" highlightColor="#444" />
                        </div>

                    </div>
                    <Skeleton baseColor="#202020" highlightColor="#444" className="name mt-6 h-20"></Skeleton>

                </div>

            </Wrapper>
        </div>
    )
}

export default SkeletonDetail